#easy_install pip
#pip install BeautifulSoup4

#import libraries
import requests

#handles separation of each class details, such as: name, time, days, instr
def scrapeClass(html):
	"""
		Given a chunk of HTML data containing info for a specific course, parse all of it and return a list of: name, time, days, instructor
	"""
	#Grab the first desired data about the class name/title
	classes = html.split('<a href', 1)
	classes = classes[1].split('">', 1)
	name = classes[1].split("</a", 1)[0]
##START OF UPDATED CODE#
	name = name.split(" - ");
	
	if (len(name) > 4):
		crn = name[2];
		subject = name[3].split(" ")[0];
		number = name[3].split(" ")[1];
		section = name[4];
		name = name[0] + " " + name[1];
	else:
		crn = name[1];
		subject = name[2].split(" ")[0];
		number = name[2].split(" ")[1];
		section = name[3];
		name = name[0];
	##END OF UPDATED CODE
	name = ("").join(name.split(",")) #take commas out of name
	
	credits = classes[1].split("Credits", 1)
	credits = credits[0].rsplit("<br />", 1)[1]; ##split from right
	credits = "".join(credits.split())
	classes = classes[1].split('Instructors</th>', 1)

	#grab the second desired data about the time alotted for the class
	################################################################
	## Some Courses have accessible schedules for some reason, therefore the code crashes when splitting
	## We'll choose to fill it in with "NULL" values -> our centinel value
	################################################################
	if (len(classes) == 1):
		return(["NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL"])
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
	
	location = classes[1].split(days, 1)
	location = location[1].split('">', 1)
	location = location[1].split("</td>", 1)[0]
	
	
	arr = [subject, number, section, name, crn, time, days, instr, location, credits]
	
	#return the desired data: name, time, days, instructor
	return arr


def getCourses(query):
	"""
		@query: the URL POST query to make to the UP dynamic schedule that returns all course for a major i.e. subject
		Returns a two-dimensional list: list of courses, each course a list of info in string format
	"""
	#specify the url and get the HTML in string form.
	schedule_page2 = requests.get(query).content.decode('utf-8')
	#Keep only the HTML chunk with the info for every course
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
	return lstScrapedData
