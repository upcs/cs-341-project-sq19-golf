import { sequelize, dataTypes, checkModelName, checkPropertyExists } from 'sequelize-test-helpers';
import { Classes, updateAllCourseData, updateAllCourseDataAsync, getAllCourseData, getSelectedCourseData } from '../src/server/sql.js';

describe('Classes model', () => {
  test('Verify the model definition is correct', () => {
    const model = new Classes();
    expect(checkPropertyExists(model.course));
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
