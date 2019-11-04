import { getCoords, getIndex } from '../math';

module.exports = {
  name: 'Horizontal Symmetry',
  test: (dna, length, size) => {
    let lines = 0;
    let score = 0;

    // Iterate over dna array
    for (let i = 0; i < length; i += 1) {
      if (dna[i]) {
        lines += 1;
        // For each genotype, get coordinates
        const [x1, y] = getCoords(i, size);
        let match;

        // Find symmetry point
        if (i < length / 2) {
          // Horizontal lines
          const x2 = size - 2 - x1;
          match = getIndex(x2, y, size, 'horizontal');
        } else {
          // Vertical lines
          const x2 = size - 1 - x1;
          match = getIndex(x2, y, size, 'vertical');
        }

        if (dna[i] && dna[match]) {
          score += 1;
        }
      }
    }

    const averageScore = score / lines;
    return averageScore;
  },
};
