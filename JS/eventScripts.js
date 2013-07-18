/*/////////////////////// EVENT RELATED FUNCTIONS ///////////////////////////////*/
function checkFunctionTime(formName,fdate, ftime, fcd){
    var willDisable = 0;
    for (var i=0; i<formName.length; i++){
        if((formName.elements[i].type == 'checkbox') && (formName.elements[i].checked) && (formName.elements[i].name != fcd)){
            //var cdate=$('input[name='+formName.elements[i].name+']').attr('title');

            var ctime = $('input[name='+formName.elements[i].name+']').attr('alt');
            var cdate = ctime.split('|');
            if ((cdate[0]==fdate) && (cdate[1]==ftime)){
                alert('There is a scheduling conflict between this function and another function you already selected. Please choose a different function.');
                if(formName.elements[i].type == 'checkbox'){
                    $('input[name='+fcd+']').removeAttr('checked');
                }else{
                    formName.elements[i].value='0';
                }
                willDisable=1;
            }
        }
    }
}

function eventReg_addToCart_noProfile(formName, successRedirect)
{
	//send registration to cart
	var cartURL = '../msascartdll.dll/showcart?';
	var params = 'ADD=ORDERTYPE=S,ITEMCD='+formName.SESSIONALTCD.value+',PRICECD='+formName.PRICETYPESTT.value;

	$('.collectThisFunc').each(function(){
		var funcCD = $(this).attr('name');
		var assocComment = "FCM_" + funcCD;
        if (this.checked){
            params += '&ADD=ORDERTYPE=F,ITEMCD='+formName.SESSIONALTCD.value+',SUBITEMCD='+funcCD+',ITEMQTY=1';
        }

		if ($(this).attr('type') == 'text')
		{
            if(this.value != ''){
            params += '&ADD=ORDERTYPE=F,ITEMCD='+formName.SESSIONALTCD.value+',SUBITEMCD='+this.id+',ITEMQTY=1,COMMENTS='+this.value;
            }

		}
	});
	if(formName.PROMOCODE.value != ''){
         params += ',APPEALCD='+formName.PROMOCODE.value;
    }
	//debug(cartURL + ' AND PARAMS: ' + params);
	$.ajax({url:cartURL, type:"POST",async:false,data:params,
			success:function(response){
				updateCartHeaderNoAnimate();
                var openerFrame = "";
	$(window.parent.document).each( function() {
		if (this.id != 'iPopUp') {
			 openerFrame = window.parent.document;
		}
	});

	if (openerFrame != "") {
		$(openerFrame).contents().find(".ui-btn-text").each(function(index) {
			if ($(this).html()=="Select Functions"){
				$(this).html('Add More Functions');
			}
		});

		//$(openerFrame).contents().find("#selectFunctions").html('Add More Functions');
		$(openerFrame).contents().find("#alreadyAddedToCart").show();
	}
				window.parent.$( "#popupBasic" ).popup( "close" );


			}
		});


}
function updateCartHeaderNoAnimate() {

	var updateCartUrl = '../msascartdll.dll/ReviewOrder?wrp=cartSum.htm&wmt=none';

	//$("#cartHeaderSummary", window.parent.document).html("<img src='../../images/ajax-loader.gif'>");

		$.ajax({url:updateCartUrl, type:'GET', async:false,
			success: function(response){

				//$("#cartHeaderSummary", window.parent.document).css({opacity:0.0})
				$("#cartHeaderSummary", window.parent.document).html(response);

			},
			error: function(){alert('An AJAX error has occured. Please ensure that you have Javascript-enabled browser and re-load the page to try again.');}
		});
	//$("#cartHeaderSummary", window.parent.document).css({opacity:1});


	return true;

}
/*////////////////// EVENT SEARCH Function //////////////////////////////////*/

function RunSearch() {
     if ( (isBegindate()) )
     document.form1.submit();
	  return true;
}
function loadEventSearch(myDiv)
{
	var url = '../utilities.dll/openpage?WHP=none&WRP=eventsearch.htm&WMT=none';
	$(myDiv).load(url);
}

function isBegindate() {

	var myselect = document.form0.selectdate.selectedIndex;
    var today = new Date();
	year = today.getYear();
	if (year < 2000)
	year = year + 1900;
    switch (myselect) {
	case 0:
 	  document.form1.SESSIONBEGDATE.value = "";
          break;
        case 1:
	  		 var tbegdate = ( (today.getMonth() + 1) + "/" + (today.getDate()) + "/" + year );
           var tenddate = ( (today.getMonth() + 2) + "/" + (today.getDate()) + "/" + year );
	   document.form1.SESSIONBEGDATE.value = "BETWEEN '" + tbegdate+"' AND '"+tenddate+"'";
           break;
        case 2:
	   var tbegdate = ( (today.getMonth() + 1) + "/" + (today.getDate()) + "/" + year );
           var tenddate = ( (today.getMonth() + 4) + "/" + (today.getDate()) + "/" + year );
	   document.form1.SESSIONBEGDATE.value = "BETWEEN '" + tbegdate+"' AND '"+tenddate+"'";
           break;
        case 3:
	   var tbegdate = ( (today.getMonth() + 1) + "/" + (today.getDate()) + "/" + year );
           var tenddate = ( (today.getMonth() + 1) + "/" + (today.getDate()) + "/" + (year+1));
	   document.form1.SESSIONBEGDATE.value = "BETWEEN '" + tbegdate+"' AND '"+tenddate+"'";
           break;
        default:
           var MonthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
 	   var tbegdate = ( myselect-3 + "/" + 01 + "/" + year );
           var tenddate = ( myselect-3 + "/" + MonthDays[ myselect-4] + "/" + year);
	   document.form1.SESSIONBEGDATE.value = "BETWEEN '" + tbegdate+"' AND '"+tenddate+"'";

	}


    if (document.form1.SESSIONBEGDATE.value == "")
	{
 	   var tbegdate = ( (today.getMonth()+1) + "/" + (today.getDate()-1) + "/" + year );
           document.form1.SESSIONBEGDATE.value="BETWEEN '" + tbegdate+"' AND '01/01/2040'";
	}

      return true;
}

