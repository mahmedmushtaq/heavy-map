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
import PlacesAutocomplete from "@/src/components/PlacesAutoComplete";
import { Box, Button, Typography } from "@mui/material";
import GoogleMap from "@/src/components/GoogleMap";
import { useRouter } from "next/router";

const Marker = ({ children }) => children;

export default function App() {
  const router = useRouter();
  const { arg } = router.query;

  return (
    <div>
      <GoogleMap requireFilter={arg === "filter"} />
    </div>
  );
}
