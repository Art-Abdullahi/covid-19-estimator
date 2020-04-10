const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = {
    currentlyAffected: data.reportedCases * 10,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0,
    casesForICUByRequestedTime: 0,
    casesForVentilatorsByRequestedTime: 0,
    dollarsInFlight: 0
  };
  const severeImpact = {
    currentlyAffected: data.reportedCases * 50,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0,
    casesForICUByRequestedTime: 0,
    casesForVentilatorsByRequestedTime: 0,
    dollarsInFlight: 0
  };
  const inbrt = () => {
    switch (data.periodType) {
      case 'days':
        impact.infectionsByRequestedTime = impact.currentlyAffected
          * (2 ** factor);
        severeImpact.infectionsByRequestedTime = severeImpact.currentlyAffected
          * (2 ** factor);
        break;
      case 'months':
        const newTime = data.timeToElapse * 30;
        const factor = Math.floor(newTime / 3);
        impact.infectionsByRequestedTime = impact.currentlyAffected
          * (2 ** factor);
        severeImpact.infectionsByRequestedTime = severeImpact.currentlyAffected
          * (2 ** factor);
        break;
      case 'weeks':
        const inWeek = data.timeToElapse * 7;
        const factor = Math.floor(inWeek / 3);
        impact.infectionsByRequestedTime = impact.currentlyAffected
          * (2 ** factor);
        severeImpact.infectionsByRequestedTime = severeImpact.currentlyAffected
          * (2 ** factor);
        break;
      default:
        break;
    }
    return inbrt();
  };

  return {
    data: input,
    impact: {
      currentlyAffected: data.reportedCases * 50,
      infectionsByRequestedTime: impact.infectionsByRequestedTime,
      severeCasesByRequestedTime: 0,
      hospitalBedsByRequestedTime: 0,
      casesForICUByRequestedTime: 0,
      casesForVentilatorsByRequestedTime: 0,
      dollarsInFlight: 0
    },
    severeImpact: {
      currentlyAffected: data.reportedCases * 50,
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