/////Used on the Event Search Page
function setDates(formName){
	var dateString ='';
	if((formName.fromDate.value != '') && (formName.toDate.value != '')){
		dateString = 'BETWEEN '+formName.fromDate.value+' AND '+formName.toDate.value;
	}else if(formName.fromDate.value != ''){
		dateString = '>'+formName.fromDate.value;
	}else if(formName.toDate.value != ''){
		dateString = '<'+formName.toDate.value;
	}else{
		var today = new Date;
		dateString = today.defaultView();
		formName.fromDate.value = dateString;
		dateString = '>' + dateString;
	}

	formName.SESSIONBEGDATE.value = dateString;
	//alert(document.abc.SESSIONBEGDATE.value);
	return true;
}






/*/////////////  SINGLE REGISTRATION -- Functions related to Single Registration   //////////////////////*/

//Called upon clicking "single register" link - determines if event status will allow registration and takes user to correct page
function EventRegister(eventstatus, eventcd) {
	//alert('here!');
	if (eventstatus<2){

		if (eventstatus==1){
			alert('This event is full. If you would like to be placed on a waiting list please select OK to complete the registration form.')
		}

		if (CUSTOMERCD != ""){
			location='../Registerdll.dll/RegistrationForm?sessionaltcd='+eventcd;
		}else{
			alert("Please log in or create an account before registering for this event.");
			location.href = '../utilities.dll/openpage?wrp=MainLogin.htm&REDIRECTURL=../Registerdll.dll/RegistrationForm?sessionaltcd='+eventcd+'&FUNFILTER=RBN';
		}

	}else {
		alert('This event is closed.');
	}
}

function getFunctions(formName)
{
	//alert('in getFunctions!');
	var tmpint ="";
	var tmpqty = "";
	var pos="";
	var size="";
	for (var i=0; i<formName.length; i++){
	   if (formName.elements[i].type == 'text') {
	        if (formName.elements[i].value > 0) {
                tmpint = tmpint + ',' + formName.elements[i].name;
                tmpqty = tmpqty + ','+formName.elements[i].name+'='+formName.elements[i].value;
	        }else if (formName.elements[i].value == 0) {
				if (formName.elements[i].name==formName.AUTOFUNCTIONCD.value)
				{
					formName.elements[i].value=1;
                    tmpint = tmpint + ',' +formName.elements[i].name;
                    tmpqty = tmpqty + ','+formName.elements[i].name+'='+formName.elements[i].value
				}
			}
		}else if (formName.elements[i].type == 'checkbox'){
		 	if (formName.elements[i].checked == true){
				tmpint = tmpint + ',' + formName.elements[i].name;
				tmpqty = tmpqty + ','+formName.elements[i].name+'='+formName.elements[i].value;
	        }
            else{
				if (formName.elements[i].name==formName.AUTOFUNCTIONCD.value)
				{
					formName.elements[i].value=1;
					tmpint = tmpint + ',' + formName.elements[i].name;
					tmpqty = tmpqty + ','+formName.elements[i].name+'='+formName.elements[i].value
				}
			}
		}else if (formName.elements[i].type == 'radio'){
		 	if (formName.elements[i].checked == true){
				tmpint = tmpint + ',' + formName.elements[i].name;
				tmpqty = tmpqty + ','+formName.elements[i].name+'='+formName.elements[i].value;
	        }
            else{
				if (formName.elements[i].name==formName.AUTOFUNCTIONCD.value)
				{
					formName.elements[i].value=1;
					tmpint = tmpint + ',' + formName.elements[i].name;
					tmpqty = tmpqty + ','+formName.elements[i].name+'='+formName.elements[i].value
				}
			}
		}

	}

	pos = tmpint.indexOf(',');
	pos = pos +1;
	size = tmpint.length;
	var final = tmpint.substring(pos,size);
	formName.FUNCTIONS.value=final;

	pos = tmpqty.indexOf(',');
	pos = pos +1;
	size = tmpqty.length;
	var final = tmpqty.substring(pos,size);
	formName.FUNCTIONSQTY.value=final;

	return true;
}

//Determines if the user has selected a price type and throws error if not
function priceTest(formName){
	var hold="";
	var pricetype ="";
	var priceamt ="";
	for (var i=0; i<formName.PRICETYPESTT.length; i++)
	{
			if(formName.PRICETYPESTT.options[i].selected){
				 hold = formName.PRICETYPESTT.options[i].text;
				 var size = hold.length;
				 if (formName.PRICETYPESTT.options[0].selected){
				 pos =hold.lastIndexOf('-');
				 pos =pos-1;
				 pricetype = hold.substring(0,pos);
				 priceamt = hold.substring((pos+2),size);
				 }
				 else {
				 pos = hold.lastIndexOf('-')
				 pos =pos-1;
				 pricetype = hold.substring(0,pos);
				 priceamt = hold.substring((pos+2),size);
				 }
		   }
	}

	//alert(priceamt);
	//alert(pricetype);
	if (priceamt==""){
		  alert("\nYou must select the Price Category from the dropdown box.");
		  formName.PRICETYPESTT.focus();
		  return false;
	}else{
		formName.FPRICEAMT.value = priceamt;
		formName.FPRICETYPESTT.value = pricetype;
		return true;
	}
}


//does something upon price change
function priceChanged(formName)
{
	var ss="";
	var after="";
	if (location.href) {ss=location.href.substring(0,255);}
	var pos = ss.lastIndexOf("&ADDCUSTOMERCD=");
	if (pos>-1)
	{
		after = ss.substring(pos, ss.lenght);
		ss=ss.substring(0,pos);
	}
	var pos = ss.lastIndexOf("&PRICETYPESTT=");
	if (pos>-1)
	{
		ss=ss.substring(0,pos);
	}
	location.href = ss+"&PRICETYPESTT="+formName.PRICETYPESTT.value+after;
}


