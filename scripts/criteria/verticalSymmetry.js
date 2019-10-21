import grid from './grid';

module.exports = {
  name: 'Vertical Symmetry',
  test: (dna) => {
    const { length } = grid;
    let matches = 0;
    let score = 0;
    for (let y = 0; y < length; y += 1) {
      for (let x = 0; x < length; x += 1) {
        const current = grid[x][y];
        const match = grid[length - 1 - x][y];
        if (current && match) {
          matches += 1;
          if (dna[current] === dna[match]) {
            score += 1;
          }
        }
      }
    }

    const averageScore = score / matches;
    return averageScore;
  },
};
