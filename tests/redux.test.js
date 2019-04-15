import React from 'react';
import {store, modifySchedules, modifyCourses, modifyLastKey, actionTypes} from '../src/client/js/redux';

describe('Redux', () => {
  test('Should handle schedule modification actions', () => {
    store.dispatch(modifySchedules({empty: false}));
    expect(store.getState().viableSchedules.empty).toBe(false);
  });

  test('Should handle schedule clearing actions', () => {
    store.dispatch({ type: actionTypes.CLEAR_SCHEDULES, viableSchedules: {empty: false} });
    expect(store.getState().viableSchedules).toEqual([]);
  });

  test('Should handle default actions', () => {
    store.dispatch({ type: null, viableSchedules: {empty: null} });
    expect(store.getState().viableSchedules).toEqual([]);
  });

  test('Should handle course modify actions', () => {
    store.dispatch(modifyCourses({empty: false}));
    expect(store.getState().courseContext.empty).toBe(false);
  });

  test('Should handle course clearing actions', () => {
    store.dispatch({ type: actionTypes.CLEAR_COURSE_CONTEXT, courses: {empty: false} });
    expect(store.getState().viableSchedules).toEqual([]);
  });

  test('SHould handle last key actions', () => {
    store.dispatch(modifyLastKey({empty: false}));
    expect(store.getState().lastKey.empty).toBe(false);
  });
});
