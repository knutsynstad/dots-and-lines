module.exports = {
  name: 'Line Count',
  test: (dna, length, size) => {
    let targetLines = size ** 2 - size;
    targetLines = 2 * Math.round(targetLines / 2);
    let lines = 0;
    for (let i = 0; i < dna.length; i += 1) {
      if (dna[i]) {
        lines += 1;
      }
    }
    let score = 1;
    let delta = Math.abs(targetLines - lines);
    while (delta > 0) {
      score /= 1.1;
      delta -= 1;
    }

    return score;
  },
};
