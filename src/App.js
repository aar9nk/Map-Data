import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as mapData from "./mapData.json";
import markerImg from "./mapMarker.svg";
import "./App.css";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: -23.698,
    longitude: 133.8807,
    width: "100vw",
    height: "100vh",
    zoom: 3,
  });
  const [selectedLocation, setSelectedLocation] = useState(null); // begins as not being chosen
  // use for escape key closing box, only needed one time, only escape key
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedLocation(null);
      }
    };
    window.addEventListener("keydown", listener);
  }, []);

  return (
    <div className="container">
      <header>
        <h1>A quick overview of some earthquakes near Australia.</h1>
      </header>
      <div className="map">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiYWFyOWsxIiwiYSI6ImNqdnF6dm1wdzF0b3YzeWxlNmM1cGNranQifQ.pr1WGcQF2YdHIYqpJDyH7A"
          onViewportChange={viewport => {
            setViewport(viewport);
          }} //everytime the user uses the map, it gives a new version of the predetermined viewport, causing the map to rerender
          mapStyle="mapbox://styles/aar9k1/cjvr03flk01eh1crofb9glo2o"
        >
          {mapData.features.map(location => (
            <Marker
              key={location.properties.id}
              latitude={location.geometry.coordinates[1]}
              longitude={location.geometry.coordinates[0]}
            >
              <button
                className="markerButton"
                onClick={e => {
                  e.preventDefault();
                  setSelectedLocation(location);
                }}
              >
                <img src={markerImg} alt={location.properties.place} />
              </button>
            </Marker>
          ))}
          {/* is there a selected location? if there is show a popup*/}
          {selectedLocation ? (
            <Popup
              className="popup"
              latitude={selectedLocation.geometry.coordinates[1]}
              longitude={selectedLocation.geometry.coordinates[0]}
              closeOnClick={true}
              onClose={() => {
                setSelectedLocation(null);
              }}
            >
              <div>
                <h2>Magnitute: {selectedLocation.properties.mag}</h2>
                <p>{selectedLocation.properties.place}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    </div>
  );
}
