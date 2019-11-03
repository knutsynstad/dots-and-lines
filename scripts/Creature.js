import randomNumberBetween from './math';
import horizontalSymmetry from './criteria/horizontalSymmetry';
import verticalSymmetry from './criteria/verticalSymmetry';
import lineCount from './criteria/lineCount';

const criteria = [
  horizontalSymmetry,
  verticalSymmetry,
  lineCount,
];

class Creature {
  constructor(dna) {
    this.dnaLength = 40;
    if (dna) {
      this.DNA = dna;
    } else {
      this.createDNA();
    }
  }

  static getCriteriaCount() {
    return criteria.length;
  }

  createDNA() {
    const dna = [];
    for (let i = 0; i < this.dnaLength; i += 1) {
      const random = Math.random();
      dna.push(random < 0.5);
    }
    this.DNA = dna;
  }

  fitness() {
    let fitness = 0;
    for (let i = 0; i < criteria.length; i += 1) {
      const score = criteria[i].test(this.DNA);
      fitness += score;
    }
    this.fitness = fitness;
    return fitness;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.dnaLength; i += 1) {
      const random = Math.random();
      if (random <= mutationRate) {
        this.DNA[i] = !this.DNA[i];
      }
    }
  }

  crossover(partner) {
    const crossoverPoint = randomNumberBetween(0, this.dnaLength);
    const DNA = [];
    for (let i = 0; i < this.dnaLength; i += 1) {
      if (i <= crossoverPoint) {
        DNA.push(this.DNA[i]);
      } else {
        DNA.push(partner.DNA[i]);
      }
    }
    const child = new Creature(DNA);
    return child;
  }
}

module.exports = Creature;
