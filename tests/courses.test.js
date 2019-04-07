import React from 'react';
import Path  from 'path';
import { shallow } from 'enzyme';

import Courses from '../src/server/courses.js';
const Fs = require('fs');

describe('Courses', () => {
  test('Should parse correctly from test file', () => {
    /*courses_test.csv is a static test file with the following contents:
        test1,number1,title1,professor1,start1,end1,days1
        test2,number2,title2,professor2,start2,end2,days2
        test3,number3,title3,professor3,start3,end3,days3*/

    let dataPath = Path.join('tests', 'courses_test.csv');
    var testCourses = Courses.parseCourseData(dataPath);

    //The parsing script calls toUpper() on the title and day fields
    expect(testCourses[0].subject).toBe("TEST1");
	expect(testCourses[1].number).toEqual("number2");
    expect(testCourses[2].section).toBe("TEST3");
	expect(testCourses[3].title).toBe("TEST4");
	expect(testCourses[4].start).toEqual("number5");
	expect(testCourses[5].end).toEqual("number6");
	expect(testCourses[6].days).toBe("TEST7");
	expect(testCourses[7].professor).toBe("TEST8");
	expect(testCourses[8].location).toBe("TEST9");
	expect(testCourses[9].credits).toEqual("number10");

    //But not on the start field
    expect(testCourses[1].start).toBe("start2");
  });
});
