const beacons = (state = [], action) => {
  switch (action.type) {
    case 'onEnter':
      return  [
        ...state,
        {
          beacon: action.beacon
        }
      ];
    default:
      return state;
  }
};

export default beacons