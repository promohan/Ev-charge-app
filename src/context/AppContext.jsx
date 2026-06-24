import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// *Vehicles data using array of object *
const MOCK_VEHICLES = [
  {
    id: "v1",
    name: "Tata Tiago EV",
    brand: "Tata Motors",
    battery: "24 kWh",
    range: 315,
    speed: 120,
    chargeTime: "3.6h",
    price: 799000,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v2",
    name: "Tata Tigor EV",
    brand: "Tata Motors",
    battery: "26 kWh",
    range: 315,
    speed: 120,
    chargeTime: "4h",
    price: 1249000,
    img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v3",
    name: "Tata Punch EV",
    brand: "Tata Motors",
    battery: "35 kWh",
    range: 421,
    speed: 140,
    chargeTime: "3.6h",
    price: 1099000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDamf0nDAeIk9tDaGCog0ozUBFD7UsrIfz4A&s"
  },
  {
    id: "v4",
    name: "Tata Nexon EV",
    brand: "Tata Motors",
    battery: "46.08 kWh",
    range: 489,
    speed: 150,
    chargeTime: "4.3h",
    price: 1499000,
    img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v5",
    name: "Tata Curvv EV",
    brand: "Tata Motors",
    battery: "55 kWh",
    range: 585,
    speed: 160,
    chargeTime: "4h",
    price: 1749000,
    img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v6",
    name: "MG Comet EV",
    brand: "MG Motor",
    battery: "17.3 kWh",
    range: 230,
    speed: 100,
    chargeTime: "7h",
    price: 699000,
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v7",
    name: "MG Windsor EV",
    brand: "MG Motor",
    battery: "38 kWh",
    range: 332,
    speed: 140,
    chargeTime: "3.5h",
    price: 1399000,
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v8",
    name: "MG ZS EV",
    brand: "MG Motor",
    battery: "50.3 kWh",
    range: 461,
    speed: 140,
    chargeTime: "5h",
    price: 1898000,
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v9",
    name: "Mahindra BE 6",
    brand: "Mahindra",
    battery: "79 kWh",
    range: 682,
    speed: 180,
    chargeTime: "0.8h",
    price: 1890000,
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v10",
    name: "Mahindra XEV 9e",
    brand: "Mahindra",
    battery: "79 kWh",
    range: 656,
    speed: 180,
    chargeTime: "0.8h",
    price: 2190000,
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v11",
    name: "Hyundai Creta Electric",
    brand: "Hyundai",
    battery: "51.4 kWh",
    range: 473,
    speed: 170,
    chargeTime: "4h",
    price: 1799000,
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v12",
    name: "Hyundai Ioniq 5",
    brand: "Hyundai",
    battery: "72.6 kWh",
    range: 631,
    speed: 185,
    chargeTime: "0.3h",
    price: 4605000,
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v13",
    name: "BYD Seal",
    brand: "BYD",
    battery: "82.5 kWh",
    range: 650,
    speed: 180,
    chargeTime: "0.6h",
    price: 4100000,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v14",
    name: "BYD Atto 3",
    brand: "BYD",
    battery: "60.5 kWh",
    range: 521,
    speed: 160,
    chargeTime: "0.8h",
    price: 2499000,
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v15",
    name: "Kia EV6",
    brand: "Kia",
    battery: "77.4 kWh",
    range: 708,
    speed: 192,
    chargeTime: "0.3h",
    price: 6095000,
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v16",
    name: "Volvo XC40 Recharge",
    brand: "Volvo",
    battery: "78 kWh",
    range: 475,
    speed: 180,
    chargeTime: "0.6h",
    price: 5495000,
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v17",
    name: "Volvo C40 Recharge",
    brand: "Volvo",
    battery: "78 kWh",
    range: 530,
    speed: 180,
    chargeTime: "0.6h",
    price: 6295000,
    img: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v18",
    name: "BMW i4",
    brand: "BMW",
    battery: "83.9 kWh",
    range: 590,
    speed: 190,
    chargeTime: "0.5h",
    price: 7290000,
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v19",
    name: "BMW iX1",
    brand: "BMW",
    battery: "66.4 kWh",
    range: 440,
    speed: 180,
    chargeTime: "0.5h",
    price: 6690000,
    img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "v20",
    name: "Mercedes-Benz EQS",
    brand: "Mercedes-Benz",
    battery: "107.8 kWh",
    range: 857,
    speed: 210,
    chargeTime: "0.5h",
    price: 16200000,
    img: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=500&auto=format&fit=crop&q=60"
  }
];


export const AppProvider = ({ children }) => {
  
  const [vehicles] = useState(MOCK_VEHICLES);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('ev-wishlist')) || [];
  });
  const [compareList, setCompareList] = useState([]);
  const [favoriteStations, setFavoriteStations] = useState(() => {
    return JSON.parse(localStorage.getItem('ev-fav-stations')) || [];
  });

  useEffect(() => {
    localStorage.setItem('ev-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ev-fav-stations', JSON.stringify(favoriteStations));
  }, [favoriteStations]);

  const toggleWishlist = (vehicle) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === vehicle.id)
        ? prev.filter((item) => item.id !== vehicle.id)
        : [...prev, vehicle]
    );
  };

  const toggleCompare = (vehicle) => {
    setCompareList((prev) => {
      if (prev.some((item) => item.id === vehicle.id)) {
        return prev.filter((item) => item.id !== vehicle.id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, vehicle];
    });
  };

  const toggleFavoriteStation = (stationId) => {
    setFavoriteStations((prev) =>
      prev.includes(stationId) ? prev.filter((id) => id !== stationId) : [...prev, stationId]
    );
  };

  return (
    <AppContext.Provider value={{
      vehicles,
      wishlist,
      compareList,
      favoriteStations,
      toggleWishlist,
      toggleCompare,
      toggleFavoriteStation
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);