export class PlanetaryAges {
  static planets = [
    { name: 'Mercury', yearInDays: 88, emoji: '☿️', color: '#8C7853' },
    { name: 'Venus', yearInDays: 225, emoji: '♀️', color: '#FFC649' },
    { name: 'Earth', yearInDays: 365.25, emoji: '🌍', color: '#6B93D6' },
    { name: 'Mars', yearInDays: 687, emoji: '♂️', color: '#CD5C5C' },
    { name: 'Jupiter', yearInDays: 4333, emoji: '♃', color: '#D8CA9D' },
    { name: 'Saturn', yearInDays: 10759, emoji: '♄', color: '#FAD5A5' },
    { name: 'Uranus', yearInDays: 30687, emoji: '♅', color: '#4FD0E7' },
    { name: 'Neptune', yearInDays: 60190, emoji: '♆', color: '#4B70DD' }
  ];

  static render() {
    return `
      <section class="planetary-ages" id="planetary-ages" aria-labelledby="planetary-title">
        <h2 id="planetary-title" class="section-title">🌌 Your Age Across the Solar System</h2>
        <p class="planetary-subtitle">Discover how old you'd be on different planets!</p>
        <div class="planets-grid" id="planets-grid">
          ${this.planets.map(planet => this.renderPlanetCard(planet)).join('')}
        </div>
      </section>
    `;
  }

  static renderPlanetCard(planet) {
    return `
      <div class="planet-card" data-planet="${planet.name}" style="--planet-color: ${planet.color}">
        <div class="planet-emoji">${planet.emoji}</div>
        <h3 class="planet-name">${planet.name}</h3>
        <div class="planet-age" id="age-${planet.name.toLowerCase()}">
          <span class="planet-age-value">0</span>
          <span class="planet-age-unit">years old</span>
        </div>
        <div class="planet-info">1 year = ${planet.yearInDays} Earth days</div>
      </div>
    `;
  }

  static calculatePlanetaryAges(earthDays) {
    this.planets.forEach(planet => {
      const planetAge = (earthDays / planet.yearInDays).toFixed(2);
      const ageElement = document.getElementById(`age-${planet.name.toLowerCase()}`);
      if (ageElement) {
        const valueElement = ageElement.querySelector('.planet-age-value');
        if (valueElement) {
          valueElement.textContent = planetAge;
        }
      }
    });
  }

  static init() {
    // This will be called when age is calculated
  }
}
