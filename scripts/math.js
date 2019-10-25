const randomNumberBetween = (min, max) => {
  const value = Math.random() * (max - min) + min;
  return value;
};

module.exports = randomNumberBetween;
