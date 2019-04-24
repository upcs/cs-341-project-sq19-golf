import { sequelize, dataTypes, checkModelName, checkPropertyExists } from 'sequelize-test-helpers';
import { Classes, updateAllCourseData, updateAllCourseDataAsync, getAllCourseData, getSelectedCourseData } from '../src/server/sql.js';

const Fs = require('fs');

describe('Classes model', () => {
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
  });
});
