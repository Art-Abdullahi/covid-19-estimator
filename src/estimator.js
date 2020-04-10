/* eslint-disable eol-last */
const covid19ImpactEstimator = (data) => {
  const input = data;
  const impactCI = data.reportedCases * 10;
  const severeImpactCI = data.reportedCases * 50;
  const days = data.timeToElapse;
  const aDIP = data.region.avgDailyIncomePopulation;
  const aDIUSD = data.region.avgDailyIncomeInUSD;
  let impactIBRT;
  let severeImpactIBRT;
  let impactDIF;
  let severeImpactDIF;
  if (data.periodType === 'days') {
    impactIBRT = impactCI * (2 ** Math.trunc(days / 3));
    severeImpactIBRT = severeImpactCI * (2 ** Math.trunc(days / 3));
    impactDIF = (impactIBRT * aDIP * aDIUSD) / days;
    severeImpactDIF = (severeImpactIBRT * aDIP * aDIUSD) / days;
  }
  if (data.periodType === 'weeks') {
    const weeksToDays = days * 7;
    impactIBRT = impactCI * (2 ** Math.trunc(weeksToDays / 3));
    severeImpactIBRT = severeImpactCI * (2 ** Math.trunc(weeksToDays / 3));
    impactDIF = (impactIBRT * aDIP * aDIUSD) / weeksToDays;
    severeImpactDIF = (severeImpactIBRT * aDIP * aDIUSD) / weeksToDays;
  }
  if (data.periodType === 'months') {
    const monthsToDays = data.timeToElapse * 30;
    impactIBRT = impactCI * (2 ** Math.trunc(monthsToDays / 3));
    severeImpactIBRT = severeImpactCI * (2 ** Math.trunc(monthsToDays / 3));
    impactDIF = (impactIBRT * aDIP * aDIUSD) / monthsToDays;
    severeImpactDIF = (severeImpactIBRT * aDIP * aDIUSD) / monthsToDays;
  }
  const impactSCBRT = impactIBRT * 0.15;
  const severeImpactSCBRT = severeImpactIBRT * 0.15;
  const impactHBBRT = Math.trunc(data.totalHospitalBeds * 0.35 - impactSCBRT);
  const severeImpactHBBRT = Math.trunc(data.totalHospitalBeds * 0.35 - severeImpactSCBRT);
  const impactCFICU = Math.trunc(impactIBRT * 0.05);
  const severeImpactCFICU = Math.trunc(severeImpactIBRT * 0.05);
  const impactCFV = Math.trunc(impactIBRT * 0.02);
  const severeImpactCFV = Math.trunc(severeImpactIBRT * 0.02);
  impactDIF = Math.trunc(impactDIF);
  severeImpactDIF = Math.trunc(severeImpactDIF);
  return {
    data: input,
    impact: {
      currentlyInfected: impactCI,
      infectionsByRequestedTime: impactIBRT,
      severeCasesByRequestedTime: impactSCBRT,
      hospitalBedsByRequestedTime: impactHBBRT,
      casesForICUByRequestedTime: impactCFICU,
      casesForVentilatorsByRequestedTime: impactCFV,
      dollarsInFlight: impactDIF
    },
    severeImpact: {
      currentlyInfected: severeImpactCI,
      infectionsByRequestedTime: severeImpactIBRT,
      severeCasesByRequestedTime: severeImpactSCBRT,
      hospitalBedsByRequestedTime: severeImpactHBBRT,
      casesForICUByRequestedTime: severeImpactCFICU,
      casesForVentilatorsByRequestedTime: severeImpactCFV,
      dollarsInFlight: severeImpactDIF
    }
  };
};

export default covid19ImpactEstimator;