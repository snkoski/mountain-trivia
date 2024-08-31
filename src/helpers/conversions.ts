const distanceConverter = {
  // Convert meters to millimeters
  metersToMillimeters(meters: number): number {
    return meters * 1000;
  },

  // Convert meters to centimeters
  metersToCentimeters(meters: number): number {
    return meters * 100;
  },

  // Convert meters to kilometers
  metersToKilometers(meters: number): number {
    return meters / 1000;
  },

  // Convert meters to inches
  metersToInches(meters: number): number {
    return meters * 39.3701;
  },

  // Convert meters to feet
  metersToFeet(meters: number): number {
    return meters * 3.28084;
  },

  // Convert meters to yards
  metersToYards(meters: number): number {
    return meters * 1.09361;
  }
};

export default distanceConverter;
