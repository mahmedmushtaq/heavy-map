import { API } from "aws-amplify";

const apiName = "marker";
const apiPath = "/marker";
const markersDataPointsCount = "/marker/items-count";

export const generateRandomMarkersApi = async (dummy_data_size = 10) =>
  await API.post(apiName, apiPath, { body: { dummy_data_size } });

export const totalMarkersDataPointsApi = async () =>
  await API.get(apiName, markersDataPointsCount);

export const allMarkers = async () => await API.get(apiName, apiPath);
