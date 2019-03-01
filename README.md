![codecov](https://img.shields.io/codecov/c/github/upcs/cs-341-project-sq19-golf/master.svg?style=flat-square) ![build](https://img.shields.io/travis/com/upcs/cs-341-project-sq19-golf.svg?style=flat)

## **Members:**

- Andrew
- Logan
- Michael
- Nico
- Julian

## **Tasks Completed for Sprint 1:**

- A a functional Express.js framework
- A Mockup of the UI
  - Using HTML
  - Using CSS (Extra attention was paid here as it will be re-used in our shift towards angular.js)
- A Webscraper capable of gathering all scheduling data
- Integration of Jest, CodeCov and Travis CI

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
