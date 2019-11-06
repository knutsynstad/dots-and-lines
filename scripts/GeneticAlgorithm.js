import { randomNumberBetween } from './math';

class GeneticAlgorithm {
  constructor(Creature, options) {
    this.populationSize = options.populationSize;
    this.mutationRate = options.mutationRate;
    this.elitistSelection = options.elitistSelection;
    this.population = [];
    this.scores = 0;
    this.scoreSum = 0;
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

    for (let i = 0; i < this.populationSize; i += 1) {
      const creature = this.population[i];
      const fitness = creature.getFitness();
      this.scores.push(fitness);
      this.scoreSum += fitness;

      if (fitness > this.highScore) {
        this.highScore = fitness;
      }
    }
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

  sortPopulation() {
    this.population.sort((a, b) => b.fitness - a.fitness);
    this.scores.sort((a, b) => b - a);
  }

  evolve() {
    const newGeneration = [];

    if (this.elitistSelection && this.elitistSelection > 0) {
      this.sortPopulation();
      const elites = this.population.slice(0, this.elitistSelection);
      newGeneration.push(...elites);
    }

    while (newGeneration.length < this.populationSize) {
      const [parentA, parentB] = this.selectPair();
      const child = parentA.crossover(parentB);
      child.mutate(this.mutationRate);
      newGeneration.push(child);
    }

    this.population = newGeneration;
    this.generation += 1;
    this.scoreFitness();
  }

  runUntil(threshold) {
    while (this.highScore < threshold) {
      this.evolve();
    }
  }

  getTop(quantity) {
    this.sortPopulation();
    const selection = this.population.slice(0, quantity);
    return selection;
  }
}

module.exports = GeneticAlgorithm;
