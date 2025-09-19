export class Footer {
  static render() {
    return `
      <footer class="footer" role="contentinfo">
        <div class="footer-content">
          <nav class="footer-links" aria-label="Footer navigation">
            <a href="#privacy" class="footer-link">Privacy Policy</a>
            <a href="#terms" class="footer-link">Terms of Service</a>
            <a href="#contact" class="footer-link">Contact</a>
            <a href="#premium" class="footer-link">Premium</a>
            <a href="#api" class="footer-link">API</a>
          </nav>
          <p>&copy; 2025 AgeCalc Pro. Built with modern web technologies.</p>
        </div>
      </footer>
    `;
  }
}
