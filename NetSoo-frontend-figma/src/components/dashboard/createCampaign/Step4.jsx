"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const availableLocations = [
  { id: "1", name: "New York", lat: 40.7128, lng: -74.006 },
  { id: "2", name: "Jamestown", lat: 42.097, lng: -79.2353 },
  { id: "3", name: "Rome", lat: 43.2128, lng: -75.4557 },
  { id: "4", name: "Kingston", lat: 41.9271, lng: -73.9973 },
  { id: "5", name: "Utica", lat: 43.1009, lng: -75.2327 },
  { id: "6", name: "Yonkers", lat: 40.9312, lng: -73.8987 },
];

export default function Step4() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocations, setSelectedLocations] =
    useState(availableLocations);
  const [mapLoaded, setMapLoaded] = useState(false);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com"]`
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAw-yV2UPJIHcQ8lnhaWPKmL5e5EB4hAXI&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleSelectLocation = (location) => {
    setSelectedLocations((prev) => [...prev, location]);
    setSearchValue("");
  };

  const removeLocation = (id) => {
    setSelectedLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  const filteredLocations = availableLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      !selectedLocations.find((selected) => selected.id === loc.id)
  );

  // Google Places Autocomplete logic
  useEffect(() => {
    if (!mapLoaded || !autocompleteRef.current || !window.google?.maps?.places)
      return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        types: ["(cities)"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const newLocation = {
        id: Date.now().toString(),
        name: place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setSelectedLocations((prev) => [...prev, newLocation]);
      setSearchValue("");
    });
  }, [mapLoaded]);

  return (
    <div className="text-white">
      <h2 className="text-lg font-semibold my-4">Audience and interests</h2>
      <div className="grid grid-cols-1  mb-4">
        <div>
          <label className="block text-sm mb-2 text-zinc-400">
            Search & Select
          </label>
          <input
            ref={autocompleteRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search any location..."
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
          {searchValue && filteredLocations.length > 0 && (
            <div className="bg-zinc-800 border border-zinc-700 mt-2 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="px-4 py-2 hover:bg-zinc-700 cursor-pointer bg-zinc-800/50"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleSelectLocation(location);
                  }}
                >
                  {location.name}
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-center gap-1 px-3 py-1.5 bg-zinc-800 rounded-md border border-zinc-700"
              >
                <span>{location.name}</span>
                <button
                  onClick={() => removeLocation(location.id)}
                  className="ml-1 text-zinc-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
