import GeneticAlgorithm from './scripts/GeneticAlgorithm';
import Creature from './scripts/Creature';
import render from './scripts/renderer';

const width = 3;
const height = 3;
const count = width * height;
const solutions = [];

for (let i = 0; i < count; i += 1) {
  const options = {
    populationSize: 200,
    mutationRate: 0.0005,
  };
  const ga = new GeneticAlgorithm(Creature, options);

  // Run until score reaches threshold
  const threshold = 3;
  let epochs = 1;
  while (Math.max(...ga.highScores) < threshold) {
    ga.evolve();
    epochs += 1;
  }

  const creatures = ga.population;
  creatures.sort((a, b) => a.fitness - b.fitness);
  const creature = creatures.slice(-1);
  solutions.push(creature);

  console.log(`Found solution ${i + 1} after ${epochs} epochs!`);
}

/*
// Run for N epochs
const epocs = 1000;
for (let i = 0; i < options.epochs; i += 1) {
  ga.evolve();
}
*/

//const output = ga.export();
render(solutions, './output/population', width, height);
