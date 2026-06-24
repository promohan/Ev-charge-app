import React, { useState, useEffect } from 'react';
import EVMap from '../components/Map/EVMap';
import { FiSearch, FiMapPin, FiCompass } from 'react-icons/fi';
import styles from './ChargingStations.module.css';
import Footer from '../components/Common/Footer'
import stationsData from '../data/chandigarh_stations.json'


export default function ChargingStations() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState('');
  const [filterConnector, setFilterConnector] = useState('All');
  const [activeCenter, setActiveCenter] = useState(null);

    // const [stations1, setStations1] = useState([]);


  useEffect(() => {
    // Dynamic absolute client fetch routing directly targeting public data payload
    // fetch('')
    //   .then(res => res.json())
    //   .then(data => setStations(data))
    //   .catch(err => console.error("Error structural fetching infrastructure data", err));

    setStations(stationsData);

  }, []);

  const filteredStations = stations.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(search.toLowerCase()) || 
                          st.address.toLowerCase().includes(search.toLowerCase());
    const matchesConnector = filterConnector === 'All' || st.connectorType.includes(filterConnector);
    return matchesSearch && matchesConnector;
  });

  const handleLocateStation = (st) => {
    setActiveCenter([st.lat, st.lng]);
  };

  return (
    <>
    
    
    <div className={styles.layoutWrapper}>
      <aside className={styles.sidebar}>
        <h2>Infrastructure <span className={styles.accentText}>Grid</span></h2>
        <p className={styles.desc}>Real-time monitoring system of EV stations across Chandigarh.</p>
        
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search Sector, area, hub name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.sidebarInput}
          />
        </div>

        <select 
          value={filterConnector} 
          onChange={(e) => setFilterConnector(e.target.value)}
          className={styles.sidebarSelect}
        >
          <option value="All">All Connector Matrices</option>
          <option value="CCS2">CCS2 Fast DC</option>
          <option value="Type 2">Type 2 AC</option>
          <option value="Bharat">Bharat AC001</option>
        </select>

        <div className={styles.listContainer}>
          {filteredStations.map(st => (
            <div key={st.id} className={styles.stationItem} onClick={() => handleLocateStation(st)}>
              <div className={styles.stationMeta}>
                <h4>{st.name}</h4>
                <p><FiMapPin /> {st.address}</p>
                <div className={styles.tags}>
                  <span className={styles.connectorTag}>{st.connectorType}</span>
                  <span className={styles.speedTag}>{st.speed}</span>
                </div>
              </div>
              <span className={`${styles.badge} ${styles[st.status.toLowerCase()]}`}>{st.status}</span>
            </div>
          ))}
          {filteredStations.length === 0 && <p className={styles.empty}>No network grids found matching query.</p>}
        </div>
      </aside>

      <main className={styles.mapContainer}>
        <EVMap stations={filteredStations} activeCenter={activeCenter} />
      </main>





    </div>

    <div>
      <Footer/>
    </div>
    
    </>
    
  );
}