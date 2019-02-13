import unittest
import params
import scraper
import requests

class TestMethods(unittest.TestCase):
	def test_schedule(self):
		testURL = params.genQuery("201902", "CS", "", "", "", "", "%25", "", "MTHS", "0", "0", "a", "0", "0", "a")
		html = requests.get(testurl).content.decode('utf-8')
		self.assertTrue("Class Schedule Listing" in html)
	def test_scraper(self):
		html = scraper.getHTML("201902")
		self.assertTrue("Spring 2019" in html)
		self.assertTrue("Abel" in scraper.getProfID(html)[0])
		self.assertTrue("Aerospace" in scraper.getCourseCodes(html)[0])
		
if __name__ == '__main__':
    unittest.main()