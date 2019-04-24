import {createStore, combineReducers} from "redux";

//Describes all possible actions
export const actionTypes = {
  MODIFY_SCHEDULES: 'MODIFY_SCHEDULES',
  CLEAR_SCHEDULES: 'CLEAR_SCHEDULES',
  MODIFY_COURSE_CONTEXT: 'MODIFY_COURSE_CONTEXT',
  CLEAR_COURSE_CONTEXT: 'CLEAR_COURSE_CONTEXT',
  MODIFY_LAST_KEY: 'MODIFY_LAST_KEY',
  MODIFY_CONSTRAINTS: 'MODIFY_CONSTRAINTS'
};

//Initialize schedule reducer
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

//Initialize course reducer
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

//Initialize Last Key Reducer
function lastKeyReducer(lastKey = null, action) {
  switch (action.type) {
    case actionTypes.MODIFY_LAST_KEY:
      return action.lastKey;
    default:
      return lastKey;
  }
}

//Initialize Schedule Constraint Reducer
function scheduleConstraintReducer(constraints = null, action) {
  switch (action.type) {
    case actionTypes.MODIFY_CONSTRAINTS:
      return action.constraints;
    default:
      return constraints;
  }
}

//Initialize Root Reducer
export const rootReducer = combineReducers({
  viableSchedules: scheduleReducer,
  courseContext: courseReducer,
  lastKey: lastKeyReducer,
  constraints: scheduleConstraintReducer
});

//Initialize Modify Schedules
export function modifySchedules(schedules) {
  return { type: actionTypes.MODIFY_SCHEDULES, viableSchedules: schedules };
}

//Initialize Modify Courses
export function modifyCourses(courses) {
  return { type: actionTypes.MODIFY_COURSE_CONTEXT, courses: courses };
}

//Initialize Modify Last Key
export function modifyLastKey(lastKey) {
  return { type: actionTypes.MODIFY_LAST_KEY, lastKey: lastKey }
}

//Initialize Modify Constraints
export function modifyConstraints(constraints) {
  return { type: actionTypes.MODIFY_CONSTRAINTS, constraints: constraints }
}

//Initialize Store
export const store = createStore(rootReducer);
