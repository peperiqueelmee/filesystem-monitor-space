function validateIntegerInRange(value, min, max, defaultValue) {
  const parsedValue = parseInt(value, 10);
  return Number.isInteger(parsedValue) && parsedValue >= min && parsedValue <= max ? parsedValue : defaultValue;
}

module.exports = {
  validateIntegerInRange,
};
