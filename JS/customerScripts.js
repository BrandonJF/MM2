//customerScripts.js
//(c) 2010 Jacob Reed @ Euclid Technology
//Description: These functions are related to the manipulation of Customer and Org records//


//inserts update / create profile into a section

function insertProfile(div) {
	if (CUSTOMERCD == '') {
		var url = '../memberdll.dll/openpage?wrp=ajax_profile.htm&wmt=none';
	} else {
		var url = '../memberdll.dll/info?wrp=ajax_profile.htm&wmt=none';
	}

	$("div").load(url);
}


//copys a users primary address to their alternate address

function copyAddress(formName) {
	if (formName.ADDRESS1 && formName.ALTADDRESS1) {
		formName.ALTADDRESS1.value = formName.ADDRESS1.value;
	}
	if (formName.ADDRESS2 && formName.ALTADDRESS2) {
		formName.ALTADDRESS2.value = formName.ADDRESS2.value;
	}
	if (formName.ADDRESS3 && formName.ALTADDRESS3) {
		formName.ALTADDRESS3.value = formName.ADDRESS3.value;
	}
	if (formName.CITY && formName.ALTCITY) {
		formName.ALTCITY.value = formName.CITY.value;
	}
	if (formName.STATECD && formName.ALTSTATE) {
		formName.ALTSTATE.selectedIndex = formName.STATECD.selectedIndex;
	}
	if (formName.ZIP && formName.ALTZIP) {
		formName.ALTZIP.value = formName.ZIP.value;
	}
	if (formName.COUNTRY && formName.ALTCOUNTRY) {
		formName.ALTCOUNTRY.selectedIndex = formName.COUNTRY.selectedIndex;
	}
	if (formName.EMAIL && formName.ALTEMAIL) {
		formName.ALTEMAIL.value = formName.EMAIL.value;
	}
	if (formName.ADDRESSTYPE && formName.ALTADDRESSTYPE) {
		if (formName.ADDRESSTYPE.selectedIndex > 0) {
			formName.ALTADDRESSTYPE.selectedIndex = formName.ADDRESSTYPE.selectedIndex;
		}
	}
}

function copyOrgInfo(formName) {
	if (formName.ADDRESS1 && formName.ORGADDRESS1) {
		formName.ADDRESS1.value = formName.ORGADDRESS1.value;
	}
	if (formName.ADDRESS2 && formName.ORGADDRESS2) {
		formName.ADDRESS2.value = formName.ORGADDRESS2.value;
	}
	if (formName.CITY && formName.ORGCITY) {
		formName.CITY.value = formName.ORGCITY.value;
	}
	if (formName.STATECD && formName.ORGSTATECD) {
		formName.STATECD.selectedIndex = formName.ORGSTATECD.selectedIndex;
		formName.STATECD.value = formName.ORGSTATECD.value;
	}
	if (formName.ZIP && formName.ORGZIP) {
		formName.ZIP.value = formName.ORGZIP.value;
	}
	if (formName.COUNTRY && formName.ORGCOUNTRY) {
		formName.COUNTRY.selectedIndex = formName.ORGCOUNTRY.selectedIndex;
		formName.COUNTRY.value = formName.ORGCOUNTRY.value;
	}
	if (formName.EMAIL && formName.ORGEMAIL) {
		formName.EMAIL.value = formName.ORGEMAIL.value;
	}
	if (formName.WORKPHONE && formName.ORGPHONE) {
		formName.WORKPHONE.value = formName.ORGPHONE.value;
	}
}
//opens a list of committee checkboxes for submitted customercd

function committeeWindow(customercd) {
	window.open("../memberdll.dll/customlist?SQLNAME=committee&customercd=" + customercd + "&C.STATUSTT=Active&whp=joinComm_header.htm&wbp=joinComm_list.htm&wmt=../main_template_css.htm&sort=name")
}

