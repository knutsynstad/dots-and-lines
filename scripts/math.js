const randomNumberBetween = (min, max) => {
  let value = Math.random() * (max - min) + min;
  return value;
};

module.exports = randomNumberBetween;
