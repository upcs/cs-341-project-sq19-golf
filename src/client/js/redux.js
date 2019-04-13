import {createStore, combineReducers} from "redux";

//Describes all possible actions
export const actionTypes = {
  MODIFY_SCHEDULES: 'MODIFY_SCHEDULES',
  CLEAR_SCHEDULES: 'CLEAR_SCHEDULES',
  MODIFY_COURSE_CONTEXT: 'MODIFY_COURSE_CONTEXT',
  CLEAR_COURSE_CONTEXT: 'CLEAR_COURSE_CONTEXT',
  MODIFY_LAST_KEY: 'MODIFY_LAST_KEY'
};

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

function courseReducer(courses = {}, action) {
  switch (action.type) {
    case actionTypes.MODIFY_COURSE_CONTEXT:
      return action.courses;
    case actionTypes.CLEAR_COURSE_CONTEXT:
      return {};
    default:
      return courses;
  }
}

function lastKeyReducer(lastKey = null, action) {
  switch (action.type) {
    case actionTypes.MODIFY_LAST_KEY:
      return action.lastKey;
    default:
      return lastKey;
  }
}

export const rootReducer = combineReducers({
  viableSchedules: scheduleReducer,
  courseContext: courseReducer,
  lastKey: lastKeyReducer
});

//Initialize actions
export function modifySchedules(schedules) {
  return { type: actionTypes.MODIFY_SCHEDULES, viableSchedules: schedules };
}

export function modifyCourses(courses) {
  return { type: actionTypes.MODIFY_COURSE_CONTEXT, courses: courses };
}

export function modifyLastKey(lastKey) {
  console.log(lastKey);
  return { type: actionTypes.MODIFY_LAST_KEY, lastKey: lastKey }
}

//Initialize store
export const store = createStore(rootReducer);
