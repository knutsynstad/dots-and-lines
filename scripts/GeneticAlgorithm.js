import { randomNumberBetween } from './math';

class GeneticAlgorithm {
  constructor(Creature, options) {
    this.populationSize = options.populationSize;
    this.mutationRate = options.mutationRate;
    this.population = [];
    this.scores = 0;
    this.scoreSum = 0;
    this.highScores = [];
    this.highScore = 0;
    this.generation = 0;

    this.populate(Creature);
  }

  populate(Klass) {
    for (let i = 0; i < this.populationSize; i += 1) {
      const creature = new Klass();
      this.population.push(creature);
    }
    this.scoreFitness();
  }

  scoreFitness() {
    this.scores = [];
    this.scoreSum = 0;
    let bestScore = 0;

    for (let i = 0; i < this.populationSize; i += 1) {
      const creature = this.population[i];
      const fitness = creature.fitness();
      this.scores.push(fitness);
      this.scoreSum += fitness;

      if (fitness > this.highScore) {
        this.highScore = fitness;
      }
      if (fitness > bestScore) {
        bestScore = fitness;
      }
    }
    this.highScores.push(bestScore);
  }

  selectPair() {
    const pair = [];
    while (pair.length < 2) {
      const value = randomNumberBetween(0, this.scoreSum);
      let sum = 0;
      for (let i = 0; i < this.populationSize; i += 1) {
        const newSum = sum + this.scores[i];
        if (value >= sum && value <= newSum) {
          pair.push(this.population[i]);
          break;
        }
        sum = newSum;
      }
    }
    return pair;
  }

  evolve() {
    const children = [];
    while (children.length < this.populationSize) {
      const [parentA, parentB] = this.selectPair();
      const child = parentA.crossover(parentB);
      child.mutate(this.mutationRate);
      children.push(child);
    }

    this.population = children;
    this.generation += 1;
    this.scoreFitness();
  }

  runUntil(threshold) {
    while (this.highScore < threshold) {
      this.evolve();
    }
  }

  getTop(quantity) {
    let creatures = this.population;
    creatures.sort((a, b) => a.fitness - b.fitness);
    creatures = creatures.slice(-quantity);
    creatures = creatures.reverse();
    return creatures;
  }
}

module.exports = GeneticAlgorithm;
