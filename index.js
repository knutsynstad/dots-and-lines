import GeneticAlgorithm from './scripts/GeneticAlgorithm';
import Creature from './scripts/Creature';
import render from './scripts/renderer';

const width = 5;
const height = 3;
const options = {
  populationSize: 200,
  mutationRate: 0.0005,
};
const output = [];
const filename = 'solutions';

for (let i = 0; i < width * height; i += 1) {
  const ga = new GeneticAlgorithm(Creature, options);
  const threshold = Creature.getCriteriaCount();
  ga.start({ threshold });
  // ga.start({ epochs: 500 });

  const creature = ga.getRankedCreatures(1);
  output.push(creature);

  console.log(`Solution ${i + 1} after ${ga.generation} generations`);
}

render(output, `./output/${filename}`, width, height);
