import GeneticAlgorithm from './scripts/GeneticAlgorithm';
import Creature from './scripts/Creature';
import renderGrid from './scripts/renderer';

const cols = 3;
const rows = 3;
const options = {
  populationSize: 200,
  mutationRate: 0.0005,
};
const output = [];

for (let i = 0; i < cols * rows; i += 1) {
  const ga = new GeneticAlgorithm(Creature, options);
  const threshold = Creature.getCriteriaCount();

  ga.runUntil({ threshold });
  // ga.run({ epochs: 500 });

  const selection = ga.getTop(1);
  output.push(...selection);
  console.log(`Solution ${i + 1} after ${ga.generation} generations`);
}

renderGrid(output, './output/solutions', cols, rows);
