<<<<<<< HEAD
import { sequelize, dataTypes, checkModelName, checkPropertyExists } from 'sequelize-test-helpers';
import { Classes, updateAllCourseData, updateAllCourseDataAsync, getAllCourseData, getSelectedCourseData } from '../src/server/sql.js';

const Fs = require('fs');
=======
import Sequelize from 'sequelize';
import { Classes } from '../src/server/sql.js';
import { shallow } from 'enzyme';
import Path  from 'path';
//TODO: Fix this mockup
>>>>>>> fd1078c7e06952df0855d36351553f112576b224


/*
describe('Classes model', () => {
<<<<<<< HEAD
  test('Verify the model definition is correct', () => {
    const model = new Classes();
    expect(checkPropertyExists(model.course));
  });

  test('Verify the model is interactable', () => {
    const model = new Classes();

    let obj = {}
    obj.getDataValue = obj.setDataValue = () => "[]";

    Classes.attributes.mask.get = Classes.attributes.mask.get.bind(obj);
    expect(Classes.attributes.mask.get()).toEqual([]);

    Classes.attributes.mask.set = Classes.attributes.mask.set.bind(obj);
    expect(Classes.attributes.mask.set()).toEqual("[]");

    Classes.attributes.ones.get = Classes.attributes.ones.get.bind(obj);
    expect(Classes.attributes.ones.get()).toEqual([]);

    Classes.attributes.ones.set = Classes.attributes.ones.set.bind(obj);
    expect(Classes.attributes.ones.set()).toEqual("[]");
  });

  test('Should fail to update course data with fake file', () => {
    expect(updateAllCourseData('fake_file.txt')).toBe(false)
  });

  test('Should fail to update course data asynchronously with fake file', () => {
    expect(updateAllCourseDataAsync('fake_file.txt')).toBe(false)
  });

  test('Should fail to get course data with mocked input', () => {
    getAllCourseData(true);
  });

  test('Should fail to get selected course data with null input', () => {
    getSelectedCourseData(null, null);
=======
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

>>>>>>> fd1078c7e06952df0855d36351553f112576b224
  });
});
