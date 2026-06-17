import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { FiSun, FiMoon, FiHeart, FiZap, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { wishlist } = useApp();
  // 1. Manage hamburger open/close toggle state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        <FiZap className={styles.logoIcon} />
        <span className={styles.mainLogo}>
          <span className={styles.highlight}>EV</span><span>CHARGE</span>
          <span className={styles.chandigarh}>Chandigarh</span>
        </span>
      </Link>

      {/* 2. Bind dynamic conditional state classes to the links container */}
      <div className={`${styles.links} ${isMenuOpen ? styles.linksActive : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/vehicles" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Vehicles</NavLink>
        <NavLink to="/stations" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Stations</NavLink>
        <NavLink to="/comparison" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Compare</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Dashboard</NavLink>
      </div>

      <div className={styles.actions}>
        {/* 3. Replaced '+' symbol with clean dynamic menu toggles */}
        <button 
          className={styles.hambergarh} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <Link to="/wishlist" className={styles.wishlistBtn} title="Wishlist" onClick={closeMenu}>
          <FiHeart />
          {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
        </Link>
        <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
}