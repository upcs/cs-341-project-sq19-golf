import {createStore, combineReducers} from "redux";

export const actionTypes = {
  MODIFY_SCHEDULES: 'MODIFY_SCHEDULES',
  CLEAR_SCHEDULES: 'CLEAR_SCHEDULES'
};

//Intiailize state
const scheduleState = {
  desiredCourses: [],
  blacklistedProfessors: [],
  blacklistedTimes: [],
}

//Initialize reducers
function scheduleReducer(viableSchedules = [], action) {
  switch (action.type) {
    case actionTypes.MODIFY_SCHEDULES:
      return action.viableSchedules;
    case actionTypes.CLEAR_SCHEDULES:
      return [];
    default:
      return viableSchedules;
  }
}

export const rootReducer = combineReducers({
  viableSchedules: scheduleReducer,
});

//Initialize actions
export function modifySchedules(schedules) {
  return { type: actionTypes.MODIFY_SCHEDULES, viableSchedules: schedules };
}

//Initialize store
export const store = createStore(rootReducer);
