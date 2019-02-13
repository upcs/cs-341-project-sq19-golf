#easy_install pip
#pip install BeautifulSoup4

#import libraries
import requests
from bs4 import BeautifulSoup



#handles separation of each class details, such as: name, time, days, instr
def scrapeClass(html):

	#Grab the first desired data about the class name/title
	classes = html.split('<a href', 1)
	classes = classes[1].split('">', 1)
	name = classes[1].split("</a", 1)[0]
	classes = classes[1].split('Instructors</th>', 1)

	#grab the second desired data about the time alotted for the class
	time = classes[1].split('</td>', 1)
	time = time[1].split('</td>', 1)
	time = time[0].split('">')[1]

	#grab the desired data of which days the class will be held.
	days = classes[1].split(time)
	days = days[1].split('</td>', 1)
	days = days[1].split('</td>', 1)
	days = days[0].split('">')[1]

	#grab the desired data of which instructor will teach the class.
	instr = classes[1].split(days, 1)
	instr = instr[1].split('</td>', 1)
	instr = instr[1].split('</td>', 1)
	instr = instr[1].split('</td>', 1)
	instr = instr[1].split('</td>', 1)
	instr = instr[1].split('(<ABBR', 1)
	instr = instr[0].split('">')[1]

	#return the desired databits: name, time, days, instructor
	return [name,time, days, instr]



#import urllib2

#specify the url and get the HTML in string form.
schedule_page2 = requests.get("https://selfserve-db.up.edu/prd/bwckschd.p_get_crse_unsec?term_in=201902&sel_subj=dummy&sel_day=dummy&sel_schd=dummy&sel_insm=dummy&sel_camp=dummy&sel_levl=dummy&sel_sess=dummy&sel_instr=dummy&sel_ptrm=dummy&sel_attr=dummy&sel_subj=BIO&sel_crse=&sel_title=&sel_schd=%25&sel_from_cred=&sel_to_cred=&sel_levl=%25&sel_instr=%25&begin_hh=0&begin_mi=0&begin_ap=a&end_hh=0&end_mi=0&end_ap=a").content.decode('utf-8')

#parse html using bs and store in variable 'soup'
soup = BeautifulSoup(schedule_page2, 'html.parser')

#splitting the html string after the tablerow once, then again, then once more after new search
myHTML = schedule_page2
s1 = myHTML.split('CLASS="ddtitle"', 1)
sFinal = s1[1].split('This is for formatting of the bottom links.', 1)
sFinal = sFinal[0]
sFinal = sFinal.split('CLASS="ddtitle"')
#above splitting will yield the section of data that contains the start of the
#	table data where the first class and info is listed, to the end of the
#	table data where the last class and info is listed.

#append each class' scraped data as an element of lstScrapedData
lstScrapedData = []
for x in sFinal:
	lstScrapedData.append(scrapeClass(x))
#print (("\n").join(lstScrapedData))
#Split the remaining of the tr
