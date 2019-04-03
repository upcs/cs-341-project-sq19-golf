import { sequelize, dataTypes, checkModelName, checkPropertyExists } from 'sequelize-test-helpers';
import { Classes } from '../src/server/sql.js';

describe('Classes model', () => {
  test('Loading a class object', () => {
    /*Classes.create({
      subject: 'subject',
      number: 'number',
      title: 'title',
      professor: 'professor',
      start: 'start',
      end: 'end',
      days: 'days'
    });*/
  });

  test('Verify the model definition is correct', () => {
    const model = new Classes();
    expect(checkPropertyExists(model.course));
  });
});
