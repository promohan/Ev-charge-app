import React from 'react';
import { useApp } from '../context/AppContext';
import { FiTrash2 } from 'react-icons/fi';
import styles from './Wishlist.module.css';
import Footer from '../components/Common/Footer'

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useApp();

  return (
    <>
      <div className={styles.wrapper}>
      <h2>Personal <span className={styles.neon}>Storage Wishlist</span></h2>
      
      {wishlist.length === 0 ? (
        <div className={styles.empty}>Your structural wishlist configuration index is currently empty.</div>
      ) : (
        <div className={styles.listGrid}>
          {wishlist.map(v => (
            <div key={v.id} className={styles.wCard}>
              <img src={v.img} alt={v.name} className={styles.wImg} />
              <div className={styles.wInfo}>
                <h3>{v.name}</h3>
                <p>₹{v.price.toLocaleString()}</p>
              </div>
              <button onClick={() => toggleWishlist(v)} className={styles.deleteBtn}>
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>


{/* Footer import */}
    <div>
      <Footer/>
    </div>
    </>
  );
}