const getCurrentTime = () => {
  return new Date()
    .toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(',', '');
};

const log = message => {
  console.log(`[${getCurrentTime()}] ${message}`);
};

module.exports = { log };