//checks all function fields to determine if user can add function
function checkAllFunctions(currQty, cancelQty, maxQty, funcQty, funcID, fcode, fqty){
	var willDisable = 0;
	//alert('received: '+currQty+', '+cancelQty+', '+maxQty+', '+funcQty+', '+funcID);
    if (fqty>0)
	{
		var fdate=eval('document.event.D_'+fcode+'.value');
		var ftime=eval('document.event.T_'+fcode+'.value');
		var ftitle=eval('document.event.TITLE_'+fcode+'.value');

		var registered = parseInt(currQty) - parseInt(cancelQty);
		var seatsLeft = parseInt(maxQty) - parseInt(registered);
		var totalQty = parseInt(registered) + parseInt(funcQty);
		var finalQty = parseInt(maxQty) - parseInt(totalQty);

		if(finalQty < 0){
			alert('The function '+ftitle+' only has '+seatsLeft+' seats left. Please select less seats');

			//new 3/20/08
			if(document.getElementById(funcID).type == 'checkbox' || document.getElementById(funcID).type == 'radio'){
				document.getElementById(funcID).checked = false;
			}else{
				document.getElementById(funcID).value='0';
			}

			//document.event.continueButton.disabled=true;
			willDisable=1;
		}

		for (var i=0; i<document.event.length; i++)
		{
			if ((document.event.elements[i].type =='text') || ((document.event.elements[i].type == 'checkbox') && (document.event.elements[i].checked)) || ((document.event.elements[i].type == 'radio') && (document.event.elements[i].checked)) && (document.event.elements[i].id != 'registerMe_button'))
	   		{
				if ((document.event.elements[i].name!=fcode) && (document.event.elements[i].value>0))
				{
						var cdate=eval('document.event.D_'+document.event.elements[i].name+'.value');
						var ctime=eval('document.event.T_'+document.event.elements[i].name+'.value');
						var ctitle=eval('document.event.TITLE_'+document.event.elements[i].name+'.value');
						if ((cdate==fdate) && (ctime==ftime))
						{
							alert('There is a scheduling conflict between '+ftitle+' and '+ctitle+'. Please choose a different function.');

							//new 3/20/08
							//alert(funcID);
							if(document.getElementById(funcID).type == 'checkbox' || document.getElementById(funcID).type == 'radio'){
								document.getElementById(funcID).checked = false;
							}else{
								document.getElementById(funcID).value='0';
							}
							willDisable=1;
						}

						//Dissallows you from selectin two functions with the exact same name
						/*
						if(ctitle==ftitle){
							alert('You have already signed up for the function '+ftitle+'. Please choose a different function.');
							willDisable=1;

							//new 3/20/08
							//alert(funcID);
							if(document.getElementById(funcID).type == 'checkbox'){
								document.getElementById(funcID).checked = false;
							}else{
								document.getElementById(funcID).value='0';
							}
						}*/

				}
			}
		}

	}
}


//add events and funcitons to NEW shopping cart
function eventReg_addToCart(formName, addAnother){

	/*//update user profile information via AJAX
	var custURL = '../memberdll.dll/updateinfo?customercd='+formName.CUSTOMERCD.value
	+'&WEBUSERID='+formName.WEBUSERID.value
	+'&WEBUSERPASSWORD='+formName.WEBUSERPASSWORD.value
	+'&PREFIX='+formName.PREFIX.value
	+'&FIRSTNAME='+formName.FIRSTNAME.value
	+'&MIDDLEINITIAL='+formName.MIDDLEINITIAL.value
	+'&LASTNAME='+formName.LASTNAME.value
	+'&SUFFIX='+formName.SUFFIX.value
	+'&ADDRESS1='+formName.ADDRESS1.value
	+'&ADDRESS2='+formName.ADDRESS2.value
	+'&CITY='+formName.CITY.value
	+'&STATECD='+formName.STATECD.value
	+'&ZIP='+formName.ZIP.value
	+'&COUNTRY='+formName.COUNTRY.value
	+'&HOMEPHONE='+formName.HOMEPHONE.value
	+'&FAXPHONE='+formName.FAXPHONE.value
	+'&MOBILEPHONE='+formName.MOBILEPHONE.value
	+'&COUNTRY='+formName.COUNTRY.value
	+'&EMAIL='+formName.EMAIL.value
	+'&NOEMAILFLG='+formName.NOEMAILFLG.value
	+'&NOMAILFLG='+formName.NOMAILFLG.value;

	$.ajax({url:custURL, type:"GET", async:false});

	debug('profile updated');*/
	var functionCommFilled = true;

	//send registration to cart
	var cartURL = '../msascartdll.dll/showcart?ADD=ORDERTYPE=S,CUSTOMERCD='+formName.MAINCUSTOMERCD.value+',ITEMCD='+formName.SESSIONALTCD.value+',PRICECD='+formName.PRICETYPESTT.value;
	console.log( "This is the cart URL: " + cartURL) ;

	//add functions
	/*var functionList = formName.FUNCTIONSQTY.value.split(',');
	$.each(functionList, function(){
		var tempArr = this.split('=');
		var funcCD = tempArr[0];
		var funcQTY = tempArr[1];
		if(funcQTY == undefined){
			funcQTY = 1;
		}
		cartURL += '&ADD=ORDERTYPE=F,ITEMCD='+formName.SESSIONALTCD.value+',SUBITEMCD='+funcCD+',ITEMQTY='+funcQTY;
	});*/
	$('.collectThisFunc').each(function(){
		var funcCD = $(this).attr('name');
        var funcQTY = this.value;
        if(funcQTY == undefined){
             funcQTY = 1;
        }
        if((this.checked) || (funcQTY > 1)){
            var assocComment = "FCM_" + funcCD;
            cartURL += '&ADD=ORDERTYPE=F,CUSTOMERCD='+formName.MAINCUSTOMERCD.value+',ITEMCD='+formName.SESSIONALTCD.value+',SUBITEMCD='+funcCD+',ITEMQTY='+funcQTY;
            if($('input[name='+assocComment+']').val()){
                cartURL += ',COMMENTS='+ $('input[name='+assocComment+']').val().replace(/,/g,";");
            }
        }
	});
	if (addAnother){
		$.ajax({url:cartURL, type:"GET", async:false});
		$(location.reload(true));
	}else{
		window.location = cartURL;
	}
}


/*///////////// MULTI-REGISTRATION -- Functions related to Multi Registration  //////////////////////////*/

