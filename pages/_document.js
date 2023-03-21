import { API_KEY } from "@/src/constants";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
      ></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
