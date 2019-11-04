import { getCoords, getIndex } from '../math';

module.exports = {
  name: 'Vertical Symmetry',
  test: (dna, length, size) => {
    let lines = 0;
    let score = 0;

    // Iterate over dna array
    for (let i = 0; i < length; i += 1) {
      if (dna[i]) {
        lines += 1;
        // For each genotype, get coordinates
        const [x, y1] = getCoords(i, size);
        let match;

        // Find symmetry point
        if (i < length / 2) {
          // Horizontal lines
          const y2 = size - 1 - y1;
          match = getIndex(x, y2, size, 'horizontal');
        } else {
          // Vertical lines
          const y2 = size - 2 - y1;
          match = getIndex(x, y2, size, 'vertical');
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
