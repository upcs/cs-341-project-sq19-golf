# term_in = term_in
	# sel_subj = sel_subj
	# sel_day = sel_day
	# sel_crse = sel_crse
	# sel_title = sel_title
	# sel_from_cred = sel_from_cred
	# sel_to_cred = sel_to_cred
	# sel_levl = sel_levl
	# sel_dunt_unit = sel_dunt_unit
	# sel_dunt_code = sel_dunt_code
	# sel_begin_hh = sel_begin_hh
	# sel_begin_mi = sel_begin_mi
	# sel_begin_ap = sel_begin_ap
	# sel_end_hh = sel_end_hh
	# sel_end_mi = sel_end_mi
	# sel_end_ap = sel_end_ap

	
	#term_in=201903&sel_subj=dummy&sel_day=dummy&sel_schd=dummy&sel_insm=dummy&sel_camp=dummy&sel_levl=dummy&sel_sess=dummy&sel_instr=dummy&sel_ptrm=dummy&sel_attr=dummy&sel_subj=CS&sel_crse=&sel_title=&sel_schd=%25&sel_from_cred=&sel_to_cred=&sel_levl=%25&sel_dunt_unit=&sel_dunt_code=MTHS&sel_instr=%25&begin_hh=0&begin_mi=0&begin_ap=a&end_hh=0&end_mi=0&end_ap=a
#levl : 02 = Grad, 01 = Undergrad, 00 = Undeclared
#dunt_code: MTHS / WEEK
#term_in : 201901 = Fall 2019; 201902 = Spring 2019; 201903 = Summer 2019
#sel_day : m,t,w,r,f,s,u


# value % means SELECT ALL
def genQuery(term_in, sel_subj, sel_crse, sel_title, sel_from_cred,
				sel_to_cred, sel_levl, sel_dunt_unit, sel_dunt_code,
				begin_hh, begin_mi, begin_ap,
				end_hh, end_mi, end_ap):
	#ADD POSSIBLE LIST OF DAYS?
	
	myURL = 'https://selfserve-db.up.edu/prd/bwckschd.p_get_crse_unsec'


	
	postQuery = (('term_in=%s&' %(term_in) +
	'sel_subj=dummy&'+ 
	'sel_day=dummy&'+
	'sel_schd=dummy&'+ 
	'sel_insm=dummy&' +
	'sel_camp=dummy&'+ 
	'sel_levl=dummy&'+ 
	'sel_sess=dummy&'+ 
	'sel_instr=dummy&'+ 
	'sel_ptrm=dummy&'+ 
	'sel_attr=dummy&'+ 
	'sel_subj=%s&' %(sel_subj) +
	'sel_crse=%s&' %(sel_crse) +
	'sel_title=%s&' %(sel_title) +
	'sel_schd=' + chr(37) + '25&'+ 
	'sel_from_cred=%s&' %(sel_from_cred) +
	'sel_to_cred=%s&' %(sel_to_cred) +
	'sel_levl=%s&' %(sel_levl) +
	'sel_dunt_unit=%s&' %(sel_dunt_unit) +
	'sel_dunt_code=%s&' %(sel_dunt_code) +
	'sel_instr=' + chr(37) + '25&'+
	'begin_hh=%s&' %(begin_hh) +
	'begin_mi=%s&' %(begin_mi) +
	'begin_ap=%s&' %(begin_ap) +
	'end_hh=%s&' %(end_hh) +
	'end_mi=%s&' %(end_mi) +
	'end_ap=%s'  %(end_ap)))
	
	return(myURL + '?' + postQuery)