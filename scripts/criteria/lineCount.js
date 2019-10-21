module.exports = {
  name: 'Line Count',
  test: (dna) => {
    const desiredNumberOfLines = 20;
    let lines = 0;
    dna.forEach((genotype) => {
      if (genotype) {
        lines += 1;
      }
    });

    let score = 1;
    let delta = Math.abs(desiredNumberOfLines - lines);
    while (delta > 0) {
      score /= 1.1;
      delta -= 1;
    }

    return score;
  },
};