//toggles whether the logged in user should register themselves
function toggleRegisterMe(checkbox){
	if(checkbox.checked == true){
		$('#registerMe_section').show();
	}else{
		$('#registerMe_section').hide();
	}
}

function EventMultiRegister(eventstatus, eventcd){
	if (eventstatus<2){
		if (eventstatus==1){
			alert('This event is full. If you would like to be placed on a waiting list please select OK to complete the registration form.')
		}

		if (CUSTOMERCD != ""){
			location='../../cgi-bin/Registerdll.dll/RegistrationForm?sessionaltcd='+eventcd+'&FUNFILTER=EN&MULTIREG=Y&ONLYOPTIONS=Y&RESPONSEPAGE=MultiRegForm.htm';
		}else{
			alert("Please log in or create an account before registering for this event.");
			location.href = '../memberdll.dll/openpage?wrp=MainLogin.htm&REDIRECTURL=../Registerdll.dll/RegistrationForm?sessionaltcd='+eventcd+'&FUNFILTER=EN&MULTIREG=Y&ONLYOPTIONS=Y&RESPONSEPAGE=MultiRegForm.htm';
		}
	}else {
		alert('This event is closed.');
	}
}



//opens search page with intentional no-records (leave weird email as is)
function openSearchGuests(orgName)
{
	window.open("../memberdll.dll/list?email=3929093jjoijjji&whp=guestSearch_header.htm&wbp=guestSearch_list.htm&wnr=guestSearch_noRec.htm&wmt=../main_Template_none.htm&sort=lastname","","fullscreen=no,location=no,toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,width=760,height=500")
	return true;
}

//opens search page of all users from current user's org
function openSearchGuestsOrg(orgcd)
{
	var searchURL = "../memberdll.dll/list?orgcd="+orgcd+"&whp=guestSearchOrg_header.htm&wbp=guestSearchOrg_list.htm&wnr=guestSearchOrg_noRec.htm&wmt=../main_Template_none.htm&sort=lastname"
	window.open(searchURL,"","fullscreen=no,location=no,toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,width=760,height=400")
	return true;
}


//runs search for guests to add
function searchGuests(formName){
		if(formName.LASTNAME.value != ''){
			formName.LASTNAME.value += '~';
		}
		if(formName.ORGNAME.value != ''){
			formName.ORGNAME.value += '~';
		}

		formName.submit();
		//location.href = "List?EMAIL="+document.resultlist.searchf.value+"&SORT=LASTNAME&RANGE=1/100&WHP=searchHeader.htm&WBP=CustomerSearch.htm&WMT=none&WNR=norec.htm";
}


//for org guest search, adds all selected guests to page
function addGuestsOrg(formName){
	var isChecked = false;
	if(formName.ADDGUEST.length == undefined){
		if(formName.ADDGUEST.checked == true){
			var name = formName.ADDGUEST.id.split('|');;
			var lastName = name[0];
			var firstName = name[1];
			var customercd = formName.ADDGUEST.value;
			addGuest(customercd, lastName, firstName);
			isChecked = true;
		}
	}

	for(var i=0;i<formName.ADDGUEST.length;i++){
		if(formName.ADDGUEST[i].checked == true){
			var name = formName.ADDGUEST[i].id.split('|');
			var lastName = name[0];
			var firstName = name[1];
			var customercd = formName.ADDGUEST[i].value;
			//debug(customercd+', '+lastName+', '+firstName);
			addGuestsOrg_helper(customercd, lastName, firstName);
			isChecked = true;
		}
	}

	if(isChecked){
		parent.focus();
		window.parent.closeIframe();
	}else{
		alert('Please select at least one user from the list before submitting this form.');
	}
}


//adds additional user to the registration
function addGuestsOrg_helper(linkname, lastname, firstname)
{
	//use AJAX to retrieve correct price for user and write user price and other info to opening page
	var sessionaltcd = parent.document.getElementById('SESSIONALTCD').value;
	var priceURL = '../registerdll.dll/registrationform?sessionaltcd='+sessionaltcd+'&customercd='+linkname+'&wrp=guestPrice.htm&pricelist=guestPriceList.htm&wmt=none&wnr=none';
	//debug("priceURL is: "+priceURL);

	$.ajax({url:priceURL, type:'GET', async:false,
		success: function(response){

			//check for no prices
			if(response == ''){ alert("ERROR: There are no prices which apply to the user "+firstname+" "+lastname+". This user will not be added to the registration."); }
			//alert(response);
			var priceSplit = response.split('@');
			var priceInfo = priceSplit[0];
			priceSplit = priceInfo.split('|');
			var priceCode = priceSplit[0];
			var priceName = priceSplit[1];
			var pricePrice = priceSplit[2];

			//alert('Price is: -'+priceCode+'--'+priceName+'--'+pricePrice);

			var defaultform = '<li class="attendee">' + '<input type="checkbox" name="CUSTOMERCD" value="'+linkname+'" checked> ' + '<span class="guestNames">' + lastname + ', ' + firstname +  '</span><span class="attendee"  id="cust'+linkname+'">'+
            ' <input type="button" value="Select Guest Price and Functions" name="addb'+linkname+'" onClick="addGuestFunctions('+linkname+')">'+

			'<BR><b>Registration: </b>'+priceName+' ('+pricePrice+')'+

			'</span>' +

			' <input type="hidden" name="PRICETYPESTT'+linkname+'" value="'+priceCode+'">'+
			' <input type="hidden" name="FUNCTIONS'+linkname+'" value="">'+
			' <input type="hidden" name="FUNCTIONNAMES'+linkname+'" value="">'+
			' </li>';

			//alert("GOING TO INSERT:\n\n"+defaultform);

			var dupuser = parent.document.getElementsByName('PRICETYPESTT'+linkname);
			if (dupuser.length != 0)
			{
				alert("This member has been already selected");
			}
			else
			{
				var itemfunc=parent.document.getElementById("AddUser");
				if (itemfunc.insertAdjacentText)
				{
					itemfunc.innerHTML  += defaultform;
				}
				else if(typeof(itemfunc.innerHTML) != 'undefined' )
				{
					itemfunc.innerHTML +=  defaultform;
				}
			}


			//itemfunc.innerHTML =  "<span class='attendee'><b>Registration:</b><BR>"+hold+"</span>";
		},
		error: function(){alert('An AJAX error has occured. Please ensure that you have Javascript-enabled browser and re-load the page to try again.');}
	});
}



