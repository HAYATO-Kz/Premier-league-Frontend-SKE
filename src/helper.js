export async function getJson(url) {
  try {
    const response = await fetch(url, { mode: "cors" });

    const json = response.json();
    return json;
  } catch (error) {
    throw error;
  }
}

export const getSeasonCode = year => {
  let seasonCode;
  switch (year) {
    case 2019:
      seasonCode = 524;
      break;
    case 2018:
      seasonCode = 2;
      break;
    case 2017:
      seasonCode = 37;
      break;
    case 2016:
      seasonCode = 56;
      break;
    default:
      break;
  }
  return seasonCode;
};

export const sortByProperty = function(property, max) {
  if (max) {
    return function(x, y) {
      return x[property] === y[property]
        ? 0
        : x[property] < y[property]
        ? 1
        : -1;
    };
  }
  return function(x, y) {
    return x[property] === y[property] ? 0 : x[property] > y[property] ? 1 : -1;
  };
};
