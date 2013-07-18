//EUCLID TECHNOLOGY//
//euclidScripts.js//
//These functions are general for the entire website//
//3/30/09//


/*////////////////////// UITLITIES /////////////////////////////////////////*/

//displays debug message
//uses variable DEBUG (if DEBUG=true, display debug)
function debug(message){
	if(DEBUG){alert('DEBUG: \n\n'+message)};
}

//updates iFrame height to match contents of iFrame
function updateHeight(){
     //updated by Charlie for jquery compatibility
     var divcontent = document.getElementById("content");
     var widthStr = divcontent.offsetHeight;
        if(widthStr == '0'){
               widthStr = document.documentElement.clientHeight;
        }
        if(widthStr != '0'){
               var finalWidth = (parseInt(widthStr) + 10) + 'px';
               window.top.document.getElementsByTagName('iframe')[0].style.height = finalWidth;
               return true;
        }else{
               return true;
        }
}


function removeNL(text){
	return text.replace(/[\n\r\t]/g,'');
}

function removeSpaces(text){
	return text.replace(/[\s]/g,'');
}


function createPOST(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    var newForm = document.createElement("form");
    newForm.setAttribute("method", method);
    newForm.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        newForm.appendChild(hiddenField);
    }

	document.body.appendChild(newForm);
    newForm.submit();
}



//returns arbitrary parameter from the URL
//example: URL = '../memberdll.dll/list?ismemberflg=Y&DOSEARCH=N&sort=LASTNAME
//getURLValue('DOSEARCH') -> N
function getURLValue(name){
	var finalValue = '';
	var URL = window.location + '';

	if(URL.match(name)){
		var tempSplitter = name+'=';
		var tempArr = URL.split(tempSplitter);
		var secondHalf = '';
		secondHalf = tempArr[1];


		//if parameters continue
		if(secondHalf.match('&')){
			var tempArr2 = secondHalf.split('&');
			finalValue = tempArr2[0];
		}else{
			finalValue = secondHalf;
		}
	}
	return finalValue;
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return '';
}

function Set_Cookie( name, value, expires, path, domain, secure ) {
	//alert('setting cookie!');
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );

	/*
	if the expires variable is set, make the correct
	expires time, the current script below will set
	it for x number of days, to make it for hours,
	delete * 24, for minutes, delete * 60 * 24
	*/
	if ( expires ){
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}


// get cookie value by cookie name
function GetCookieValue(name)
{
	debug("ERROR: GetCookieValue is a depreciated function and should no longer be used.");

	var allcookies = document.cookie;
	var value = "";
	var pos = allcookies.indexOf(name+"=");
	if (pos != -1)
	{
		var start = pos + name.length+1;
		var end = allcookies.indexOf(";", start);
		if (end == -1)
		{
			end = allcookies.length;
		}
		value = allcookies.substring(start, end);
		value = unescape(value);
	}
	return value;

}


//calls a function (func) with specified arguments array (argArr) when user clicks "enter"
function submitenter(myfield,e,func,argArr){
	var keycode;
	if (window.event) {keycode = window.event.keyCode; }
	else if (e) {keycode = e.which;}
	else {return true;}
	if (keycode == 35)
	   {
	   func.apply(null, argArr);
	   return false;
	   }
	else
	   {return true;}
}


//prints current page
function printpage() {
	window.print();
}

//mails current page link
function mailpage()
{
	mail_str = "mailto:?subject=aca Send to a friend -- " + document.title;
	mail_str += "&body= This is a link to an item on the aca Website:" + "&nbsp;&nbsp;"+ location.href;
	location.href = mail_str;
}


// Prompt user before emptying shopping cart.
// NEILTAG 5/31/07
function emptyCartConfirmation() {
	var answer = confirm("Empty your cart?")
	if (answer){
		window.location = "../msascartdll.dll/clearcart";
	}
}


//writes year dropdown from current year  -> (current year + addYears)
function selectYear(addYears){

	//alert('in selectYEars()');
	var d = new Date();
	var endYear = d.getFullYear();
	var currYear = d.getFullYear();
	var endYear = parseInt(endYear + addYears);

	document.write('<select name="expireyear">');
	document.write('<option value="">Choose...</option>');
	for(var i=currYear;i<=endYear;i++){
		document.write('<option value="'+i+'">'+i+'</option>');
	}
}


//writes year options from startyear to endyear (must run from within select box)
//enter "NOW" for current year
// if startYear > endYear then go in descending order
//Jacob 4/16/09
function writeYear(startYear, endYear){
	var today = new Date();
	var writeString = '';
	//set start and end year
	if(startYear == 'NOW'){
		startYear = today.getFullYear();
	}

	if(endYear == 'NOW'){
		endYear = today.getFullYear();
	}


	if ($('#ExpireYear option').length==0){
		if(startYear > endYear){
			for(var i=startYear; i>=endYear; i--){
				var yearThing = i+'';
				yearThing = yearThing.substring(2);
				writeString += '<option value="'+yearThing+'">'+i+'</option>';
			}
		}else{
			for(var i=startYear; i<= endYear; i++){
				var yearThing = i+'';
				yearThing = yearThing.substring(2);
				writeString += '<option value="'+yearThing+'">'+i+'</option>';
			}
		}
	}
	$('#ExpireYear').append(writeString);
}
//writes year options from startyear to endyear (must run from within select box)
//enter "NOW" for current year
// if startYear > endYear then go in descending order
// FULL 4 DIGIT YEAR