//adds additional user to the registration
function addGuest(linkname, lastname, firstname){
    var sessionCD = window.parent.document.event.SESSIONALTCD.value;
    var registeredUrl = "../utilities.dll/customlist?SQLNAME=EVENTCHECK&wbp=customercd.htm&whp=none&WMT=none&wnr=none&code=" + sessionCD;
	$.ajax({url:registeredUrl, type:"get",
		success:function(content){
			if (content.match(linkname)){
				$(function() {
			$("#divConfirm_"+linkname).dialog({
			autoOpen:false,
			modal:true,
			closeOnEscape: false,
						buttons: {
                        Ok: function() {
                            $( this ).dialog( "close" );
                            }
                        }
			})
            $("#divConfirm_"+linkname).dialog('open');
		});
			}else{
                //var parentUrl = parent.location.href;
                var parentUrl = window.parent.document.location.href;
                if ((parentUrl.indexOf('&customercd')) > 0){
                    parentUrl = parentUrl.slice(0,parentUrl.indexOf('&customercd'));
                }
	var myappend = '&customercd=' + linkname;
	var myRegistrantName = parent.$("[id=spanRegName]");
	$(myRegistrantName).text(firstname + ' ' + lastname);
	window.parent.document.location = (parentUrl + myappend);
	window.parent.$( "#popupBasic" ).popup( "close" );
            }
		}
	});


	/*var sessionaltcd = parent.document.event.SESSIONALTCD.value;
	alert(sessionaltcd);
	var priceURL = '../registerdll.dll/registrationform?sessionaltcd='+sessionaltcd+'&customercd='+linkname+'&wrp=guestPrice.htm&pricelist=guestPriceList.htm&wmt=none&wnr=none';
	//debug("priceURL is: "+priceURL);
	$.ajax({url:priceURL, type:'GET', async:false,
		success: function(response){
			//check for no prices
			if(response == ''){
				alert("ERROR: There are no prices which apply to the user "+firstname+" "+lastname+". This user will not be added to the registration.");
			}
			var priceSplit = response.split('@');
			var priceInfo = priceSplit[0];
			priceSplit = priceInfo.split('|');
			var priceCode = priceSplit[0];
			var priceName = priceSplit[1];
			var pricePrice = priceSplit[2];
			var defaultform = '<div class="attendee">' + '<input type="checkbox" name="CUSTOMERCD" value="'+linkname+'" checked> ' + lastname + ', ' + firstname + '<div class="attendee" id="cust'+linkname+'">'+
'<span class="attendee"><b>Registration:</b><BR>'+priceName+' ('+pricePrice+')</span>'+
'</div>' +
' <input type="button" value="Select Guest Price and Functions" name="addb'+linkname+'" onClick="addGuestFunctions('+linkname+')">'+
' <input type="hidden" name="PRICETYPESTT'+linkname+'" value="'+priceCode+'">'+
' <input type="hidden" name="FUNCTIONS'+linkname+'" value="">'+
' <input type="hidden" name="FUNCTIONNAMES'+linkname+'" value="">'+
' </div><HR><br />';

			var dupuser = parent.document.getElementsByName('PRICETYPESTT'+linkname);
			if (dupuser.length != 0){
				alert("This member has been already selected");
			}else{
				var itemfunc=parent.document.getElementById("AddUser");
				if (itemfunc.insertAdjacentText){
					itemfunc.innerHTML += defaultform;
				}else if(typeof(itemfunc.innerHTML) != 'undefined' ){
					itemfunc.innerHTML += defaultform;
				}
			}
		},
		error: function(){
			alert('An AJAX error has occured. Please ensure that you have Javascript-enabled browser and re-load the page to try again.');
		}
	});
	var defaultform = '<li class="attendee">' + '<input type="checkbox" name="CUSTOMERCD" value="'+linkname+'" checked> ' + '<span class="guestNames">' + lastname + ', ' + firstname +  '</span><span class="attendee"  id="cust'+linkname+'"></span><br>' +
		' <input type="button" value="Select Guest Price and Functions" name="addb'+linkname+'" onClick="addGuestFunctions('+linkname+')">'+
		' <input type="hidden" name="PRICETYPESTT'+linkname+'" value="">'+
		' <input type="hidden" name="FUNCTIONS'+linkname+'" value="">'+
		' <input type="hidden" name="FUNCTIONNAMES'+linkname+'" value="">'+
  		' </li>';


	//var dupuser = window.opener.document.getElementsByName('PRICETYPESTT'+linkname);
    var dupuser = parent.document.getElementsByName('PRICETYPESTT'+linkname);
	if (dupuser.length != 0)
	{
		alert("This member has been already selected");
	}
	else
	{
		var itemfunc=parent.document.getElementById("AddUser");
 		if (itemfunc.insertAdjacentText)
		{
			itemfunc.innerHTML  += defaultform;
		}
		else if(typeof(itemfunc.innerHTML) != 'undefined' )
		{
			itemfunc.innerHTML +=  defaultform;
	    }
		//window.opener.focus();
        parent.focus();
		//window.close();
        window.parent.closeIframe();
	}	*/
}


//opens the "select price category" window for guests
function addGuestFunctions(idname)
{
	//Mozilla bug!!!!!!!!!!!!!!!!
	var addpath = "../Registerdll.dll/RegistrationForm?sessionaltcd="+sessionaltcd+"&RESPONSEPAGE=RegistrationForm_guest.htm&WMT=../main_template_none.htm&WFL=FunctionList_guest.htm&CUSTOMERCD="+idname;
	if ( eval('document.order.PRICETYPESTT'+idname +'.value != "" '))
	{
		addpath =  addpath+'&PRICETYPESTT='+eval('document.order.PRICETYPESTT'+idname +'.value');
	}
    var $dialog = $('<div id="searchResults"></div>')
                .html('<iframe style="border: 0px; " src="' + addpath + '" width="100%" height="100%"></iframe>')
                .dialog({
                    autoOpen: false,
                    modal: true,
                    height: 525,
                    width: 760,
                });
                $dialog.dialog('open');
	return true;
}


