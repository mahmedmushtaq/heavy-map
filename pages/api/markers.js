// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dataDefault, { generate10KData } from "@/src/data";

export const config = {
  api: {
    responseLimit: "32mb",
  },
};

export default function handler(req, res) {
  res.send({
    hundred_k_data: [
      ...dataDefault,
      ...generate10KData(),
      ...generate10KData(0.5),
      ...generate10KData(1.2),
      ...generate10KData(1.5),
      ...generate10KData(1.7),
      ...generate10KData(2.0),
      ...generate10KData(2.2),
      ...generate10KData(2.5),
      ...generate10KData(3),
    ],
  });
}