function writeFullYear(startYear, endYear){
	var today = new Date();
	var writeString = '<option value=""></option>';
	//set start and end year
	if(startYear == 'NOW'){
		startYear = today.getUTCFullYear();
	}

	if(endYear == 'NOW'){
		endYear = today.getUTCFullYear();
	}

	if(startYear > endYear){
		for(var i=startYear; i>=endYear; i--){
			var yearThing = i+'';
			writeString += '<option value="'+yearThing+'">'+i+'</option>';
		}
	}else{
		for(var i=startYear; i<= endYear; i++){
			var yearThing = i+'';
			writeString += '<option value="'+yearThing+'">'+i+'</option>';
		}
	}
	document.write(writeString);
}


//default view for dates (MM/DD/YYYY)
Date.prototype.defaultView=function(){
	var dd=this.getDate();
	if(dd<10)dd='0'+dd;
		var mm=this.getMonth()+1;
	if(mm<10)mm='0'+mm;
		var yyyy=this.getFullYear();

	return String(mm+"\/"+dd+"\/"+yyyy);
}


/*///////////////////////// LOG IN FUNCTIONALITY /////////////////////////*/

//checks &REDIRECTURL= parameter in header and submits login
function submitLogin(formName){
	//check for redirectURL
	var loc = window.location+'';
	//debug(loc);
	var temp = loc.split("REDIRECTURL=");
	var redirectURL = temp[1];
	console.log('redirectURL is: '+redirectURL);

	var webID = formName.WEBUSERID.value;
	var webPWD = formName.WEBUSERPASSWORD.value;

	if((redirectURL != '') && (redirectURL != undefined)){
		formName.REDIRECTURL.value = redirectURL;
	}


}


//calls the passed function when you hit enter
function submitEnter(myfield,e)
{
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;

	if(keycode == 13){
	  alert('yeah!');
	   return false;
	}else{
		return true;
	}
}


//sets "Remember Me" flag
function setRemember(){
		//alert('in setRemember');
		if(document.loggedIn.rememberMe.checked){
				Set_Cookie('rememberMe','Y',999,'/','','');
		}else{
				Set_Cookie('rememberMe','N',999,'/','','');
		}
}

//gets value of rememberMe to set checkbox
function getRemember(){
		//alert('in getRemember');
		if(GetCookieValue('rememberMe')=='Y'){
				document.loggedIn.rememberMe.checked=true;
		}else{
			document.loggedIn.rememberMe.checked=false;
		}
}


//to check cookie and redirect to Path if user has already logged in
function ResetLogin(Path)
{
	document.login.CUSTOMERCD.value = CUSTOMERCD;
	var remembered = GetCookieValue('rememberMe');
	if ((document.login.CUSTOMERCD.value != "") && (remembered == 'Y'))
	{
		location.href = Path;
	}
	document.login.WEBUSERID.focus();
}

//handles login / logoff
function showLogin(){
	if(CUSTOMERCD == ''){
		//alert('logged out');
		$("#loginDiv").show();
		$("#myAccountDiv").hide();
	}else {
		//alert('logged in');
		$("#loginDiv").hide();
		$("#myAccountDiv").show();
	}
}


// set REDIRECTURL hidden field value
function SetRedirectURL()
{
	var RedirectStr=""

	if (location.search)
	{
		RedirectStr=location.search.substring(1,255);
	}
	document.login.REDIRECTURL.value=RedirectStr;
}


//to check cookie and redirect to Path if user has already logged in
function ResetLogin(Path)
{
	document.login.CUSTOMERCD.value = GetCookieValue("memberid");
	if (document.login.CUSTOMERCD.value != "")
	{
		location.href = Path;
	}
	document.login.WEBUSERID.focus();
}

//Use to submit Rating Form --- not currently being used, needs further development
function SubmitRating(formName)
{

		var rateURL = '../cvrating.dll/add';
		//var rateURL = '../cvrating.dll/add?ENTITYCD='+formName.ENTITYCD.value+'&ENTITYTYPECD=P';
		var params='ENTITYCD='+formName.ENTITYCD.value+'&ENTITYTYPECD='+formName.ENTITYTYPECD.value;

		$.ajax({url:rateURL, type:"POST", async:false, data:params});

		window.location = rateURL;
}



/*///////// NOT SURE WHAT THESE DO //////////////////////////////*/




function RunLogin()
{
	var RedirectStr=""

	if (location.search)
	{
		RedirectStr=location.search.substring(1,255);
	}
	document.login.REDIRECTURL.value=RedirectStr;
	document.login.submit()
}



