const setAutoFetchTrue = () => {
  return {
    type: 'SET_AUTOFETCH_TRUE',
  };
};

const setAutoFetchFalse = () => {
  return {
    type: 'SET_AUTOFETCH_FALSE',
  };
};
const setTimings = (timings) => {
  return {
    type: 'SET_TIMINGS',
    payload: timings,
  };
};

export {setAutoFetchTrue, setAutoFetchFalse, setTimings};
