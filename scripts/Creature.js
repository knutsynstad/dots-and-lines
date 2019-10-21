import randomNumberBetween from './math';
import horizontalSymmetry from './criteria/horizontalSymmetry';
import verticalSymmetry from './criteria/verticalSymmetry';
import lineCount from './criteria/lineCount';

class Creature {
  constructor() {
    this.criteria = [
      horizontalSymmetry,
      verticalSymmetry,
      lineCount,
    ];
    this.createDNA(40);
  }

  setDNA(dna) {
    this.DNA = dna;
  }

  createDNA(length) {
    const dna = [];
    for (let i = 0; i < length; i += 1) {
      const random = Math.random();
      if (random < 0.33) {
        dna.push(true);
      } else {
        dna.push(false);
      }
    }
    this.setDNA(dna);
  }

  fitness() {
    let fitness = 0;
    this.criteria.forEach((criterion) => {
      const score = criterion.test(this.DNA);
      fitness += score;
    });
    this.fitness = fitness;
    return fitness;
  }

  mutate(mutationRate) {
    this.DNA.forEach((genotype, index) => {
      const random = Math.random();
      if (random <= mutationRate) {
        this.DNA[index] = !genotype;
      }
    });
  }

  crossover(partner) {
    const { length } = this.DNA;
    const crossoverPoint = randomNumberBetween(0, length);
    const child = new Creature();
    const DNA = [];
    for (let i = 0; i < length; i += 1) {
      if (i <= crossoverPoint) {
        DNA.push(this.DNA[i]);
      } else {
        DNA.push(partner.DNA[i]);
      }
    }
    child.setDNA(DNA);
    return child;
  }
}

module.exports = Creature;
