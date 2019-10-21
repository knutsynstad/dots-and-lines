import randomNumberBetween from './math';

class GeneticAlgorithm {
  constructor(Creature, options) {
    this.populationSize = options.populationSize;
    this.mutationRate = options.mutationRate;
    this.population = [];
    this.scores = false;
    this.scoreSum = false;
    this.highScores = [];
    this.generation = 1;

    this.populate(Creature);
  }

  populate(Klass) {
    for (let i = 0; i < this.populationSize; i += 1) {
      const creature = new Klass();
      this.population.push(creature);
    }
    this.scoreFitness();
    return this.snapshot();
  }

  snapshot() {
    const report = {
      generation: this.generation,
      scoreSum: this.scoreSum,
      scores: this.scores,
      highScores: this.highScores,
    };

    return report;
  }

  scoreFitness() {
    this.scores = [];
    this.scoreSum = 0;

    this.population.forEach((creature) => {
      const fitness = creature.fitness();
      this.scores.push(fitness);
      this.scoreSum += fitness;
    });
    const topScore = Math.max(...this.scores);
    this.highScores.push(topScore);
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

    return this.snapshot();
  }

  export() {
    const snapshot = this.snapshot();
    snapshot.populationSize = this.populationSize;
    snapshot.population = this.population;
    return snapshot;
  }
}

module.exports = GeneticAlgorithm;