//returnns the summary results to the window
function prodRateSummary(prodCode)
{
	//summURL = 'http://testdrive.euclidtechnology.com/cvbaseline_new/cgi-bin/cvrating.dll/Summary?ENTITYTYPECD=P&ENTITYCD='+prodCode;
	summURL= "";

	return summURL;

}

function getOrgInfo(){
	var orgid = '';
	var orgname = '';
	orgid = document.abc.orgDropdown.options[document.abc.orgDropdown.selectedIndex].value;
	orgname = document.abc.orgDropdown.options[document.abc.orgDropdown.selectedIndex].innerHTML;

	document.abc.ORGNAME.value = orgname;
	document.abc.ORGCD.value = orgid;
}

function getDateFromMonAndYr(mo, yr)
{
	var myNewDate;
	myNewDate = new Date(yr, mo, "1");
	return myNewDate;
}

//remove leading/trailing ws and lowercase it
function cleanInput(valueFromField)
{
	return $.trim(valueFromField).toLowerCase();
}

function removeNonnumeric(myString)
{
	return myString.replace(/\D/g,'');
}

function getCurrDate()
{
	var today = new Date();
	var m = today.getUTCMonth() + 1;
	var d = today.getUTCDate();
	var y = today.getUTCFullYear();
	return new Date(y, m, d);
}

function parseNotesField(myNotesData)
{
	var html = removeNL(myNotesData);
	var div = document.createElement("div");
	div.innerHTML = html;
	var myParsedNote = div.textContent || div.innerText || "";
	return myParsedNote;
}

function FormatCity(myCity, myState)
{
	if ($.trim(myCity).length > 0 && $.trim(myState).length > 0)
	{myCity = myCity + ", ";}
	return myCity;
}



function GetZipInfo(zipValue){
	var updStr='../memberdll.dll/ZipInfo?ZIP='+zipValue+'&WRP=zipInfo.htm&WMT=none&WNR=none';
	$.ajax({url:updStr, type:'GET',
		success:function(response){
			//alert(response);
			if (response != '')
			{
				var ZipList = new Array();
				ZipList =  response.split(',');
				ZipList[1] = ZipList[1].substr(0,ZipList[1].length-2);



				document.order.CHAPTERID.value  = ZipList[0];
				//alert(document.order.CHAPTERID.value);
				for (var i = 0; i < document.order.STATECD.length; i++)
				{
					if (document.order.STATECD.options[i].value == ZipList[1])
  					{
						document.order.STATECD.options[i].selected=true;
						break;
    					}
				}
			}
			else
			{
				alert('The Zip Code that you entered is not valid. Please try again!');
				document.order.ZIP.value = '';
		        	document.order.ZIP.select();
        			document.order.ZIP.focus();
			}
		}
	});
}

function BillZipToState(zipValue){
	var updStr='../memberdll.dll/ZipInfo?ZIP='+zipValue+'&WRP=zipInfo.htm&WMT=none&WNR=none';
	$.ajax({url:updStr, type:'GET',
		success:function(response){
			//alert(response);
			if (response != '')
			{
				var ZipList = new Array();
				ZipList =  response.split(',');
				ZipList[1] = ZipList[1].substr(0,ZipList[1].length-2);



				//document.order.CHAPTERID.value  = ZipList[0];
				//alert(document.order.CHAPTERID.value);
				for (var i = 0; i < document.order.CREDITSTATECD.length; i++)
				{
					if (document.order.CREDITSTATECD.options[i].value == ZipList[1])
  					{
						document.order.CREDITSTATECD.options[i].selected=true;
						break;
    					}
				}
			}
			else
			{
				alert('The Zip Code that you entered is not valid. Please try again!');
				document.order.CREDITZIP.value = '';
		        	document.order.CREDITZIP.select();
        			document.order.CREDITZIP.focus();
			}
		}
	});
}

function ShipZipToState(zipValue){
	var updStr='../memberdll.dll/ZipInfo?ZIP='+zipValue+'&WRP=zipInfo.htm&WMT=none&WNR=none';
	$.ajax({url:updStr, type:'GET',
		success:function(response){
			//alert(response);
			if (response != '')
			{
				var ZipList = new Array();
				ZipList =  response.split(',');
				ZipList[1] = ZipList[1].substr(0,ZipList[1].length-2);



				//document.order.CHAPTERID.value  = ZipList[0];
				//alert(document.order.CHAPTERID.value);
				for (var i = 0; i < document.order.CREDITSTATECD.length; i++)
				{
					if (document.order.SHIPSTATECD.options[i].value == ZipList[1])
  					{
						document.order.SHIPSTATECD.options[i].selected=true;
						break;
    					}
				}
			}
			else
			{
				alert('The Zip Code that you entered is not valid. Please try again!');
				document.order.SHIPZIP.value = '';
		        	document.order.SHIPZIP.select();
        			document.order.SHIPZIP.focus();
			}
		}
	});
}


function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};