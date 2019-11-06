import { randomNumberBetween } from './math';

class GeneticAlgorithm {
  constructor(Creature, options) {
    this.populationSize = options.populationSize;
    this.mutationRate = options.mutationRate;
    this.elitistSelection = options.elitistSelection || false;
    this.decimation = options.decimation || false;
    this.population = [];
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
    this.scorePopulation();
  }

  scorePopulation() {
    this.scoreSum = 0;
    const populationCount = this.population.length;
    for (let i = 0; i < populationCount; i += 1) {
      const creature = this.population[i];
      const fitness = creature.getFitness();
      this.scoreSum += fitness;

      if (fitness > this.highScore) {
        this.highScore = fitness;
      }
    }
  }

  selectPair() {
    const pair = [];
    while (pair.length < 2) {
      const populationCount = this.population.length;
      const value = randomNumberBetween(0, this.scoreSum);
      let sum = 0;
      for (let i = 0; i < populationCount; i += 1) {
        const creature = this.population[i];
        const newSum = sum + creature.fitness;
        if (value >= sum && value <= newSum) {
          pair.push(creature);
          break;
        }
        sum = newSum;
      }
    }
    return pair;
  }

  sortPopulation() {
    this.population.sort((a, b) => b.fitness - a.fitness);
  }

  decimate() {
    const count = Math.floor(this.populationSize / 50);
    this.population = this.population.slice(0, -count);
  }

  evolve() {
    const newGeneration = [];

    // If elitist selection is set,
    // the N fittest creatures join the next generation
    if (this.elitistSelection && this.elitistSelection > 0) {
      this.sortPopulation();
      const elites = this.population.slice(0, this.elitistSelection);
      newGeneration.push(...elites);
    }

    // Remove the 10% most unfit creatures
    if (this.decimation) {
      this.decimate();
      this.scorePopulation();
    }

    // Generate new creatures to reach population cap
    while (newGeneration.length < this.populationSize) {
      const [parentA, parentB] = this.selectPair();
      const child = parentA.crossover(parentB);
      child.mutate(this.mutationRate);
      newGeneration.push(child);
    }

    this.population = newGeneration;
    this.generation += 1;
    this.scorePopulation();
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
