import GeneticAlgorithm from './scripts/GeneticAlgorithm';
import Creature from './scripts/Creature';
import renderGrid from './scripts/renderer';

const columns = 3;
const rows = 3;
const count = columns * rows;
const options = {
  populationSize: 200,
  mutationRate: 0.0005,
};
const threshold = Creature.getCriteriaCount();
const solutions = [];

for (let i = 0; i < count; i += 1) {
  const ga = new GeneticAlgorithm(Creature, options);
  ga.runUntil(threshold);
  const selection = ga.getTop(1);
  solutions.push(selection[0]);
  console.log(`Solution ${i + 1} after ${ga.generation} generations`);
}

renderGrid(solutions, './output/solutions.svg', columns, rows);
