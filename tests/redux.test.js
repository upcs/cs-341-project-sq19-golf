import React from 'react';
import {store, modifySchedules, actionTypes} from '../src/client/js/redux';

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
});
