import { randomNumberBetween } from './math';
import horizontalSymmetry from './criteria/horizontalSymmetry';
import verticalSymmetry from './criteria/verticalSymmetry';
import lineCount from './criteria/lineCount';

const size = 5;
const criteria = [
  horizontalSymmetry,
  verticalSymmetry,
  lineCount,
];

class Creature {
  constructor(dna) {
    this.dnaLength = 2 * (size ** 2 - size);
    if (dna) {
      this.DNA = dna;
    } else {
      this.createDNA();
    }
  }

  static getCriteriaCount() {
    return criteria.length;
  }

  static getSize() {
    return size;
  }

  createDNA() {
    const dna = [];
    for (let i = 0; i < this.dnaLength; i += 1) {
      const random = Math.random();
      dna.push(random < 0.5);
    }
    this.DNA = dna;
  }

  getFitness() {
    let fitness = 0;
    for (let i = 0; i < criteria.length; i += 1) {
      const score = criteria[i].test(this.DNA, this.dnaLength, size);
      fitness += score;
    }
    this.fitness = fitness;
    return this.fitness;
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