function copyBillingInfo(formName) {
	if (formName.FIRSTNAME && formName.CREDITFIRSTNAME) {
		formName.CREDITFIRSTNAME.value = formName.FIRSTNAME.value;
	}
	if (formName.LASTNAME && formName.CREDITLASTNAME) {
		formName.CREDITLASTNAME.value = formName.LASTNAME.value;
	}
	if (formName.ADDRESS1 && formName.CREDITADDRESS1) {
		formName.CREDITADDRESS1.value = formName.ADDRESS1.value;
	}
	if (formName.ADDRESS2 && formName.CREDITADDRESS2) {
		formName.CREDITADDRESS2.value = formName.ADDRESS2.value;
	}
	if (formName.ADDRESS3 && formName.CREDITADDRESS3) {
		formName.CREDITADDRESS3.value = formName.ADDRESS3.value;
	}
	if (formName.CITY && formName.CREDITCITY) {
		formName.CREDITCITY.value = formName.CITY.value;
	}
	if (formName.STATECD && formName.CREDITSTATECD) {
		formName.CREDITSTATECD.selectedIndex = formName.STATECD.selectedIndex;
		formName.CREDITSTATECD.value = formName.STATECD.value;
	}
	if (formName.ZIP && formName.CREDITZIP) {
		formName.CREDITZIP.value = formName.ZIP.value;
	}
	if (formName.COUNTRY && formName.CREDITCOUNTRY) {
		formName.CREDITCOUNTRY.selectedIndex = formName.COUNTRY.selectedIndex;
		formName.CREDITCOUNTRY.value = formName.COUNTRY.value;
	}
}
/*////////////////////// ORGNAIZTION SEARCH ////////////////////////////////*/

// Search for organization name

function RunOrgSearch(formName) {
	//alert('in runOrgSearch');
	var newSearch = document.abc.ORGNAME.value;

	if (newSearch.length < 2) {
		alert('Please enter the first two characters (or more) of the organization name');
		formName.ORGNAME.focus();
		return false;
	} else {
		newSearch = newSearch + '~';
		window.open("../organizationdll.dll/List?ORGNAME=" + newSearch + "&SORT=ORGNAME&WMT=../main_template_none.htm&WHP=addOrg_header.htm&WBP=addOrg_list.htm&WNR=addOrg_noRec.htm&RANGE=1/25", "", "fullscreen=no,location=yes,toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=480")

		return true;
	}
}

function RunNewOrgSearch(formName) {
	tmpstr = formName.ORGNAME.value;
	if (tmpstr.length < 2) {
		alert('You must enter the first two letters of the organization name');
		return false;
	} else {
		tmpstr = tmpstr + '~';
		location.href = "../organizationdll.dll/List?ORGNAME=" + tmpstr + "&SORT=ORGNAME&WMT=../main_template_none.htm&WHP=addOrg_header.htm&WBP=addOrg_list.htm&WNR=addOrg_noRec.htm&RANGE=1/25";
		return true;
	}
}


function closeOrgWindow(linkname, okToReplace) {
	var tmpnom = 0;
	for (var i = 0; i < document.anchors.length; i++) {

		if (document.anchors[i].name == linkname) {
			tmpnom = i;
			break;

		}
	}
	//tmpnom = tmpnom -1;

	var oOpener = window.parent.document.order;
	if (oOpener.ORGNAME) {
		oOpener.ORGNAME.value = document.resultlist.elements[tmpnom * 12].value;
	}
	if (oOpener.ORGNAME_field) {
		oOpener.ORGNAME_field.value = document.resultlist.elements[tmpnom * 12].value;
	}
	if (okToReplace) {
		if (oOpener.ADDRESS1) {
			oOpener.ADDRESS1.value = document.resultlist.elements[tmpnom * 12 + 1].value;
		}
		if (oOpener.ADDRESS2) {
			oOpener.ADDRESS2.value = document.resultlist.elements[tmpnom * 12 + 2].value;
		}
		if (oOpener.CITY) {
			oOpener.CITY.value = document.resultlist.elements[tmpnom * 12 + 3].value;
		}
		if (oOpener.CITY_field) {
			oOpener.CITY_field.value = document.resultlist.elements[tmpnom * 12 + 3].value;
		}
		if (oOpener.STATECD) {
			oOpener.STATECD.value = document.resultlist.elements[tmpnom * 12 + 4].value;
		}
		if (oOpener.ZIP) {
			oOpener.ZIP.value = document.resultlist.elements[tmpnom * 12 + 5].value;
		}
		if (oOpener.COUNTRY) {
			oOpener.COUNTRY.value = document.resultlist.elements[tmpnom * 12 + 6].value;
		}
		if (oOpener.WORKPHONE) {
			oOpener.WORKPHONE.value = document.resultlist.elements[tmpnom * 12 + 7].value;
		}
	}

	//if (oOpener.ISMEMBERFLG) { window.opener.document.abc.ISMEMBERFLG.value=document.resultlist.elements[tmpnom*12+9].value; }
	if (oOpener.CUSTOMERTYPE) {
		oOpener.CUSTOMERTYPE.value = document.resultlist.elements[tmpnom * 12 + 10].value;
	}
	if (oOpener.STATUSTT) {
		oOpener.STATUSSTT.value = document.resultlist.elements[tmpnom * 12 + 11].value;
	}
	var buffstr = document.resultlist.elements[tmpnom * 12 + 10].value;
	if (oOpener.ORGCD) {
		oOpener.ORGCD.value = linkname;
	}
	// window.close();

	window.parent.$("#State").selectmenu("refresh", true);
	window.parent.$("#Country").selectmenu("refresh", true);
	window.parent.$("#popupBasic").popup("close");
}

