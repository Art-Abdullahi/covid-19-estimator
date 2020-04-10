const covid19ImpactEstimator = (data) => {
  const input = data;
  const impactCurrentlyAffected = data.reportedCases * 10;
  const severImpactCurrentlyAffected = data.reportedCases * 50;
  let impactInRT;
  let severeImpactInRT;
  if (data.periodType === 'days') {
    impactInRT = impactCurrentlyAffected * (2 ** Math.floor(data.timeToElapse / 3));
    severeImpactInRT = severImpactCurrentlyAffected * (2 ** Math.floor(data.timeToElapse / 3));
  }
  if (data.periodType === 'weeks') {
    const week2Days = data.timeToElapse * 7
    impactInRT = impactCurrentlyAffected * (2 ** Math.floor(week2Days / 3));
    severeImpactInRT = severImpactCurrentlyAffected * (2 ** Math.floor(week2Days / 3));
  }
  if (data.periodType === 'months') {
    const month2Days = data.timeToElapse * 30
    impactInRT = impactCurrentlyAffected * (2 ** Math.floor(month2Days / 3));
    severeImpactInRT = severImpactCurrentlyAffected * (2 ** Math.floor(month2Days / 3));
  }
  return {
    data: input,
    impact: {
      currentlyAffected: impactCurrentlyAffected,
      infectionsByRequestedTime: severeImpactInRT,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0
    },
    severeImpact: {
      currentlyAffected: severImpactCurrentlyAffected,
      infectionsByRequestedTime: severeImpact.infectionsByRequestedTime,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0
    }
  };
};

export default covid19ImpactEstimator;
