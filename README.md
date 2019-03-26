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
  - Involved the development of a comprehensive algorithm to efficiently generate all possible schedules given a desiredClasses input
  - The front-end is now fully connected to the back-end, rendering UP_Scheduler a fully functional app if only a little clunky
- Added better test scoping and coverage
- Integrated and documented many new automation, styling and serving tools as detailed below

## **Tasks Completed for Sprint 3:**

- Added dynamic user input
  - The form now scales its user inputs, adding one or removing one when necessary
  - The user input fields have access to the back-end course data
    - This is used to provide an autocomplete feature
    - It also helps to offload some scheduling workload onto the client
  - Tab/Shift-tab functionality was added back in (trust me, this was a fair bit of work)
- GUI overhaul
  - Re-designed the entire GUI to feature a more cohesive material-design-esque layout
  - Re-routed buttons such that they return based upon history, not to static locations
- Enhanced schedule visualization
  - Added a cleaner schedule layout with more information
  - Even more information is available on on click
  - Added the ability to name your schedule
      - This name is used when exporting your file as a PDF

## **Current Tech Stack:**

- Web-Scraper
  - BeautifulSoup - Python web scraping library utilized to extract course data from self serve
- Back-end
  - MySQL - Stores relevant course data for schedule generation
  - Express.js - Provides back-end routing
- Front-end
  - React.js - Provides a templating alongside logical separation of scripts and views
  - Redux - Allows for clean/safe management of state
- Development Utility
  - Travis-CI - Continuous integration suite to levy testing/coverage capabilities
  - Jest - Facilitates .js and Python unit testing
  - CodeCov - Analyzes total unit test code coverage
  - Husky - Automates pre-hooks to fire prior to each commit
  - Prettier - Beautifies code, configured to function as a pre-hook triggered before each commit
  - Nodemon - Automatically serves server .js files when updated, allowing for "real-time" back-end edits
  - Webpack - Bundles the client side .js, allowing for less packets and hot client-side module updates during development
