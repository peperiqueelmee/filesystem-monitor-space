class EmailTemplate {
  static createEmailBody(alerts, threshold) {

    const alertItems = alerts
      .map(alert => {
        const match = alert.match(/The filesystem "(.*?)" mounted on "(.*?)" is at (\d+%) usage\./);
        if (match) {
          const [, filesystem, mount, usage] = match;
          return `<li>⚠️ Alert: The filesystem <strong>${filesystem}</strong> mounted on <strong>${mount}</strong> is at <strong>${usage}</strong> usage.</li>`;
        } else {
          return `<li>${alert}</li>`;
        }
      })
      .join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          strong { font-weight: bold; }
          ul { margin-top: 15px; padding-left: 20px; }
        </style>
      </head>
      <body>
        <p>Dear User,</p>
        <p>The filesystem usage monitoring system has detected the following filesystems exceeding the configured threshold. Please review the details below:</p>
        <ul>
          ${alertItems}
        </ul>
        <p><strong>Threshold:</strong> The configured threshold for this alert is <strong>${threshold}%</strong>.</p>
        <p>Best regards,<br>Your DevOps Monitoring Team.</p>
      </body>
      </html>
    `;
  }
}

module.exports = EmailTemplate;
