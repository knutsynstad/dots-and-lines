const randomNumberBetween = (min, max) => {
  const value = Math.random() * (max - min) + min;
  return value;
};

const getCoords = (index, length) => {
  const threshold = length ** 2 - length;
  let x;
  let y;
  if (index < threshold) {
    // Horizontal lines
    x = index % (length - 1);
    y = Math.floor(index / (length - 1));
  } else {
    // Vertical lines
    x = (index - threshold) % length;
    y = Math.floor((index - threshold) / length);
  }
  return [x, y];
};

const getIndex = (x, y, length, direction) => {
  const offset = length ** 2 - length;
  let index = 0;
  index += x;
  if (direction === 'horizontal') {
    const columns = y * (length - 1);
    index += columns;
  }
  if (direction === 'vertical') {
    const columns = y * length;
    index += columns;
    index += offset;
  }
  return index;
};

module.exports = {
  randomNumberBetween,
  getCoords,
  getIndex,
};
