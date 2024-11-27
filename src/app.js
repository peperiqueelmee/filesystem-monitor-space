const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const os = require('os');
const { monitorFilesystem, sendEmail, sendGoogleChatNotification } = require('./services');
const { EmailTemplate, log } = require('./utils');
const { config, isEmailConfigured, isGoogleChatConfigured } = require('./config/config');

const main = async () => {
  if (!isEmailConfigured && !isGoogleChatConfigured) {
    log('No notification methods configured (email or Google Chat). Monitoring will not proceed.');
    return;
  }

  log(`Starting filesystem monitoring with a threshold of ${config.THRESHOLD}%...`);
  const alerts = await monitorFilesystem();

  if (alerts.length > 0) {
    const hostname = os.hostname();
    const subject = `🚨 Filesystem Space Alert: ${hostname} | Threshold: ${config.THRESHOLD}%`;
    const htmlBody = EmailTemplate.createEmailBody(alerts, config.THRESHOLD);

    await sendEmail(subject, htmlBody);

    await sendGoogleChatNotification(alerts);
  } else {
    log(`Everything is fine. The usage threshold of ${config.THRESHOLD}% has not been reached.`);
  }
};

main();
