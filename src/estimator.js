
const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = {
    currentlyAffected: 0,
    infectionsByRequestedTime: 0
  };
  const severeImpact = {
    currentlyAffected: 0,
    infectionsByRequestedTime: 0
  };
  impact.currentlyAffected = data.reportedCases * 10;
  severeImpact.currentlyAffected = data.reportedCases * 50;
  if (data.periodType === 'days') {
    impact.infectionsByRequestedTime = impact.currentlyAffected
      * (2 ** Math.floor(data.timeToElapse / 3));
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyAffected
      * (2 ** Math.floor(data.timeToElapse / 3));
  }
  if (data.periodType === 'weeks') {
    const weeksToDays = data.timeToElapse * 7;
    impact.infectionsByRequestedTime = impact.currentlyAffected
      * (2 ** Math.floor(weeksToDays / 3));
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyAffected * (2 ** Math.floor(weeksToDays / 3))
  }
  if (data.periodType === 'weeks') {
    const monthToDays = data.timeToElapse * 30;
    impact.infectionsByRequestedTime = impact.currentlyAffected
      * (2 ** Math.floor(monthToDays / 3));
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyAffected
      * (2 ** Math.floor(monthToDays / 3));
  }

  return {
    data: input,
    impact,
    severeImpact
  };
}

export default covid19ImpactEstimator;
