import unittest
import params
import scraper
import requests
import scraping_schedule
import genfile
import re

class TestMethods(unittest.TestCase):
	def test_params(self):
		"""
			Coverage test for params.py
			Mockup URL POST query with subj = CS. Rest of queries used in the app just change CS field to another subject 
		"""
		testurl = params.genQuery("201902", "CS", "", "", "", "", "%25", "", "MTHS", "0", "0", "a", "0", "0", "a")
		html = requests.get(testurl).content.decode('utf-8')
		self.assertTrue("Class Schedule Listing" in html)
		
	def test_scraper(self):
		"""
			Coverage test for scraper.py
			Mockup term for the test: Current term, Spring 2019. Use known data in the page to be sure it gets the right html
		"""
		html = scraper.getHTML("201902")
		self.assertTrue("Spring 2019" in html)
		self.assertTrue("Abel" in scraper.getProfID(html)[0])
		self.assertTrue("Bio" in scraper.getCourseCodes(html)[1])
		
	def test_scraping_schedule(self):
		"""
			Coverage test for scraping_schedule.py
			Use the known content of the Spring 2019 CS courses to be sure it gets the right page
		"""
		testurl = params.genQuery("201902", "CS", "", "", "", "", "%25", "", "MTHS", "0", "0", "a", "0", "0", "a")
		lstCourses = scraping_schedule.getCourses(testurl)
		self.assertTrue("CS Capstone Workshop" in lstCourses[0][0])
	
	def test_genfile(self):
		"""
			Coverage test for genfile.py
			Use regular expression to make sure our dumped data format is the proper one in every line
		"""
		genfile.generateFile("201902")
		pattern1 = re.compile(".*,.*,.*,.*,.*:.*m,.*:.*m,.*") 
		file = open("dump.txt", "r")
		data = file.readlines()
		correct = True
		for line in data:
			result = re.match(pattern1, line) 
			if (result==None): 
				correct = False
		self.assertTrue(correct)
if __name__ == '__main__':
    unittest.main()
