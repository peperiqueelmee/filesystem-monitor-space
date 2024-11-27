const { executeCommand, log } = require('../utils');
const { config } = require('../config/config.js');

const monitorFilesystem = async () => {
  try {
    const output = await executeCommand('df -h');

    const lines = output.split('\n');
    const header = lines[0];
    const data = lines.slice(1);

    const columns = header.split(/\s+/);
    const indexMap = {
      filesystem: columns.indexOf('Filesystem'),
      use: columns.includes('Use%') ? columns.indexOf('Use%') : columns.indexOf('Capacity'),
      mounted: columns.indexOf('Mounted'),
    };

    let alerts = [];
    data.forEach(line => {
      if (config.EXCLUDE_LIST?.test(line)) return;

      const parts = line.split(/\s+/);
      const filesystem = parts[indexMap.filesystem];
      const usage = parseInt(parts[indexMap.use].replace('%', ''), 10);
      const mount = parts[indexMap.mounted];

      if (!isNaN(usage) && usage >= config.THRESHOLD) {
        const alertMessage = `⚠️ Alert: The filesystem "${filesystem}" mounted on "${mount}" is at ${usage}% usage.`;
        log(alertMessage);
        alerts.push(alertMessage);
      }
    });

    return alerts;
  } catch (error) {
    log(`Error while monitoring filesystems: ${error}`);
    return [];
  }
};

module.exports = { monitorFilesystem };
