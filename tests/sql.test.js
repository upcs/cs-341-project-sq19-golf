import Sequelize from 'sequelize';
import { Classes } from '../src/server/sql.js';
import { shallow } from 'enzyme';
import Path  from 'path';
//TODO: Fix this mockup


/*
describe('Classes model', () => {
  test('Loading a class object', () => {
    var x = Classes.create({
      subject: 'subject',
      number: 'number',
      title: 'title',
      professor: 'professor',
      start: 'start',
      end: 'end',
      days: 'days'
    });
  });
});

describe('Course data functions', () => {
  test('Updating all course data', () => {

  });
  test('Updating all course data (ASync)', () => {

  });
  test('Getting all course data', () => {

  });
  test('Getting specific course data', () => {

  });
});
