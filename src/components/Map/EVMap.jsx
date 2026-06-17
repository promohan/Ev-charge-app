import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './EVMap.module.css';

// Fix Default Icon Asset paths missing inside SPA bundlers
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const AvailableIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// Dynamic view controller component to listen to core parent map operations
function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 14, { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function EVMap({ stations, activeCenter }) {
  const defaultCenter = [30.7333, 76.7794]; // Chandigarh default GPS focus Coordinates

  return (
    <div className={styles.mapWrapper}>
      <MapContainer center={defaultCenter} zoom={13} className={styles.mapContainer}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView center={activeCenter} />
        {stations.map((st) => (
          <Marker key={st.id} position={[st.lat, st.lng]} icon={AvailableIcon}>
            <Popup>
              <div className={styles.popupContent}>
                <h3>{st.name}</h3>
                <p>{st.address}</p>
                <div className={styles.meta}>
                  <span><strong>Type:</strong> {st.connectorType}</span>
                  <span><strong>Output:</strong> {st.speed}</span>
                </div>
                <span className={`${styles.statusBadge} ${styles[st.status.toLowerCase()]}`}>
                  {st.status}
                </span>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${st.lat},${st.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.dirBtn}
                >
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}