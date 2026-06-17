import React, { Suspense, lazy } from 'react';
// 1. Keep your standard router imports exactly the same
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const Vehicles = lazy(() => import('./pages/Vehicles'));
const ChargingStations = lazy(() => import('./pages/ChargingStations'));
const Comparison = lazy(() => import('./pages/Comparison'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const GlobalLoader = () => (
  <div style={{
    height: '100vh', display: 'flex', alignItems: 'center', 
    justifyContent: 'center', background: '#07111F', color: '#00E6A7',
    fontFamily: 'sans-serif', fontWeight: 600, fontSize: '1.2rem'
  }}>
    INITIALIZING POWER GRID NODES...
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        {/* 2. UPDATE THIS LINE BELOW TO PASS THE FUTURE CONFIGURATION OBJECT */}
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Navbar />
          <Suspense fallback={<GlobalLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/stations" element={<ChargingStations />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}