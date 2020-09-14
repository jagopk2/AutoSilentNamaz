let initial_state = {
  autoFetch: 0,
  timings: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case 'SET_AUTOFETCH_TRUE':
      return {...state, autoFetch: state.autoFetch + 1};
    case 'SET_AUTOFETCH_FALSE':
      return {...state, autoFetch: 0};
    case 'SET_TIMINGS':
      return {...state, timings: action.payload};
    default:
      return state;
  }
};
