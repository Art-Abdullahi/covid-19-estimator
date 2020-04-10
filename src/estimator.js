const impact = {
  currentlyAffected: data.reportedCases * 10,
  infectionsByRequiredTime: 0,
  severeCasesByRequestedTime: 0,
  hospitalBedsByRequestedTime: 0,
  casesForICUByRequestedTime: 0,
  casesForVentilatorsByRequestedTime: 0,
  dollarsInFlight: 0
};
const severeImpact = {
  currentlyAffected: data.reportedCases * 50,
  infectionsByRequiredTime: 0,
  severeCasesByRequestedTime: 0,
  hospitalBedsByRequestedTime: 0,
  casesForICUByRequestedTime: 0,
  casesForVentilatorsByRequestedTime: 0,
  dollarsInFlight: 0
};


const getInfectionsByRequestedTime = (data) => {
  const inDay = (data) => {
    const factor = Math.floor(data.timeToElapse / 3);
    impact.infectionsByRequiredTime = impact.currentlyAffected
      * (2 ** factor);
    severeImpact.infectionsByRequiredTime = severeImpact.currentlyAffected
      * (2 ** factor);
    return {
      impact, severeImpact
    };
  };
  const inMonth = (data) => {
    const newTime = data.timeToElapse * 30;
    const factor = Math.floor(newTime / 3);
    impact.infectionsByRequiredTime = impact.currentlyAffected
      * (2 ** factor);
    severeImpact.infectionsByRequiredTime = severeImpact.currentlyAffected
      * (2 ** factor);
    return {
      impact, severeImpact
    };
  };
  const inWeeks = (data) => {
    const inWeek = data.timeToElapse * 7
    const factor = Math.floor(inWeek / 3);
    impact.infectionsByRequiredTime = impact.currentlyAffected
      * (2 ** factor);
    severeImpact.infectionsByRequiredTime = severeImpact.currentlyAffected
      * (2 ** factor);
    return {
      impact, severeImpact
    };
  };

  const inbrt = (data) => {
    switch (data.periodType) {
      case "days":
        return inDay(data)
        break;
      case "months":
        return inMonth(data)
        break;
      case "weeks":
        return inWeeks(data)
        break;
      default:
        break;
    };
  };
  return inbrt(data)

};
const covid19ImpactEstimator = (data) => {
  const input = data;
  getInfectionsByRequestedTime(data)
  return {
    data: input,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
