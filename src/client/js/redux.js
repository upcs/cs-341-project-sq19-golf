import {createStore, combineReducers} from "redux";

export const actionTypes = {
  MODIFY_SCHEDULES: 'MODIFY_SCHEDULES',
  CLEAR_SCHEDULES: 'CLEAR_SCHEDULES',
  MODIFY_COURSE_CONTEXT: 'MODIFY_COURSE_CONTEXT',
  CLEAR_COURSE_CONTEXT: 'CLEAR_COURSE_CONTEXT'
};

//Intiailize state
/*const scheduleState = {
  desiredCourses: [],
  blacklistedProfessors: [],
  blacklistedTimes: [],
}*/

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

export const rootReducer = combineReducers({
  viableSchedules: scheduleReducer,
  courseContext: courseReducer
});

//Initialize actions
export function modifySchedules(schedules) {
  return { type: actionTypes.MODIFY_SCHEDULES, viableSchedules: schedules };
}

export function modifyCourses(courses) {
  return { type: actionTypes.MODIFY_COURSE_CONTEXT, courses: courses };
}

//Initialize store
export const store = createStore(rootReducer);
