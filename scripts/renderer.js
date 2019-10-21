const fs = require('fs');

const lineCoordinates = [
  [12, 12, 24, 12],
  [24, 12, 36, 12],
  [36, 12, 48, 12],
  [48, 12, 60, 12],
  [12, 24, 24, 24],
  [24, 24, 36, 24],
  [36, 24, 48, 24],
  [48, 24, 60, 24],
  [12, 36, 24, 36],
  [24, 36, 36, 36],
  [36, 36, 48, 36],
  [48, 36, 60, 36],
  [12, 48, 24, 48],
  [24, 48, 36, 48],
  [36, 48, 48, 48],
  [48, 48, 60, 48],
  [12, 60, 24, 60],
  [24, 60, 36, 60],
  [36, 60, 48, 60],
  [48, 60, 60, 60],
  [12, 12, 12, 24],
  [24, 12, 24, 24],
  [36, 12, 36, 24],
  [48, 12, 48, 24],
  [60, 12, 60, 24],
  [12, 24, 12, 36],
  [24, 24, 24, 36],
  [36, 24, 36, 36],
  [48, 24, 48, 36],
  [60, 24, 60, 36],
  [12, 36, 12, 48],
  [24, 36, 24, 48],
  [36, 36, 36, 48],
  [48, 36, 48, 48],
  [60, 36, 60, 48],
  [12, 48, 12, 60],
  [24, 48, 24, 60],
  [36, 48, 36, 60],
  [48, 48, 48, 60],
  [60, 48, 60, 60],
];

const render = (population, filename, width, height) => {
  const quantity = width * height;
  let selection = population;
  selection.sort((a, b) => a.fitness - b.fitness);
  selection = selection.slice(-quantity);
  selection = selection.reverse();

  let svg = '';
  if (selection.length > 1) {
    const size = 72;
    const w = width * size;
    const h = height * size;
    svg += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}px" height="${h}px" viewBox="0 0 ${w} ${h}">\n`;
  }

  selection.forEach((creatureWrapper, creatureIndex) => {
    const creature = creatureWrapper[0];
    const x = (creatureIndex % width) * 72;
    const y = Math.floor(creatureIndex / width) * 72;

    svg += `<svg x="${x}" y="${y}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72px" height="72px" viewBox="0 0 72 72">
    <g class="dots" fill="#ec008b">
      <circle cx="12" cy="12" r="1.5"/>
      <circle cx="24" cy="12" r="1.5"/>
      <circle cx="36" cy="12" r="1.5"/>
      <circle cx="48" cy="12" r="1.5"/>
      <circle cx="60" cy="12" r="1.5"/>
      <circle cx="12" cy="24" r="1.5"/>
      <circle cx="24" cy="24" r="1.5"/>
      <circle cx="36" cy="24" r="1.5"/>
      <circle cx="48" cy="24" r="1.5"/>
      <circle cx="60" cy="24" r="1.5"/>
      <circle cx="12" cy="36" r="1.5"/>
      <circle cx="24" cy="36" r="1.5"/>
      <circle cx="36" cy="36" r="1.5"/>
      <circle cx="48" cy="36" r="1.5"/>
      <circle cx="60" cy="36" r="1.5"/>
      <circle cx="12" cy="48" r="1.5"/>
      <circle cx="24" cy="48" r="1.5"/>
      <circle cx="36" cy="48" r="1.5"/>
      <circle cx="48" cy="48" r="1.5"/>
      <circle cx="60" cy="48" r="1.5"/>
      <circle cx="12" cy="60" r="1.5"/>
      <circle cx="24" cy="60" r="1.5"/>
      <circle cx="36" cy="60" r="1.5"/>
      <circle cx="48" cy="60" r="1.5"/>
      <circle cx="60" cy="60" r="1.5"/>
    </g>
    <g class="lines" fill="none" stroke="black" stroke-width="3" stroke-linecap="round">
  `;

    creature.DNA.forEach((genotype, index) => {
      if (genotype) {
        const [x1, y1, x2, y2] = lineCoordinates[index];
        svg += `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>\n`;
      }
    });

    svg += '  </g>\n  </svg>';
  });

  if (selection.length > 1) {
    svg += '</svg>';
  }

  fs.writeFileSync(`${filename}.svg`, svg);
};

module.exports = render;
