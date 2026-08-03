function decodeMail(){
	pf = new Array();
	sld = new Array();
	tld = new Array();
	
	pf[1]  = 'info';
	sld[1] = 'urologie-neuwied';
	tld[1] = 'de';
	
	//pf['sg']  = 'gonsorowski';
	//sld['sg'] = 'giel';
	//tld['sg'] = 'de';
	

	$('.jsmail').each(function(){	
		var mailaddress = $(this).attr('id');
		var res = mailaddress.split('_');
		var no = res[1];
		
		var mail_1 = pf[no];
		var mail_2 = sld[no];
		var mail_3 = tld[no];
		var mail = mail_1+'&#64;'+mail_2+'&#46;'+mail_3;
		
		var link_1='<a href="mai' + 'lto:';
		var link_2='">';
		var link_3='</a>';
		
		$(this).html(link_1+mail+link_2+mail+link_3);
	});
	
}