data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomeInPopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
const covid19ImpactEstimator = (data) => {
  const input = data;

  //challenge one
  const impact = {
    currentlyAffected: data.reportCases * 10,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0,
    casesForICUByRequestedTime: 0,
    casesForVentilatorsByRequestedTime: 0,
    dollarsInFlight: 0
  };
  const severeImpact = {
    currentlyAffected: data.reportCases * 50,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0,
    casesForICUByRequestedTime: 0,
    casesForVentilatorsByRequestedTime: 0,
    dollarsInFlight: 0
  };
  return {
    data: input,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
