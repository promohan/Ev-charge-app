import React from 'react';
import { Link } from 'react-router-dom';
import { FiCpu, FiGithub, FiTwitter, FiLinkedin, FiArrowRight } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Integrated subscription hook can be dispatched here
    alert("Subscribed successfully to Nexus Grid Intelligence updates.");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topContainer}>
        <div className={styles.brandColumn}>
          <Link to="/" className={styles.logo}>
            <FiCpu className={styles.logoIcon} />
            <span>NEXUS<span className={styles.highlight}>EV</span></span>
          </Link>
          <p className={styles.brandDesc}>
            Engineering next-generation smart grid infrastructure and precision autonomous electric vehicles.
          </p>
          <div className={styles.socials}>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Github"><FiGithub /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </div>

        <div className={styles.linksColumn}>
          <h4>Platform Navigation</h4>
          <Link to="/vehicles">Showroom Fleet</Link>
          <Link to="/stations">Charging Network</Link>
          <Link to="/comparison">Matrix Diagnostics</Link>
          <Link to="/dashboard">Telemetry Center</Link>
        </div>

        <div className={styles.linksColumn}>
          <h4>Company Grid</h4>
          <a href="#about">About Core</a>
          <a href="#sustainability">Sustainability Logs</a>
          <a href="#careers">Careers</a>
          <a href="#press">Press Room</a>
        </div>

        <div className={styles.newsletterColumn}>
          <h4>Grid Intelligence Digest</h4>
          <p>Subscribe to receive high-performance battery firmware revisions and infrastructure updates.</p>
          <form onSubmit={handleNewsletterSubmit} className={styles.inputGroup}>
            <input type="email" placeholder="Secure email address..." required className={styles.emailInput} />
            <button type="submit" className={styles.submitBtn} aria-label="Subscribe">
              <FiArrowRight />
            </button>
          </form>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} NEXUS EV Mobility Inc. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <a href="#privacy">Privacy Protocols</a>
          <a href="#terms">Terms of Operation</a>
        </div>
      </div>
    </footer>
  );
}