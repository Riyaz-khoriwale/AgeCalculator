export class FamousPeople {
  static famousPeopleData = [
    {
      name: "Albert Einstein",
      birthDate: "1879-03-14",
      deathDate: "1955-04-18",
      profession: "Theoretical Physicist",
      achievement: "Theory of Relativity"
    },
    {
      name: "Leonardo da Vinci",
      birthDate: "1452-04-15",
      deathDate: "1519-05-02",
      profession: "Renaissance Polymath",
      achievement: "Mona Lisa, The Last Supper"
    },
    {
      name: "Marie Curie",
      birthDate: "1867-11-07",
      deathDate: "1934-07-04",
      profession: "Physicist & Chemist",
      achievement: "First woman to win Nobel Prize"
    },
    {
      name: "Nelson Mandela",
      birthDate: "1918-07-18",
      deathDate: "2013-12-05",
      profession: "Anti-apartheid Activist",
      achievement: "First Black President of South Africa"
    },
    {
      name: "Steve Jobs",
      birthDate: "1955-02-24",
      deathDate: "2011-10-05",
      profession: "Entrepreneur",
      achievement: "Co-founder of Apple Inc."
    },
    {
      name: "Frida Kahlo",
      birthDate: "1907-07-06",
      deathDate: "1954-07-13",
      profession: "Artist",
      achievement: "Mexican surrealist painter"
    }
  ];

  static render() {
    return `
      <section class="famous-people" id="famous" aria-labelledby="famous-title">
        <h2 id="famous-title" class="section-title">Famous People's Ages</h2>
        <div class="people-grid" role="list" aria-label="Famous people and their ages">
          ${this.famousPeopleData.map(person => this.renderPersonCard(person)).join('')}
        </div>
      </section>
    `;
  }

  static renderPersonCard(person) {
    const ageInfo = this.calculatePersonAge(person);
    
    return `
      <article class="person-card" role="listitem" tabindex="0" 
               aria-labelledby="person-${person.name.replace(/\s+/g, '-').toLowerCase()}"
               data-person="${person.name}">
        <h3 id="person-${person.name.replace(/\s+/g, '-').toLowerCase()}" class="person-name">
          ${person.name}
        </h3>
        <div class="person-details">
          <p><strong>Profession:</strong> ${person.profession}</p>
          <p><strong>Born:</strong> ${this.formatDate(person.birthDate)}</p>
          ${person.deathDate ? `<p><strong>Died:</strong> ${this.formatDate(person.deathDate)}</p>` : ''}
          <p><strong>Achievement:</strong> ${person.achievement}</p>
        </div>
        <div class="person-age">
          ${ageInfo}
        </div>
      </article>
    `;
  }

  static calculatePersonAge(person) {
    const birthDate = new Date(person.birthDate);
    const endDate = person.deathDate ? new Date(person.deathDate) : new Date();
    const today = new Date();

    if (person.deathDate) {
      // Calculate age at death
      const ageAtDeath = this.getAgeInYears(birthDate, new Date(person.deathDate));
      const yearsSinceDeath = this.getAgeInYears(new Date(person.deathDate), today);
      return `Lived ${ageAtDeath} years (died ${yearsSinceDeath} years ago)`;
    } else {
      // Calculate current age
      const currentAge = this.getAgeInYears(birthDate, today);
      return `Currently ${currentAge} years old`;
    }
  }

  static getAgeInYears(startDate, endDate) {
    let age = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < startDate.getDate())) {
      age--;
    }
    
    return age;
  }

  static formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  static init() {
    this.setupEventListeners();
  }

  static setupEventListeners() {
    const personCards = document.querySelectorAll('.person-card');
    
    personCards.forEach(card => {
      // Keyboard navigation
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.showPersonDetails(card.dataset.person);
        }
      });

      // Click handler
      card.addEventListener('click', () => {
        this.showPersonDetails(card.dataset.person);
      });
    });
  }

  static showPersonDetails(personName) {
    const person = this.famousPeopleData.find(p => p.name === personName);
    if (!person) return;

    // Simple alert for now - could be enhanced with modal
    const birthDate = new Date(person.birthDate);
    const ageData = this.getDetailedAge(person);
    
    alert(`
${person.name}
Born: ${this.formatDate(person.birthDate)}
${person.deathDate ? `Died: ${this.formatDate(person.deathDate)}` : 'Still alive'}
Profession: ${person.profession}
Achievement: ${person.achievement}

${ageData}
    `.trim());
  }

  static getDetailedAge(person) {
    const birthDate = new Date(person.birthDate);
    const endDate = person.deathDate ? new Date(person.deathDate) : new Date();
    
    const totalDays = Math.floor((endDate - birthDate) / (1000 * 60 * 60 * 24));
    const years = this.getAgeInYears(birthDate, endDate);
    
    if (person.deathDate) {
      return `Lived for ${years} years (${totalDays.toLocaleString()} days)`;
    } else {
      return `Current age: ${years} years (${totalDays.toLocaleString()} days alive)`;
    }
  }
}
