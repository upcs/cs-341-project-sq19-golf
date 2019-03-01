![codecov](https://img.shields.io/codecov/c/github/upcs/cs-341-project-sq19-golf/master.svg?style=flat) ![build](https://img.shields.io/travis/com/upcs/cs-341-project-sq19-golf.svg?style=flat)

## **Members:**

- Andrew
- Logan
- Michael
- Nico
- Julian

## **Tasks Completed for Sprint 1:**

- A functional Express.js framework
- A Mockup of the UI
  - Using HTML
  - Using CSS (Extra attention was paid here as it will be re-used in our shift towards angular.js)
- A Webscraper capable of gathering all scheduling data
- Integration of Jest, CodeCov and Travis CI

## **Tasks Completed for Sprint 2:**

- A functional React.js frontend
  - Complete conversion of all HTML to .jsx
  - The addition of several Components (as our app is a single-page) including Settings and Availability/Preferences
- Populated a MySQL server, storing all scraped data from Self Serve
  - Successfully utilized the python scraping scripts developed in the previous sprint
- Developed MySQL queries to gather schedule data on POST and .js objects to represent these schedules
  - Involved the development of a comprehensivce algorithm to efficently generate all possible schedules given a desiredClasses input
  - The front-end is now fully connected to the back-end, rendering UP_Scheduler a fully functional app if only a little clunky
- Added better test scoping and coverage
- Integrated and documented many new automation, styling and serving tools as detailed below

## **Current Tech Stack:**

- Web-Scraper
  - BeautifulSoup - Python web scraping library utilized to extract course data from self serve
- Back-end
  - MySQL - Stores relevant course data for schedule generation
  - Express.js - Provides back-end routing
- Front-end
  - React.js - Provides a templating alongside logical separation of scripts and views
- Development Utility
  - Travis-CI - Continuous integration suite to levy testing/coverage capabilities
  - Jest - Facilitates .js and Python unit testing
  - CodeCov - Analyzes total unit test code coverage
  - Husky - Automates pre-hooks to fire prior to each commit
  - Prettier - Beautifies code, configured to function as a pre-hook triggered before each commit
  - Nodemon - Automatically serves server .js files when updated, allowing for "real-time" back-end edits
