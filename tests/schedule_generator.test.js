import React from 'react';
import { shallow } from 'enzyme';

import ScheduleGenerator from '../src/server/schedule_generator.js';

describe('ScheduleGenerator', () => {
  test('Should generate all viable schedules with classes input', () => {
    let classes = [
      {
        subject: 'BIO',
        number: '304'
      },
      {
        subject: 'BIO',
        number: '305'
      },
      {
        subject: 'BIO',
        number: '304'
      }
    ];

    expect(ScheduleGenerator.generateSchedules(['304', '305'], ['BIO', 'BIO'], classes)).toEqual(
      [ [ { subject: 'BIO', number: '304' },
        { subject: 'BIO', number: '305' } ],
      [ { subject: 'BIO', number: '305' },
        { subject: 'BIO', number: '304' } ] ]
    );
  });

  test('Should generate no schedules when given empty object input', () => {
    expect(ScheduleGenerator.generateSchedules(['304', '305'], ['BIO', 'BIO'], {})).toEqual([]);
  });
});
