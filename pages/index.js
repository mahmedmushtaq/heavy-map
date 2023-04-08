import React from "react";
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
