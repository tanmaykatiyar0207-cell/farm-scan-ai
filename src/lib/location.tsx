import React, { createContext, useContext, useState, useEffect } from "react";

interface LocationContextType {
  city: string;
  state: string;
  lat: number;
  lon: number;
  setLocation: (city: string, state: string, lat: number, lon: number) => void;
  isLoading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("Karnataka");
  const [lat, setLat] = useState(12.9716);
  const [lon, setLon] = useState(77.5946);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("farm_scan_location");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCity(parsed.city);
        setState(parsed.state);
        setLat(parsed.lat);
        setLon(parsed.lon);
      } catch (e) {}
    }
    setIsLoading(false);
  }, []);

  const setLocation = (newCity: string, newState: string, newLat: number, newLon: number) => {
    setCity(newCity);
    setState(newState);
    setLat(newLat);
    setLon(newLon);
    localStorage.setItem("farm_scan_location", JSON.stringify({ city: newCity, state: newState, lat: newLat, lon: newLon }));
  };

  return (
    <LocationContext.Provider value={{ city, state, lat, lon, setLocation, isLoading }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
