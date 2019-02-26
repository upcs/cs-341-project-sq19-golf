import params, scraper, scraping_schedule
import requests
import sys
import re

def generateFile(p_term):
	"""
		generates file "dump.txt" with data scraped from UP Dynamic Course Schedule given a term
	
		
	"""
	html = scraper.getHTML(p_term)
	lstCourses = scraper.getCourseCodes(html)
	lstFinal = []
	file = open("dump.txt", "w")
	for x in lstCourses:
		lstFinal.append(x.split(':')[0]) ##Get the codes of all subjects (i.e. majors) offered for the given term to get all the courses for each of them
	for x in lstFinal:
				query = params.genQuery (p_term, x, "", "", "", "", "%25", "", "MTHS", "0", "0", "a", "0", "0", "a")
				arrCourses = scraping_schedule.getCourses(query) #get the info of all courses and dump it to a txt file
				file.write(str(arrCourses))
				
						
	file.close()
	formatFile()
	return

def formatFile():
	"""
		Gives proper format to the file where all the course information is dumped (CSV format)
	"""
	file = open("dump.txt", "r") #read original content to format
	data = file.read()
	data = ("").join(data.split('[')) #get rid of '[' chars
	data = ("]").join(data.split("]]")) # convert ']]' to ']'
	data = ("\n").join(data.split(']')) # make a new line after every element in data (it's a 2-dimensional array, an array of arrays that contain info for each course)
	data = ("'. '").join(data.split("', '")) #replace "', '" so it doesn't match with ", '" at the beginning of some lines
	data = ("").join(data.split(", '")) #get rid of the remaining ", '" at the beginning of some lines
	data = ("', '").join(data.split("'. '")) #undo replace "', '"
	data = (" - ").join(data.split("',")) #give new format to  "," so we can split easier later every element
	file.close()
	
	file = open("dump.txt", "w") #open in write mode to fill with first formatted content
	file.write(data)
	file.close()
	
	file = open("dump.txt", "r") #open in read mode again to check against non-valid courses
	data = file.readlines() #store every line of the file as a separate element in a list
	newdata = []
	for line in data:
		if "NULL" not in line: # centinel NULL values for useless course data. Defined in scraping_schedule.py
			aux = line.split(" - ") #now evert attribute for each course is separated by  - 
			line = aux
			title = line[0]
			if " " in line[2]: #COURSE CRN (i.e. "CS 341") in third element
				subj = line[2].split(" ")[0]
				number = line[2].split(" ")[1]
			else:
				subj = line[3].split(" ")[0] #COURSE CRN (i.e. "CS 341") in fourth element
				number = line[3].split(" ")[1]
			if (len(line) == 8):
				teacher = line[7]
				start = line[4]
				end = line[5]
				days = line[6]
			else: #new centinel 
				teacher = "TEST"
				days = "TEST"
				start = "TEST"
				end = "TEST"
			
			line = subj + ',' + number + ',' + title + ',' + teacher + ',' + start + ',' + end + ',' + days
			if "TEST" not in line and "NULL" not in line and "&nbsp;" not in line and "=" not in line:
					#Final check for useless course info, centinel values + courses that aren't defined in the web page
					newdata.append(line)

	file.close()
	
	file = open("dump.txt", "w") ##delete all contents in the file to give final format
	file.write("")
	file.close()
	
	file = open("dump.txt", "a") #open in append mode, so every time we call write() it doesn't erase the previous content
	for line in newdata:
		file.write(line + "\n") #store lines back into the file
	file.close()
	
	file = open("dump.txt", "r") #final formatting, getting rid of all undesired characters and newlines
	data = file.read()
	data = ("").join(data.split("'")) 
	data = ("").join(data.split(" \n"))
	data = ("").join(data.split('"\n'))
	data = ("").join(data.split('"'))
	data = ("").join(data.split('dddefault'))
	data = ("").join(data.split('<ABBR'))
	
	file.close()
	
	file = open("dump.txt", "w")
	file.write(data)
	file.close()
	return