import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup,  } from "react-map-gl";
import * as parkDate from "./allsports.json";
import "../../css/maps.css";




export default function Maps(props) {
  const [viewport, setViewport] = useState({
    latitude:   43.6532,
    longitude: -79.3832,
    width: 525,
    height: 350,
    zoom: 8
  });
  const [selectedPark, setSelectedPark] = useState(null);
  const {onAddresschange, type, onDescriptionchange}=props

  

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/leeroyp/ckbtojjb712th1jpeyrf3fhtb"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {parkDate.features.filter((park) => { return park.type === type}).map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="btn-secondary"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
                onAddresschange(park.properties.PARKADDRESS);
                onDescriptionchange(park.properties.DESCRIPTION)
              }}
            >
              
              <img className="mapImage" src="/assets/icons/tennis.svg" alt="Sports field" />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div className="card-location">
              <h6>{selectedPark.properties.NAME}</h6>
              {/* <p>{selectedPark.properties.DESCRIPTION}</p> */}
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}


