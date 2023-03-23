import React, { useState, useRef, useCallback, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import { API_KEY, defaultCenter } from "@/src/constants";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { Box, Button, Typography } from "@mui/material";

const Marker = ({ children }) => children;

export default function GoogleMap({ requireFilter }) {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [points, setPoints] = useState([]);
  const [panPosition, setPanPosition] = useState(defaultCenter);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const loadAllPoints = useCallback(async () => {
    const res = await fetch(
      "https://m46ieddo4h.execute-api.us-east-1.amazonaws.com/Prod/markers"
    ).then((res) => res.json());

    console.log("res ", res);

    // const points = [
    //   ...dataDefault,
    //   ...generate10KData(),
    //   ...generate10KData(0.5),
    //   ...generate10KData(1.2),
    //   ...generate10KData(1.5),
    //   ...generate10KData(1.7),
    //   ...generate10KData(2.0),
    //   ...generate10KData(2.2),
    //   ...generate10KData(2.5),
    //   ...generate10KData(3),
    // ]
    const points = res.items.map(
      ({ device_name, latitude, longitude, uid }) => ({
        type: "Feature",
        properties: { cluster: false, crimeId: uid, category: longitude },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      })
    );
    setPoints(points);
  }, []);

  return (
    <div>
      <div style={{ height: !requireFilter ? "100vh" : "90vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY, libraries: ["places"] }}
          center={panPosition}
          defaultZoom={10}
          setBounds
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
            loadAllPoints();
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          {clusters.map((cluster, i) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}-${i}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (pointCount / points.length) * 20}px`,
                      height: `${10 + (pointCount / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }

            return (
              <Marker
                key={`crime-${cluster.properties.crimeId}`}
                lat={latitude}
                lng={longitude}
              >
                <button className="crime-marker">
                  <AddLocationIcon />
                </button>
              </Marker>
            );
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
}
