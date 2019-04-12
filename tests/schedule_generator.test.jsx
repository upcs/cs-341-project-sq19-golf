import React from 'react';
import { shallow } from 'enzyme';

import ScheduleGenerator from '../src/server/schedule_generator.js';

describe('ScheduleGenerator', () => {
  test('Should generate all viable schedules with classes input', () => {
    /*let classes = [
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
    ];*/
	let classes = [ [ { id: 394,
       subject: 'CS',
       number: '341',
       section: 'A',
       title: 'Software Engineering',
       crn: '40338',
       start: '8:10 am',
       end: '9:05 am',
       days: 'MWF',
       professor: 'Andrew M  Nuxoll ',
       location: 'Shiley Hall 249',
       credits: '3.000\r',
       mask: [Array],
       ones: [Array] } ],
   [ { id: 395,
       subject: 'CS',
       number: '341',
       section: 'B',
       title: 'Software Engineering',
       crn: '40339',
       start: '9:45 am',
       end: '11:10 am',
       days: 'TR',
       professor: 'Benjamin Raymond  Tribelhorn ',
       location: 'Shiley Hall 249',
       credits: '3.000\r',
       mask: [Array],
       ones: [Array] } ] ];

    /*expect(ScheduleGenerator.generateSchedules(['304', '305'], ['BIO', 'BIO'], classes)).toEqual(
      [ [ { subject: 'BIO', number: '304' },
        { subject: 'BIO', number: '305' } ],
      [ { subject: 'BIO', number: '304' },
        { subject: 'BIO', number: '305' } ],
	  [ { subject: 'BIO', number: '304' },
        { subject: 'BIO', number: '305' } ],
      [ { subject: 'BIO', number: '304' },
        { subject: 'BIO', number: '305' } ]
		]
    );
  });*/
  
  expect(ScheduleGenerator.generateSchedules(['304'], ['CS'], classes)).toEqual(
      [ [ { id: 394,
       subject: 'CS',
       number: '341',
       section: 'A',
       title: 'Software Engineering',
       crn: '40338',
       start: '8:10 am',
       end: '9:05 am',
       days: 'MWF',
       professor: 'Andrew M  Nuxoll ',
       location: 'Shiley Hall 249',
       credits: '3.000\r',
       mask: [Array],
       ones: [Array] } ],
   [ { id: 395,
       subject: 'CS',
       number: '341',
       section: 'B',
       title: 'Software Engineering',
       crn: '40339',
       start: '9:45 am',
       end: '11:10 am',
       days: 'TR',
       professor: 'Benjamin Raymond  Tribelhorn ',
       location: 'Shiley Hall 249',
       credits: '3.000\r',
       mask: [Array],
       ones: [Array] } ] ]
    );
  });
  
  /* [ [ { id: 394,
       subject: 'CS',
       number: '341',
       section: 'A',
       title: 'Software Engineering',
       crn: '40338',
       start: '8:10 am',
       end: '9:05 am',
       days: 'MWF',
       professor: 'Andrew M  Nuxoll ',
       location: 'Shiley Hall 249',
       credits: '3.000\r',
       mask: [Array],
       ones: [Array] } ],
   [ { id: 395,
       subject: 'CS',
       number: '341',
       section: 'B',
       title: 'Software Engineering',
       crn: '40339',
       start: '9:45 am',
       end: '11:10 am',
       days: 'TR',
       professor: 'Benjamin Raymond  Tribelhorn ',
       location: 'Shiley Hall 249',
       credits: '3.000\r',
       mask: [Array],
       ones: [Array] } ] ]*/

  test('Should generate no schedules when given empty object input', () => {
    expect(ScheduleGenerator.generateSchedules(['304', '305'], ['BIO', 'BIO'], {})).toEqual([]);
  });
});