//returns the funtions and prices the guest selected to the first screen
function passGuestFunctions(formName)
{
     if ( getGuestFunctions(formName) )
	 {
			// get customercd from location.href
			var RedirectStr=location.href;
			var customercd="";
	  		var pos = RedirectStr.lastIndexOf("&CUSTOMERCD=");
			if (pos>-1)
			{
				customercd=RedirectStr.substring(pos+12);
				pos = customercd.indexOf("&");
				if (pos>-1)
				{
					customercd = customercd.substring(0, pos);
				}
			}

		   //fill out the price description field
		   	var hold = "";
			for (var i=0; i<formName.PRICETYPESTT.length; i++)
			{
				if(formName.PRICETYPESTT.options[i].selected)
				{
					 hold = formName.PRICETYPESTT.options[i].text;
					 break;
			    }
			}
//		   eval('window.opener.formName.REGPRICE'+customercd+'.value=hold');

		   //write function description list into the appropriate div section
		   var itemfunc=parent.document.getElementById("cust"+customercd);

			if (itemfunc.insertAdjacentText)
			{
				if(formName.FUNCTIONDESC.value == ''){
					itemfunc.innerHTML =  "<BR><span class='attendee'><b>Registration: </b>"+hold+"</span>";
				}else{
					itemfunc.innerHTML =  "<BR><span class='attendee'><b>Registration: </b>"+hold+"<BR><b>Functions: </b>"+formName.FUNCTIONDESC.value+"</span>";
				}
			}
			else if(typeof(itemfunc.innerHTML) != 'undefined' )
			{
				if(formName.FUNCTIONDESC.value == ''){
					itemfunc.innerHTML =  "<BR><span class='attendee'><b>Registration: </b>"+hold+"</span>";
				}else{
					itemfunc.innerHTML =  "<BR><span class='attendee'><b>Registration: </b>"+hold+"<BR><b>Functions: </b>"+formName.FUNCTIONDESC.value+"</span>";
				}

		 	}

		   //fill out hidden fields
		 //  alert(formName.name);
		  // alert(formName.value);
		   eval('parent.document.order.PRICETYPESTT'+customercd+'.value=document.'+formName.name+'.PRICETYPESTT.value');
		   eval('parent.document.order.FUNCTIONS'+customercd+'.value=document.'+formName.name+'.FUNCTIONS.value');

		   //check checkbox
		   var objs = parent.document.getElementsByName("CUSTOMERCD");
			for (var i=0; i<objs.length; i++)
			{
				if (objs[i].value==customercd)
				{
					objs[i].checked = true;
					break;
				}
			}

		   window.parent.closeIframe();
	       return true;
	  }
}

//collects functions selceted from the guest page
function getGuestFunctions(formName){
	var tmpint ="";
	var tmpdesc="";
	var pos="";
	var size="";
	for (var i=0; i<formName.length; i++)  {
			if (formName.elements[i].type =='text'){
				if (formName.elements[i].value>0) {
					tmpint = tmpint + ',' + formName.elements[i].name+"="+formName.elements[i].value;
					tmpdesc = tmpdesc + '<br>'+formName.elements[i].title+" x"+formName.elements[i].value;
			   } //make sure auto registration price is checked
	//			else if (formName.elements[i].checked==false) {
	//	        		if (formName.elements[i].name==formName.AUTOFUNCTIONCD.value)
	//					{
	//					formName.elements[i].checked=true;
	//	        		tmpint = tmpint + ',' + formName.elements[i].name;
	//					}
	//				}
			}else if(formName.elements[i].type == 'checkbox' || formName.elements[i].type == 'radio'){
				if (formName.elements[i].checked == true) {
					tmpint = tmpint + ',' + formName.elements[i].name+"="+formName.elements[i].value;
					tmpdesc = tmpdesc + '<br>'+formName.elements[i].title;
					if(formName.elements[i].value != '1'){
						tmpDesc += " x"+formName.elements[i].value;
					}
			   }
			}

	}
	pos = tmpint.indexOf(',');
	pos = pos +1;
	var finalvalue = tmpint.substring(pos);
	formName.FUNCTIONS.value=finalvalue;

	pos = tmpdesc.indexOf('<br>');
	pos = pos +4;
	var finalvalue = tmpdesc.substring(pos);
	//alert(final);
	formName.FUNCTIONDESC.value=finalvalue;

	return true;
	}

