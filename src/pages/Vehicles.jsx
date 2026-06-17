import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FiHeart, FiLayers, FiInfo } from 'react-icons/fi';
import styles from './Vehicles.module.css';
import Footer from '../components/Common/Footer';

export default function Vehicles() {
  const { vehicles, wishlist, compareList, toggleWishlist, toggleCompare } = useApp();
  const [search, setSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('All');

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = filterBrand === 'All' || v.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <>
    
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Premium <span className={styles.neonText}>EV Showroom</span></h2>
        <div className={styles.filterBar}>
          <input 
            type="text" 
            placeholder="Search premium models..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchBox}
          />
          <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)} className={styles.dropdown}>
            <option value="All">All Structural Brands</option>
            <option value="Tesla">Tesla Motors</option>
            <option value="Aether">Aether Energy</option>
            <option value="Rivian">Rivian Automotive</option>
            <option value="Ola Electric">Ola Electric</option>
          </select>
        </div>
      </header>

      <div className={styles.grid}>
        {filteredVehicles.map(vehicle => {
          const isWishlisted = wishlist.some(item => item.id === vehicle.id);
          const isCompared = compareList.some(item => item.id === vehicle.id);

          return (
            <div key={vehicle.id} className={styles.card}>
              <div className={styles.imgContainer}>
                <img src={vehicle.img} alt={vehicle.name} loading="lazy" />
                <button 
                  onClick={() => toggleWishlist(vehicle)} 
                  className={`${styles.wishlistIcon} ${isWishlisted ? styles.activeWish : ''}`}
                >
                  <FiHeart fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
              <div className={styles.details}>
                <span className={styles.brandTag}>{vehicle.brand}</span>
                <h3>{vehicle.name}</h3>
                <div className={styles.specsGrid}>
                  <div><span>Range</span><strong>{vehicle.range} km</strong></div>
                  <div><span>Top Speed</span><strong>{vehicle.speed} km/h</strong></div>
                  <div><span>Battery</span><strong>{vehicle.battery}</strong></div>
                  <div><span>Charging</span><strong>{vehicle.chargeTime}</strong></div>
                </div>
                <div className={styles.footerRow}>
                  <div className={styles.price}>₹{vehicle.price.toLocaleString()}</div>
                  <div className={styles.actions}>
                    <button 
                      onClick={() => toggleCompare(vehicle)} 
                      className={`${styles.compareBtn} ${isCompared ? styles.activeCompare : ''}`}
                      title="Compare (Max 3)"
                    >
                      <FiLayers />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <div>
      <Footer/>
    </div>

    </>
  );
}