/* eslint-disable eol-last */
const covid19ImpactEstimator = (data) => {
  const input = data;
  const impactCurrentlyInfected = data.reportedCases * 10;
  const severeImpactCurrentlyInfected = data.reportedCases * 50;
  const days = data.timeToElapse;
  const aDIP = data.region.avgDailyIncomePopulation;
  const aDIUSD = data.region.avgDailyIncomeInUSD;
  let impactInRtime;
  let severeimpactInRtime;
  let impactDIF;
  let severeImpactDIF;
  if (data.periodType === 'days') {
    impactInRtime = impactCurrentlyInfected * (2 ** Math.trunc(days / 3));
    severeimpactInRtime = severeImpactCurrentlyInfected * (2 ** Math.trunc(days / 3));
    impactDIF = (impactInRtime * aDIP * aDIUSD) / days;
    severeImpactDIF = (severeimpactInRtime * aDIP * aDIUSD) / days;
  }
  if (data.periodType === 'weeks') {
    const weeksToDays = days * 7;
    impactInRtime = impactCurrentlyInfected * (2 ** Math.trunc(weeksToDays / 3));
    severeimpactInRtime = severeImpactCurrentlyInfected * (2 ** Math.trunc(weeksToDays / 3));
    impactDIF = (impactInRtime * aDIP * aDIUSD) / weeksToDays;
    severeImpactDIF = (severeimpactInRtime * aDIP * aDIUSD) / weeksToDays;
  }
  if (data.periodType === 'months') {
    const monthsToDays = data.timeToElapse * 30;
    impactInRtime = impactCurrentlyInfected * (2 ** Math.trunc(monthsToDays / 3));
    severeimpactInRtime = severeImpactCurrentlyInfected * (2 ** Math.trunc(monthsToDays / 3));
    impactDIF = (impactInRtime * aDIP * aDIUSD) / monthsToDays;
    severeImpactDIF = (severeimpactInRtime * aDIP * aDIUSD) / monthsToDays;
  }
  const impactSCBRT = impactInRtime * 0.15;
  const severeImpactSCBRT = severeimpactInRtime * 0.15;
  const impactHBBRT = Math.trunc(data.totalHospitalBeds * 0.35 - impactSCBRT);
  const severeImpactHBBRT = Math.trunc(data.totalHospitalBeds * 0.35 - severeImpactSCBRT);
  const impactCFICU = Math.trunc(impactInRtime * 0.05);
  const severeImpactCFICU = Math.trunc(severeimpactInRtime * 0.05);
  const impactCFV = Math.trunc(impactInRtime * 0.02);
  const severeImpactCFV = Math.trunc(severeimpactInRtime * 0.02);
  impactDIF = Math.trunc(impactDIF);
  severeImpactDIF = Math.trunc(severeImpactDIF);
  return {
    data: input,
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInRtime,
      severeCasesByRequestedTime: impactSCBRT,
      hospitalBedsByRequestedTime: impactHBBRT,
      casesForICUByRequestedTime: impactCFICU,
      casesForVentilatorsByRequestedTime: impactCFV,
      dollarsInFlight: impactDIF
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeimpactInRtime,
      severeCasesByRequestedTime: severeImpactSCBRT,
      hospitalBedsByRequestedTime: severeImpactHBBRT,
      casesForICUByRequestedTime: severeImpactCFICU,
      casesForVentilatorsByRequestedTime: severeImpactCFV,
      dollarsInFlight: severeImpactDIF
    }
  };
};

export default covid19ImpactEstimator;