//collects all info and submits multi-registraion to next page
function submitMultiReg(formName)
{
		 var tmpint ="";
		 var isGuests = false; //are there guests?
		 for (var i=0; i<formName.length; i++)
		 {
			if (formName.elements[i].type =='text')
			{
				if (formName.elements[i].value >0)
				{
					tmpint  = tmpint+","+formName.elements[i].name+"="+formName.elements[i].value;
				}
			}

			if (formName.elements[i].type == 'checkbox'){
				if((formName.elements[i].checked == true) && (formName.elements[i].name != 'CUSTOMERCD') && (formName.elements[i].id != 'registerMe_button')){
					tmpint  = tmpint+","+formName.elements[i].name+"="+formName.elements[i].value;
					isGuests=true;
				}
			}
		}
		pos = tmpint.indexOf(',');
		pos = pos +1;
		var finalvalue = tmpint.substring(pos);
		formName.FUNCTIONS.value=finalvalue;

		var objs = document.getElementsByName('CUSTOMERCD');
		var emptyprice = false;
		for (var i=0; i<objs.length; i++)
		{
			if (objs[i].checked == true)
			{
				if (eval('document.'+formName.name+'.PRICETYPESTT'+objs[i].value+'.value==""') )
				{
					alert('Please select a price category for yourself and each of your guests.');
					eval('document.'+formName.name+'.addb'+objs[i].value+'.select()') ;
					eval('document.'+formName.name+'.addb'+objs[i].value+'.focus()');
					emptyprice = true;
					break;
				}
			}
		}
		if (!emptyprice)
		{
			if(!($('#registerMe_button').attr("checked"))){
				$('#price_dropDown').attr("name","noPrice");
				if(isGuests){
					formName.submit();
				}else{
					alert("Please select at least one user to register for this event.");
				}
			}else{
				$('#price_dropDown').name = "PRICETYPESTT";
				formName.submit();
			}
		}

//		formName.submit();
}
function fillSelfRegInfo(mycustcd){
	var myURL = window.location.href;
	if ((myURL.indexOf('&customercd')) > 0){
		myURL = myURL.slice(0,myURL.indexOf('&customercd'));
	}
	var myappend = '&customercd=' + mycustcd;
	window.location = (myURL + myappend);
}
function initRegForm(myName){
	if ((window.location.href.indexOf('&customercd')) > 0){
		$('#spanRegName').text(myName);
	}
}
function checkAttendee(){
	if (($('#regOther').is(':checked')) && !($('#spanRegName').text())){
		alert("Please select an attendee by clicking 'Select Attendee' button");
		return false;
	}
	return true;
}
function selectAttendeeActions(){
	$('#spanRegName').text('');//clear name
	$('#regOther').attr('checked',true);
}
//adds all events and functions to NEW shopping cart
function multiEventReg_addToCart(formName){
	//first send events for each user
	var eventURL = '../msascartdll.dll/showcart?';
	var eventCD = formName.SESSIONALTCD.value;
	var eventList = formName.MULTICUSTOMERLIST.value.split(',');
	$.each(eventList, function(){
		var tempArr = this.split('=');
		var customercd = tempArr[0];
		var pricecd = tempArr[1];

		//check if this user is currently logged in user, and if so don't add CUSTOMERCD= parameter because DLL interprets this as different user
		debug('if --'+customercd+'=='+CUSTOMERCD+'--');
		if(customercd != CUSTOMERCD){
			eventURL += 'ADD=CUSTOMERCD='+customercd+',ORDERTYPE=S,ITEMCD='+eventCD+',PRICECD='+pricecd+'&';
		}else{
			eventURL += 'ADD=ORDERTYPE=S,ITEMCD='+eventCD+',PRICECD='+pricecd+'&';
		}
	});

	debug('events URL: \n\n'+eventURL);
	$.ajax({url:eventURL, type:"GET", async:false});
	//window.location = eventURL;

	//next, add functions
	var funcURL = '../msascartdll.dll/showcart?';
	var funcList = formName.MULTIFUNCTIONLIST.value.split(',');

	//loop through customers
	$.each(funcList, function(){
		debug('each customers function list:\n\n '+this);
		var tempArr = this.split('=');
		var customercd = tempArr[0];
		//debug('customercd: '+customercd);

		//rest needs to be all indexes BUT 0
		//var rest = tempArr[1];

		var funcQuantList = this.split('|');
		//alert(funcQuantList);
		//alert(this);
		//debug('rest: '+rest);
		//loop through functions
		$.each(funcQuantList, function(){
			//alert('customercd '+customercd+' funcQuantList: '+this);
			var tempArr2 = this.split('=');

			//string has customercd in it
			if(tempArr2.length == 3){
				var funcCD = tempArr2[1];
				var funcQty = tempArr2[2];
			}else{
				var funcCD = tempArr2[0];
				var funcQty = tempArr2[1];
			}

			if(funcQty == undefined){
				funcQty = 1;
			}
			debug('customercd: '+customercd+' funcCD: '+funcCD+' funcQty: '+funcQty);
			if(customercd != CUSTOMERCD){
				funcURL += 'ADD=CUSTOMERCD='+customercd+',ORDERTYPE=F,ITEMCD='+eventCD+',SUBITEMCD='+funcCD+',ITEMQTY='+funcQty+'&';
			}
			else
				{funcURL += 'ADD=ORDERTYPE=F,ITEMCD='+eventCD+',SUBITEMCD='+funcCD+',ITEMQTY='+funcQty+'&';}
		});

	});

	debug('functions URL: \n\n'+funcURL);
	window.location = funcURL;

}

/*/////////////////////////////////////////////////////////////////////////*/

/*/////////////////////////////////////////////////////////////////////////*/

/*/////////////////////////////////////////////////////////////////////////*/

/*/////////////////////////////////////////////////////////////////////////*/

/*/////////////////////////////////////////////////////////////////////////*/

/*/////////////////////////////////////////////////////////////////////////*/

/*/////////////////////////////////////////////////////////////////////////*/

/*////////////////////// UNUSED FUNCTIONS ////////////////////////////////*/

//called by default upon changing price list sometimes
function RegistrationPriceChange(){
	return true;
}

//single reg checkautofunctions
function checkAutoFunctions() {
 var functioncd = document.event.AUTOFUNCTIONCD.value;
 for (var i=0; i<document.event.length; i++) {
	   if (document.event.elements[i].type =='text') {
	        //alert(document.event.elements[i].name + functioncd);
	        if (document.event.elements[i].name==functioncd) {
	        		document.event.elements[i].value=1;
	        }
	     }
    }
 }

 //multi-reg checkautofunctions on registrationform_guest.htm template
function checkAutoFunctions()
{
     //select AUTO functions
//	 var functioncd = document.event.AUTOFUNCTIONCD.value;
	 var RedirectStr=location.href;
 var customercd="";
 var pos = RedirectStr.lastIndexOf("&CUSTOMERCD=");
   if (pos>-1)
   {
//    customercd=RedirectStr.substring(pos+12, RedirectStr.lenght);
    customercd=RedirectStr.substring(pos+12);
	pos = customercd.indexOf("&");
    if (pos>-1)
    {
     customercd = customercd.substring(0, pos);
    }
   }
 var functlist = eval('window.opener.document.event.FUNCTIONS'+customercd+'.value');
 if (functlist!="") functlist=","+functlist+",";
// 		functioncd = ","+functioncd+","+functlist;

	 for (var i=0; i<document.event.length; i++)
	 {
		if (document.event.elements[i].type =='text')
		{
	        var elementname = ","+document.event.elements[i].name+"=";
			if (functlist.indexOf(elementname) != -1)
   		    {
					var posqty = functlist.indexOf(elementname);
					var strqty = functlist.substring(posqty);
					posqty=strqty.indexOf("=");
					strqty = strqty.substring(posqty+1);
					strqty = getQty(strqty);
					document.event.elements[i].value=strqty;
	        }
/*  		    elementname = ", "+document.event.elements[i].name+",";
			if (functioncd.indexOf(elementname) != -1)
			{
	    	   		document.event.elements[i].value=1;
	        }*/
		}
	}
 }


