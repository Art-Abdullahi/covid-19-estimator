const covid19ImpactEstimator = () => {
  let data = {
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
  const NumberOfDays = 28;
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

  impact.infectionsByRequestedTime = impact.currentlyAffected
    * (2 ** Math.round(NumberOfDays / 3));
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyAffected *
    (2 ** Math.round(NumberOfDays / 3));
  impact.severeCasesByRequestedTime = (15 / 100) *
    impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = (15 / 100) *
    severeImpact.infectionsByRequestedTime;
  impact.hospitalBedsByRequestedTime = data.totalHospitalBeds *
    Math.round(35 / 100 - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = data.totalHospitalBeds *
    Math.round(35 / 100 - severeImpact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = (5 / 100)
    * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = (5 / 100)
    * severeImpact.infectionsByRequestedTime;
  impact.casesForVentilatorsByRequestedTime = (2 / 100)
    * impact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = (2 / 100)
    * severeImpact.infectionsByRequestedTime;
  impact.dollarsInFlight = impact.infectionsByRequestedTime
    * 0.65 * data.region.avgDailyIncomeInUSD * 30;
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime
    * 0.65 * data.region.avgDailyIncomeInUSD * 30;
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
