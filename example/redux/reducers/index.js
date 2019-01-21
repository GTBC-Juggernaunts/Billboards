import { combineReducers } from 'redux'
import beacons from './beacons'

const rootReducer = combineReducers({
  beacons: beacons
});

export default rootReducer