const { log, validateIntegerInRange } = require('../utils');

const config = {
  THRESHOLD: validateIntegerInRange(process.env.THRESHOLD, 1, 100, 75),
  EXCLUDE_LIST: process.env.EXCLUDE_LIST ? new RegExp(process.env.EXCLUDE_LIST) : null,
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT || 587,
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS,
    TO: process.env.MAIL_TO,
  },
  GCHAT_WEBHOOK_URL: process.env.GCHAT_WEBHOOK_URL,
};

// Validate email configuration
const isEmailConfigured = config.SMTP.HOST && config.SMTP.USER && config.SMTP.PASS && config.SMTP.TO;
if (!isEmailConfigured) {
  log('Warning: Incomplete email configuration. Email notifications will be disabled.');
}

// Validate Google Chat webhook configuration
const isGoogleChatConfigured = !!config.GCHAT_WEBHOOK_URL;
if (!isGoogleChatConfigured) {
  log('Warning: Google Chat webhook URL not configured. Google Chat notifications will be disabled.');
}

module.exports = {
  config,
  isEmailConfigured,
  isGoogleChatConfigured,
};
