import React from 'react';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/Dashboard/GlassCard';
import styles from './Dashboard.module.css';
import Footer from '../components/Common/Footer'

export default function Dashboard() {
  const { wishlist, compareList, favoriteStations } = useApp();

  return (
    <>
    <div className={styles.wrapper}>
      <h2>Diagnostic <span className={styles.neon}>Telemetry Control Center</span></h2>
      <p className={styles.sub}>System logs tracking cached user profile actions.</p>

      <div className={styles.dashboardGrid}>
        <GlassCard>
          <h3>Active Fleet Saves</h3>
          <div className={styles.num}>{wishlist.length}</div>
          <p>Models earmarked for localized analysis</p>
        </GlassCard>
        
        <GlassCard>
          <h3>Comparison Buffer</h3>
          <div className={styles.num}>{compareList.length} / 3</div>
          <p>Active parallel comparative indices</p>
        </GlassCard>

        <GlassCard>
          <h3>Tracked Nodes</h3>
          <div className={styles.num}>{favoriteStations.length}</div>
          <p>Saved geographical charger coordinates</p>
        </GlassCard>
      </div>
    </div>

    <div>
      <Footer />
    </div>
    </>
  );
}