function closeOrgSearchWindow(linkname, okToReplace) {
	var tmpnom = 0;
	for (var i = 0; i < document.anchors.length; i++) {

		if (document.anchors[i].name == linkname) {
			tmpnom = i;
			break;

		}
	}
	//tmpnom = tmpnom -1;

	var oOpener = parent.document.searchform;
	if (oOpener.ORGNAME) {
		oOpener.ORGNAME_field.value = document.resultlist.elements[tmpnom * 12].value;
	}
	// window.close();
	window.parent.closeIframe();
}


/*//// MEMBER SEARCH ////////////////////////////////////////*/
//adds wildcards and verifies at least one field is specified

function memberSearchValidater(formName) {

	/*	//make sure at least one search option is selected
	if ((formName.LASTNAME_field.value != '') ||
	  (formName.FIRSTNAME_field.value != '') ||
	  (formName.STATECD.selectedIndex != 0) ||
	  (formName.ZIP.value != '') ||
	  (formName.ORGNAME_field.value != '')||
	  (formName.CUSTOMERTYPE.selectedIndex != '')||{
*/

	if (formName.FIRSTNAME_field.value != '') {
		formName.FIRSTNAME.value = formName.FIRSTNAME_field.value + '~';
	}
	if (formName.LASTNAME_field.value != '') {
		formName.LASTNAME.value = formName.LASTNAME_field.value + '~';
	}
	if (formName.ORGNAME_field.avalue != '') {
		formName.ORGNAME.value = formName.ORGNAME_field.value + '~';
	}
	if (formName.CITY_field.value != '') {
		formName.CITY.value = formName.CITY_field.value + '~';
	}
	if (formName.EMAIL_field.value != '') {
		formName.EMAIL.value = formName.EMAIL_field.value + '~';
	}
	if (formName.ZIP_field.value != '') {
		formName.ZIP.value = formName.ZIP_field.value + '~';
	}
	// if(formName.ISMEMBERFLG_field.checked){
	// 	formName.ISMEMBERFLG.value = "Y";
	// }else{
	// 	formName.ISMEMBERFLG.value = '';
	// }

	//debug(formName.ISMEMBERFLG.value);
	formName.submit();
	return true;

}

function orgSearchValidater(formName) {
	if (formName.ORGNAME_field.avalue != '') {
		formName.ORGNAME.value = formName.ORGNAME_field.value + '~';
	}
	if (formName.CITY_field.value != '') {
		formName.CITY.value = formName.CITY_field.value + '~';
	}
	
	if (formName.ZIP_field.value != '') {
		formName.ZIP.value = formName.ZIP_field.value + '~';
	}

	formName.submit();
	return true;

}

function passwordConfirm(formName) {
	if (formName.WEBUSERPASSWORD) //dont check if not there
	{
		var confirmpsd1 = formName.WEBUSERPASSWORD.value;
		var confirmpsd2 = formName.WEBUSERPASSWORD2.value;
		if (formName.WEBUSERPASSWORD.value == "") {
			alert("\nThe Confirm Password field is blank.\n\nPlease enter your Confirm Password");
			formName.WEBUSERPASSWORD.focus();
			return false;
		}
		if (confirmpsd2 != confirmpsd1) {
			alert("\nConfirm Password does not match, please re-enter Confirm Password");
			formName.WEBUSERPASSWORD2.focus();
			formName.WEBUSERPASSWORD2.select();
			return false;
		} else {
			return true;
		}
	}
	return true;
}

function showPrefPhone() {
	if ('<#WORKPHONE>' == '') {
		$('tr[id^="trWph"]').hide();
	}
	if ('<#FAXPHONE>' == '') {
		$('#trFph').hide();
	}
	if ('<#MOBILEPHONE>' == '') {
		$('#trMph').hide();
	}
	if ('<#HOMEPHONE>' == '') {
		$('#trHph').hide();
	}

}

function setAddDoc(myUploadFileInput) {
	if ($.trim($(myUploadFileInput).val()).length > 0) {
		$('#ADDDOC').val('Y');
	} else //nothing was uploaded
	{
		$('#ADDDOC').val('N'); //first set add doc to n
	}
}