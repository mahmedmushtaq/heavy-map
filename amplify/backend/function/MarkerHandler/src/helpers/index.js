const deviceNames = ["sampleDevice1", "sampleDevice2", "sampleDevice3"];

const generateRandomInteger = (min, max) => Math.random() * (max - min) + min;

const getDeviceName = (index) => {
  const i = index % deviceNames.length;
  return deviceNames[i];
};

exports.generateRandomMarkers = (size = 10) => {
  // generate dummyData according to the size

  const dummyDataArr = [];

  for (let i = 0; i < size; i++) {
    dummyDataArr.push({
      device_name: getDeviceName(i),
      longitude: generateRandomInteger(-90, 90),
      latitude: generateRandomInteger(-180, 180),
      uid: Date.now() + i + "",
    });
  }

  return dummyDataArr;
};
