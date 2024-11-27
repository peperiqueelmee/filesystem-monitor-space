const axios = require('axios');
const os = require('os');
const { log } = require('../utils');
const { config } = require('../config/config');

const sendGoogleChatNotification = async alerts => {
  if (!config.GCHAT_WEBHOOK_URL) {
    log('Google Chat webhook URL not configured. Skipping notification.');
    return;
  }

  try {
    const hostname = os.hostname();
    const payload = {
      text:
        `Filesystem Space Alert 🚨\n\n` +
        `Hostname: ${hostname}\n` +
        `Threshold: ${config.THRESHOLD}%\n\n` +
        `The following filesystems have exceeded the threshold:\n\n` +
        alerts.map(alert => `- ${alert}`).join('\n'),
    };

    const response = await axios.post(config.GCHAT_WEBHOOK_URL, payload, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    });

    if (response.status !== 200) {
      throw new Error(`Google Chat webhook failed: ${response.statusText}`);
    }

    log('Google Chat notification sent successfully.');
  } catch (error) {
    log(`Error while sending Google Chat notification: ${error.message}`);
  }
};

module.exports = { sendGoogleChatNotification };
