const covid19ImpactEstimator = () => {
  const data = {
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
  function getProjectedInfections(duration, currentlyAffected) {
    const factor = Math.floor(duration / 3);
    return currentlyAffected * 2 ** factor;
  }

  const estimate = {
    impact: {
      currentlyAffected: data.reportCases * 10,
      infectionsByRequestedTime: 0,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0
    },
    severeImpact: {
      currentlyAffected: data.reportCases * 50,
      infectionsByRequestedTime: 0,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0
    }
  };
  estimate.impact.infectionsByRequestedTime = getProjectedInfections(28,
    estimate.impact.currentlyAffected);
  estimate.severeImpact.infectionsByRequestedTime = getProjectedInfections(28,
    estimate.severeImpact.currentlyAffected);
  estimate.impact.severeCasesByRequestedTime = (15 / 100)
    * estimate.impact.infectionsByRequestedTime;
  estimate.severeImpact.severeCasesByRequestedTime = (15 / 100)
    * estimate.severeImpact.infectionsByRequestedTime;
  estimate.impact.hospitalBedsByRequestedTime = data.totalHospitalBeds
    * Math.round(35 / 100 - estimate.impact.severeCasesByRequestedTime);
  estimate.severeImpact.hospitalBedsByRequestedTime = data.totalHospitalBeds
    * Math.round(35 / 100 - estimate.severeImpact.severeCasesByRequestedTime);
  estimate.impact.casesForICUByRequestedTime = (5 / 100)
    * estimate.impact.infectionsByRequestedTime;
  estimate.severeImpact.casesForICUByRequestedTime = (5 / 100)
    * estimate.severeImpact.infectionsByRequestedTime;
  estimate.impact.casesForVentilatorsByRequestedTime = (2 / 100)
    * estimate.impact.infectionsByRequestedTime;
  estimate.severeImpact.casesForVentilatorsByRequestedTime = (2 / 100)
    * estimate.severeImpact.infectionsByRequestedTime;
  estimate.impact.dollarsInFlight = estimate.impact.infectionsByRequestedTime
    * 0.65 * data.region.avgDailyIncomeInUSD * 30;
  estimate.severeImpact.dollarsInFlight = estimate.severeImpact.infectionsByRequestedTime
    * 0.65 * data.region.avgDailyIncomeInUSD * 30;
  return {
    data,
    estimate
  };
};

export default covid19ImpactEstimator;
