import requests
import string
#term : 201901 = Fall 2018; 201902 = Spring 2019; 201903 = Summer 2019
def getHTML(p_term):
	"""Returns HTML content of Class Schedule Search based on input term"""
	response =(requests.get(("https://selfserve-db.up.edu/prd/bwckgens.p_proc_term_date?p_calling_proc=bwckschd.p_disp_dyn_sched&p_term=%s" %(p_term,)))).content
	htmlcontent = response.decode('utf-8')
	return htmlcontent
	
def getCourseCodes(html):
	"""Returns a list of strings in the form <Code:Course>."""
	return parseSelectBlock(html, """"subj_id">""")
	
def getProfID(html):
	"""Returns a list of strings in the form <ID:Professor>."""
	return parseSelectBlock(html, """"instr_id">""")
	
def parseSelectBlock(html, multiple_id): #param can be found in html code, value of MULTIPLE ID. ***INCLUDE "'s!!!
	"""Strips content from a select block in HTML and returns a list of strings <VALUE:DISPLAY_TEXT>"""
	html = html.split(multiple_id, 1)
	html = html[1].split("</OPTION>", 1)
	html = html[1].split("</select>", 1)
	html = html[0]
	html = html.split("</OPTION>")
	html = ("").join(html)
	html = ("").join(html.split('\n'))
	html = (":").join(html.split('">'))
	html = ("").join(html.split('<OPTION VALUE='))
	html = html.split('"')
	return html