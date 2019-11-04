import Creature from './Creature';

const fs = require('fs');

const dotsPerSize = Creature.getSize();
const outerMargin = 12;
const strokeLength = 12;
const strokeWidth = 3;
const size = (outerMargin * 2) + (strokeLength * dotsPerSize);
const segmentCount = 2 * (dotsPerSize ** 2 - dotsPerSize);

const renderGrid = (solutions, filename, width, height) => {
  const population = solutions.flat();
  const count = width * height;
  let svg = '';

  // If multiple solutions are requested,
  // add a wrapper / root element.
  if (count > 1) {
    const w = width * size;
    const h = height * size;
    svg += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}px" height="${h}px" viewBox="0 0 ${w} ${h}">\n`;
  }

  // Iterate over population to render creatures
  for (let creature = 0; creature < count; creature += 1) {
    const dna = population[creature].DNA;
    const gX = (creature % width) * size;
    const gY = Math.floor(creature / width) * size;

    // Begin shape
    svg += `<svg x="${gX}" y="${gY}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}px" height="${size}px" viewBox="0 0 ${size} ${size}">\n`;

    // Draw dots
    svg += '<g class="dots" fill="#ec008b">\n';
    for (let i = 0; i < dotsPerSize; i += 1) {
      for (let j = 0; j < dotsPerSize; j += 1) {
        const x = outerMargin + i * strokeLength;
        const y = outerMargin + j * strokeLength;
        svg += `<circle cx="${x}" cy="${y}" r="${strokeWidth / 2}"/>\n`;
      }
    }
    svg += '</g>\n';

    // Draw horizontal lines
    svg += `<g class="horizontal lines" fill="none" stroke="black" stroke-width="${strokeWidth}" stroke-linecap="round">\n`;
    for (let y = 0; y < dotsPerSize; y += 1) {
      for (let x = 0; x < dotsPerSize - 1; x += 1) {
        const index = (dotsPerSize - 1) * y + x;
        if (dna[index]) {
          const x1 = outerMargin + x * strokeLength;
          const y1 = outerMargin + y * strokeLength;
          const x2 = x1 + strokeLength;
          const y2 = y1;
          svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>\n`;
        }
      }
    }
    svg += '</g>\n';

    // Draw vertical lines
    svg += `<g class="vertical lines" fill="none" stroke="black" stroke-width="${strokeWidth}" stroke-linecap="round">\n`;
    for (let y = 0; y < dotsPerSize - 1; y += 1) {
      for (let x = 0; x < dotsPerSize; x += 1) {
        const index = dotsPerSize * y + x;
        if (dna[segmentCount / 2 + index]) {
          const x1 = outerMargin + x * strokeLength;
          const y1 = outerMargin + y * strokeLength;
          const x2 = x1;
          const y2 = y1 + strokeLength;
          svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>\n`;
        }
      }
    }
    svg += '</g>\n';

    // Finish shape
    svg += '</svg>';
  }

  // Finish wrapper if rendering multiple creatures
  if (count > 1) {
    svg += '</svg>';
  }

  // Save SVG to disk
  fs.writeFileSync(filename, svg);
};

module.exports = renderGrid;
