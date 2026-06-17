import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';
import styles from './Home.module.css';
import Footer from '../components/Common/Footer'

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const headingRef = useRef(null);

  // Savings State
  const [fuelCost, setFuelCost] = useState(100);
  const [distance, setDistance] = useState(1200);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // GSAP Text Reveal Initialization
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    // Operational Cost calculation formula mapping
    const traditionalCost = distance * (fuelCost / 12); // Assume 12km/l avg
    const evCost = distance * 0.8; // Assume Rs 0.8 per KM charging
    setSavings(Math.max(0, Math.round(traditionalCost - evCost)));
  }, [fuelCost, distance]);

  return (
    <div className={styles.container} ref={heroRef}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 ref={headingRef} className={styles.title}>
            Drive the Future.<br /><span className={styles.gradientText}>Charge Smarter.</span>
          </h1>
          <p className={styles.subtitle}>
            Real-time EV charging stations deployed across Chandigarh, Mohali & Panchkula.
          </p>
          <div className={styles.ctaGroup}>
            <button onClick={() => navigate('/vehicles')} className={styles.primaryBtn}>Explore Vehicles</button>
            <button onClick={() => navigate('/stations')} className={styles.secondaryBtn}>Find Stations Near Me</button>
          </div>

        </div>
      </section>

      {/* Metrics Section */}
      <section className={styles.metrics}>
        <div className={styles.metricCard}><h3>45+</h3><p>EV Models</p></div>
        <div className={styles.metricCard}><h3>2,500+</h3><p>Charging Hubs</p></div>
        <div className={styles.metricCard}><h3>99.4%</h3><p>Uptime Record</p></div>
      </section>

      {/* Calculator Section */}
      <section className={styles.calculatorSection}>
        <div className={styles.calcHeader}>
          <h2>Calculate Your <span className={styles.gradientText}>Eco Savings</span></h2>
          <p>See how much you save moving from standard ICE combustion drivetrains to pure Electric.</p>
        </div>
        <div className={styles.calcGrid}>
          <div className={styles.controlGroup}>
            <label>Local Fuel Price per Liter (INR): Rs {fuelCost}</label>
            <input
              type="range" min="90" max="150" value={fuelCost}
              onChange={(e) => setFuelCost(Number(e.target.value))}
              className={styles.slider}
            />
            <label>Monthly Distance Traveled (KM): {distance} km</label>
            <input
              type="range" min="100" max="5000" step="100" value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className={styles.slider}
            />
          </div>
          <div className={styles.resultDisplay}>
            <h4>Estimated Monthly Savings</h4>
            <div className={styles.savingsValue}>₹{savings.toLocaleString()}</div>
            <p>Based on modern smart grid efficiency calculations.</p>
          </div>
        </div>
      </section>



      {/* Footer import  */}
      <Footer />
    </div>
  );
}