//from multiRegForm.htm template
function checkAutoFunctions()
{
     //select AUTO functions
	 var functioncd = document.event.AUTOFUNCTIONCD.value;
	 functioncd = ","+functioncd+",";
	 var saved="";
	 if (location.href) {fullpath=location.href.substring(0,255);}
  	 var pos=fullpath.indexOf("&SAVEDFUNCTIONS=");
	 if (pos>-1)
	 {
   	    saved=fullpath.substring(pos+16);
		pos = saved.indexOf("&");
		if (pos == -1)
		{
			pos = saved.lenght;
		}
  		saved=","+saved.substring(0, pos)+",";
     }
	 for (var i=0; i<document.event.length; i++)
	 {
		if (document.event.elements[i].type =='text')
		{
	    	var functioncode = "";
	        var elementname = ","+document.event.elements[i].name+"=";
			if (saved.indexOf(elementname) != -1)
	        {
					var posqty = saved.indexOf(elementname);
					var strqty = saved.substring(posqty);
					posqty=saved.indexOf("=");
					strqty = strqty.substring(posqty+1);
					strqty = getQty(strqty);
					document.event.elements[i].value=strqty;
					functioncode = document.event.elements[i].name+"="+strqty;
	        }
			else
			{
				if (saved == "")
				{
					if (functioncd.indexOf(elementname) != -1)
	    		    {
	        			document.event.elements[i].value=1;
						functioncode = document.event.elements[i].name+"=1";
			        }
			        elementname = ", "+document.event.elements[i].name+",";
					if (functioncd.indexOf(elementname) != -1)
			        {
	    	    		document.event.elements[i].value=1;
						functioncode = document.event.elements[i].name+"=1";
			        }
				}
			}
			if (functioncode != "")
			{
				if (document.event.FUNCTIONS.value == "")
				{
					document.event.FUNCTIONS.value  = functioncode;
				}
				else
				{
					document.event.FUNCTIONS.value  = document.event.FUNCTIONS.value+","+functioncode;
				}
		     }
		  }
      }
 }


//from registrationForm_guest.htm
function getQty(strqty)
{
	var qty="";
	for (var i=0; i<strqty.length; i++)
	{
		if ((i==strqty.length-1) || (strqty.charAt(i)==",") || (strqty.charAt(i)=="&"))
		{
			return qty;
		}
		qty=qty+strqty.charAt(i);
	}
}




//from registrationForm_guest.htm
function RefreshPage()
{
	var ss="";
	if (location.href) {ss=location.href.substring(0,255);}
	var pos = ss.lastIndexOf("&PRICETYPESTT=");
	if (pos>-1)
	{
		ss=ss.substring(0,pos);
	}
	location.href = ss+"&PRICETYPESTT="+document.event.PRICETYPESTT.value;
}







//????
function GetSentValue(paramname)
{
	var bStr=location.search;
	var pos = bStr.indexOf(paramname);
	if (pos != -1)
	{
		bStr = bStr.substring(pos+paramname.length+1, bStr.length);
		if (bStr.indexOf("&") != -1 )
		{
			bStr = bStr.substring(0, bStr.indexOf("&"));
		}
		else
		{
			bStr = bStr.substring(0, bStr.length);
		}
		return bStr.replace(/%20/g," ");
	}
	else
	{
		return "";
	}

}


//from multiRegForm.htm
function AddCustomercd()
{
    var tmpsearch = document.event.ORGCD.value;
	if (tmpsearch.length < 1)
	{
 	   alert('Your organization is not currently in our database.  Please contact us to set up your organization so that you may register other applicants only.  Currently you may only register those individuals that are not associated with your organization.');
	   return false;
	}
    else
	{
    	window.open("../../cgi-bin/memberdll.dll/List?ORGCD=<#ORGCD>&SORT=LASTNAME&RANGE=1/100&WHP=searchHeader.htm&WBP=CustomerSearch.htm&WMT=none&WNR=norec.htm","","fullscreen=no,location=no,toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,width=640,height=250")
        return true;
    }
}

//from multiRegform.htm
function RunSearch() {
var tmpsearch = document.event.ORGCD.value;
if (tmpsearch.length < 1) {
   alert('Your cannot register at this time. You must contact aca for further instruction.');
   return false;
 }
else
{
window.open("../../cgi-bin/memberdll.dll/List?ORGCD="+tmpsearch+"&SORT=LASTNAME&RANGE=1/100&WHP=searchHeader2.htm&WBP=CustomerSearch2.htm&WPF=none&WPH=none","","fullscreen=no,location=yes,toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,width=640,height=250")
      return true;
	  }
}



/*function AddNewUser()
{
   	window.open("../../cgi-bin/memberdll.dll/openpage?RESPONSEPAGE=Customer_NewStaffMember.htm&ORGCD=<#ORGCD>&ORGNAME=<#ORGNAME>&ADDRESS1=<#ADDRESS1>&ADDRESS2=<#ADDRESS2>&CITY=<#CITY>&STATECD=<#STATECD>&ZIP=<#ZIP>","","fullscreen=no,location=no,toolbar=no,menubar=yes,scrollbars=yes,resizable=no,width=750,height=600")
    return true;
}

function AddNewNonStaffUser()
{
   	window.open("../../cgi-bin/memberdll.dll/openpage?RESPONSEPAGE=Customer_NewNonStaff.htm&PARENTCD=<#CUSTOMERCD>&ADDRESS1=<#ADDRESS1>&ADDRESS2=<#ADDRESS2>&CITY=<#CITY>&STATECD=<#STATECD>&ZIP=<#ZIP>","","fullscreen=no,location=no,toolbar=no,menubar=yes,scrollbars=yes,resizable=no,width=750,height=600")
    return true;
}*/
