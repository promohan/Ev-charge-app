import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  // Pass initial state function to useState so logic is only executed once
  const [value, setValue] = useState(() => {
    try {
      const localValue = localStorage.getItem(key);
      if (localValue !== null) {
        return JSON.parse(localValue);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }

    // If initialValue is a callback function, invoke it
    if (typeof initialValue === 'function') {
      return initialValue();
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}