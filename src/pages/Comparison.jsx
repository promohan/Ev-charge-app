import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { FiTrash2, FiLayers } from 'react-icons/fi';
import gsap from 'gsap';
import styles from './Comparison.module.css';
import Footer from '../components/Common/Footer';

export default function Comparison() {
  const { compareList, toggleCompare } = useApp();
  const tableRef = useRef(null);
  const headerRef = useRef(null);
  const emptyStateRef = useRef(null);

  useEffect(() => {
    // 🎬 GSAP Entry Animations
    if (compareList.length === 0 && emptyStateRef.current) {
      gsap.fromTo(emptyStateRef.current,
        { opacity: 0, scale: 0.98, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    } else if (compareList.length > 0) {
      const tl = gsap.timeline();
      tl.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out', stagger: 0.1 }
      );
      tl.fromTo(tableRef.current.querySelectorAll('tr'),
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 },
        '-=0.3'
      );
    }
  }, [compareList.length]);

  return (
    <>
      <div className={styles.wrapper}>
        <div ref={headerRef} className={styles.headerBlock}>
          <h2 className={styles.title}>Vehicle Comparative Grid</h2>
          <p className={styles.subtitle}>
            Cross-analyze up to three concept platforms or mainstream line production units.
          </p>
        </div>

        {compareList.length === 0 ? (
          /* 📥 Empty State Card Matching Screenshot 2026-06-16 151826.png */
          <div ref={emptyStateRef} className={styles.emptyState}>
            <div className={styles.iconContainer}>
              <FiLayers className={styles.emptyIcon} />
            </div>
            <p className={styles.emptyText}>
              No model arrays selected. Visit showroom layout to initialize diagnostics.
            </p>
          </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.compareTable} ref={tableRef}>
              <thead>
                <tr>
                  <th className={styles.paramHeader}>Metrics</th>
                  {compareList.map(v => (
                    <th key={v.id} className={styles.vehicleHeader}>
                      <div className={styles.thContent}>
                        <h4>{v.name}</h4>
                        <button onClick={() => toggleCompare(v)} className={styles.removeBtn}>
                          <FiTrash2 /> Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className={styles.tableRow}>
                  <td className={styles.paramLabel}>Brand Registry</td>
                  {compareList.map(v => <td key={v.id} className={styles.dataValue}>{v.brand}</td>)}
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.paramLabel}>Market Retail Price</td>
                  {compareList.map(v => (
                    <td key={v.id} className={`${styles.dataValue} ${styles.priceText}`}>
                      ₹{v.price.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.paramLabel}>Nett Operational Range</td>
                  {compareList.map(v => <td key={v.id} className={styles.dataValue}>{v.range} km</td>)}
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.paramLabel}>Velocity Threshold</td>
                  {compareList.map(v => <td key={v.id} className={styles.dataValue}>{v.speed} km/h</td>)}
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.paramLabel}>Energy Density Capacity</td>
                  {compareList.map(v => <td key={v.id} className={styles.dataValue}>{v.battery}</td>)}
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.paramLabel}>Supercharge Cycle Time</td>
                  {compareList.map(v => <td key={v.id} className={styles.dataValue}>{v.chargeTime}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}