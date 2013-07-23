// JavaScript Document
//Global variables
	var sMode="PAY";

//checks all fields which have class='reqField', with default error message for each
//also implements correct phone validation based on COUNTRY
//optional parameter validatePayment determines if payment should be required or not (true by default)

function validateAll(formName, validatePayment){
	var oRequired= new Object();

	if(validatePayment == undefined){
		var validatePayment = true;
	}

	//debug('in validateAll');
	var countryVal = '';
	var checkCCNum = false;

	if(formName.COUNTRY != undefined){
		if(formName.COUNTRY.type == 'select'){
			countryVal = formName.COUNTRY[formName.COUNTRY.selectedIndex].value;
		}else{
			countryVal = formName.COUNTRY.value.toLowerCase();
		}
	}
	var isUSA = false;
	//debug('Country: '+countryVal);
	if((countryVal == 'usa') || (countryVal == 'us') || (countryVal == 'united states') || (countryVal == '')){
		isUSA = true;
	}

	//non-required validation
	if(isUSA){
		if(formName.WORKPHONE != undefined){
		if(formName.WORKPHONE.value != ''){
			oRequired.WORKPHONE = ['P', '', '', '', "\nPlease enter your work phone number in the format (555) 555-5555."];
		}}

		if(formName.FAXPHONE != undefined){
		if(formName.FAXPHONE.value != ''){
			oRequired.FAXPHONE = ['P', '', '', '', "\nPlease enter your fax phone number in the format (555) 555-5555."];
		}}

		if(formName.MOBILEPHONE != undefined){
		if(formName.MOBILEPHONE.value != ''){
			oRequired.MOBILEPHONE = ['P', '', '', '', "\nPlease enter your cell phone number in the format (555) 555-5555."];
		}}

		if(formName.HOMEPHONE != undefined){
		if(formName.HOMEPHONE.value != ''){
			oRequired.HOMEPHONE = ['P', '', '', '', "\nPlease enter your home phone number in the format (555) 555-5555."];
		}}

		if(formName.ALTPHONE != undefined){
		if(formName.ALTPHONE.value != ''){
			oRequired.ALTPHONE = ['P', '', '', '', "\nPlease enter your alternate phone number in the format (555) 555-5555."];
		}}
	}


	//required validation, for each field with class="reqField"
	$(".reqField").each(function(){

		//reqs for each field
		switch(this.name){
			case "GENDER":
				oRequired.GENDER = ['','','','',"\nA Gender Selection is required.\n\nPlease select a Gender."];
				break;
			case "WEBUSERID":
				oRequired.WEBUSERID = ['','','','',"\nThe Username field is required.\n\nPlease enter your User ID."];
				break;
			case "WEBUSERPASSWORD":
				oRequired.WEBUSERPASSWORD = ['','','','',"\nThe Password field is required. \n\nPlease enter your Password."];
				break;
			case "WEBUSERPASSWORD2":
				oRequired.WEBUSERPASSWORD2 = ['','','','',"\nThe Confirm Password field is required. \n\nPlease enter your Password."];
				break;

			case "FIRSTNAME":
				oRequired.FIRSTNAME = ['S', '', '', '', "\nThe First Name field is required and only accepts letters.\n\nPlease re-enter."];
				break;
			case "LASTNAME":
				oRequired.LASTNAME = ['S', '', '', '', "\nThe Last Name field is required and only accepts letters.\n\nPlease re-enter."];
				break;
			case "JOBTITLE":
				oRequired.JOBTITLE = ['', '', '', '', "\The Job Title field is required.\n\nPlease enter your Job Title."];
				break;
			case "ORGNAME":
				oRequired.ORGNAME = ['','','','',"\nThe Organization field is required. \n\nPlease select your Organization."];
				break;
			case "EMAIL":
				if ($('#EMAIL').is(":visible"))
				{
					oRequired.EMAIL = ['E', '', '', '', "\nThe Email field must contain a \"@\" and a \".\" \n\nPlease re-enter your E-mail address."];
				}
				break;

			case "ADDRESSTYPE":
				oRequired.ADDRESSTYPE = ['','','','',"\nThe Address Type field is required.\n\nPlease enter your Address Type."];
				break;
			case "COUNTRY":
				oRequired.COUNTRY = ['','','','',"\nThe Country field is required.\n\n Please select your Country."];
				break;
			case "ADDRESS1":
				oRequired.ADDRESS1 = ['', '', '', '', "\nThe Address field is required.\n\nPlease enter your Address."];
				break;
			case "ADDRESS2":
				oRequired.ADDRESS2 = ['', '', '', '', "\nThe Address Line 2 field is required.\n\nPlease enter your Address Line 2."];
				break;
			case "CITY":
				oRequired.CITY = ['', '', '', '', "\nThe City field is required.\n\nPlease enter your City."];
				break;
			case "STATECD":
				if(isUSA){
					oRequired.STATECD = ['','','','', "\nThe State field is required. \n\nPlease select your State."];
				}else{
					//
				}
				break;
			case "ZIP":
				if(isUSA){
					oRequired.ZIP = ['Z','','','',"\nThe Zip / Postal Code field is required and accepts only numbers. \n\nPlease enter your Zip / Postal Code."];
				}else{
					//oRequired.ZIP = ['','','','',"\nThe Zip / Postal Code field is required. \n\nPlease enter your Zip / Postal Code."];
				}
				break;

			case "ALTADDRESSTYPE":
				oRequired.ALTADDRESSTYPE = ['','','','',"\nThe Alternate Address Type field is required.\n\nPlease enter your Alternate Address Type."];
				break;
			case "ALTCOUNTRY":
				oRequired.ALTCOUNTRY = ['','','','',"\nThe Alternate Country field is required.\n\n Please select your Alternate Country."];
				break;

			case "ALTADDRESS1":
				oRequired.ALTADDRESS1 = ['', '', '', '', "\nThe Alternate Address field is required.\n\nPlease enter your Address."];
				break;
			case "ALTADDRESS2":
				oRequired.ALTADDRESS2 = ['', '', '', '', "\nThe Alternate Address Line 2 field is required.\n\nPlease enter your Address Line 2."];
				break;
			case "ALTCITY":
				oRequired.ALTCITY = ['', '', '', '', "\nThe Alternate City field is required.\n\nPlease enter your City."];
				break;
			case "ALTSTATE":
				if(isUSA){
					oRequired.ALTSTATE = ['','','','', "\nThe Alternate State field is required. \n\nPlease select your State."];
				}else{
					//
				}
				break;
			case "ALTZIP":
				if(isUSA){
					oRequired.ALTZIP = ['Z','','','',"\nThe Alternate Zip / Postal Code field is required and accepts only numbers. \n\nPlease enter your Zip / Postal Code."];
				}else{
					//oRequired.ALTZIP = ['','','','',"\nThe Zip / Postal Code field is required. \n\nPlease enter your Zip / Postal Code."];
				}
				break;

			//SHIPPING ADDRESSES
			case "SHIPADDRESS1":
				oRequired.SHIPADDRESS1 = ['', '', '', '', "\nThe Shipping Address field is blank.\n\nPlease enter your Address."];
				break;
			case "SHIPCITY":
				oRequired.SHIPCITY = ['', '', '', '', "\nThe Shipping City field is blank.\n\nPlease enter your City."];
				break;
			case "SHIPCOUNTRY":
				oRequired.SHIPCOUNTRY = ['', '', '', '', "\nYou must select your Shipping Country from the dropdown box."];
				break;
			case "SHIPSTATECD":
				if(isUSA){
					oRequired.SHIPSTATECD = ['', '', '', '', "\nYou must select your Shipping State from the dropdown box."];
				}
				break;
			case "SHIPZIP":
				if(isUSA){
					oRequired.SHIPZIP = ['Z', '', '', '', "\nThe Shipping Zip field is blank. \n\nPlease enter your Zip."];
				}
				break;


			//PHONE NUMBERS
			case "PHONEPREFTYPE":
				if ($('select[name=PHONEPREFTYPE]').is(":visible")) {
					oRequired.PHONEPREFTYPE = ['', '', '', '', "\nYou must select your Phone Type from the dropdown box."];
				}
				break;
			case "PHONE":
				if ($('input[name=PHONE]').is(":visible")) {
					if(isUSA){
						oRequired.PHONE = ['P', '', '', '', "The phone number field is required.\n\nPlease enter your phone number in the format (555)555-5555."];
					}else{
						oRequired.PHONE = ['', '', '', '', "The phone number field is required.\n\nPlease enter your phone number."];
					}
				}
				break;
			case "WORKPHONE":
				if ($('input[name=WORKPHONE]').is(":visible"))
				{
					if(isUSA){
						oRequired.WORKPHONE = ['P', '', '', '', "The work phone number field is required.\n\nPlease enter your work phone number in the format (555)555-5555."];
					}else{
						oRequired.WORKPHONE = ['', '', '', '', "The work phone number field is required.\n\nPlease enter your work phone number."];
					}
				}
				break;
			case "FAXPHONE":
				if ($('input[name=FAXPHONE]').is(":visible"))
				{
					if(isUSA){
						oRequired.FAXPHONE = ['P', '', '', '', "The fax phone number field is required.\n\nPlease enter your fax phone number in the format (555)555-5555."];
					}else{
						oRequired.FAXPHONE = ['', '', '', '', "The fax phone number field is required.\n\nPlease enter your fax phone number."];
					}
				}
				break;
			case "HOMEPHONE":
				if ($('input[name=HOMEPHONE]').is(":visible"))
				{
					if(isUSA){
						oRequired.HOMEPHONE = ['P', '', '', '', "The home phone number field is required.\n\nPlease enter your home phone number in the format (555)555-5555."];
					}else{
						oRequired.HOMEPHONE = ['', '', '', '', "The home phone number field is required.\n\nPlease enter your home phone number."];
					}
				}
				break;
			case "ALTPHONE":
				if ($('input[name=ALTPHONE]').is(":visible"))
				{
					if(isUSA){
						oRequired.ALTPHONE = ['P', '', '', '', "The alternate phone number field is required.\n\nPlease enter your alternate phone number in the format (555)555-5555."];
					}else{
						oRequired.ALTPHONE = ['', '', '', '', "The alternate phone number field is required.\n\nPlease enter your alternate phone number."];
					}
				}
				break;
			case "MOBILEPHONE":
				if ($('input[name=MOBILEPHONE]').is(":visible"))
				{
					if(isUSA){
					oRequired.MOBILEPHONE = ['P', '', '', '', "The mobile phone number field is required.\n\nPlease enter your mobile phone number in the format (555)555-5555."];
					}else{
						oRequired.MOBILEPHONE = ['', '', '', '', "The mobile phone number field is required.\n\nPlease enter your mobile phone number."];
					}
				}
				break;
		}

		//payment section
		if(validatePayment){
				switch(this.name){
					//payment fields
					case "PAYMENTTYPECD":
						oRequired.PAYMENTTYPECD = ['', 'PAY', '', '', "\nYou must choose a Card Type."];
						break;
					case "expireyear":
						oRequired.expireyear = ['Y', 'PAY', '', '', "\nPlease enter the correct expiration year."];
						break;
					case "EXPIREYEAR":
						oRequired.EXPIREYEAR = ['Y', 'PAY', '', '', "\nPlease enter the correct expiration year."];
						break;
					case "expiremonth":
						oRequired.expiremonth = ['', 'PAY', '', '', "\nYou must select the correct expiration month from the dropdown box."];
						break;
					case "EXPIREMONTH":
						oRequired.EXPIREMONTH = ['', 'PAY', '', '', "\nYou must select the correct expiration month from the dropdown box."];
						break;
					case "CSC":
						oRequired.CSC = ['N', 'PAY', '', '', "\nYou must enter the card verification code."];
						break;
					case "PAYMENTREFNUM":
						
						checkCCNum = true;
						break;
				}
			}
	});





	//validate all required fields and return true or false
	if(isFormValidated(formName, oRequired, false)){
		//fix phone fields with + sign
		//append + to remove all CV validation;
		if(!isUSA){
			if(formName.WORKPHONE != undefined){
			if((formName.WORKPHONE.value != '') && (formName.WORKPHONE.value.indexOf('+')!= 0)){
				formName.WORKPHONE.value = '+'+formName.WORKPHONE.value;
			}}

			if(formName.FAXPHONE != undefined){
			if((formName.FAXPHONE.value != '') && (formName.FAXPHONE.value.indexOf('+')!= 0)){
				formName.FAXPHONE.value = '+'+formName.FAXPHONE.value;
			}}

			if(formName.MOBILEPHONE != undefined){
			if((formName.MOBILEPHONE.value != '') && (formName.MOBILEPHONE.value.indexOf('+')!= 0)){
				formName.MOBILEPHONE.value = '+'+formName.MOBILEPHONE.value;
			}}

			if(formName.HOMEPHONE != undefined){
			if((formName.HOMEPHONE.value != '') && (formName.HOMEPHONE.value.indexOf('+')!= 0)){
				formName.HOMEPHONE.value = '+'+formName.HOMEPHONE.value;
			}}

			if(formName.ALTPHONE != undefined){
			if((formName.ALTPHONE.value != '') && (formName.ALTPHONE.value.indexOf('+')!= 0)){
				formName.ALTPHONE.value = '+'+formName.ALTPHONE.value;
			}}
		}
		
		if(checkCCNum){
			if(CCNumValidate(formName, "PAY", false, "\nCredit Card number is invalid.")){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}else{
		return false;
	}
}



//returns the mask
function getMask(maskType)
{
	switch(maskType)
	{
		case 'S': return "^\\D+$"; break; //String //any character + not empty
		case 'C': return "^\\d+$|^\\d+[.]\\d{1,2}$"; break; //money, currency //digits (ddd.dd) (ddd) (d.dd) (ddd.d) + not empty
		//case 'P': return "^\\d{3}-\\d{3}-\\d{4}$|^\\(?\\d{3}[) ]\\s?\\d{3}[- ]\\d{4}$"; break; //phone number 301-444-5555 or (301) 444-5555
		case 'P': return "^\\(\\d{3}\\)\\s?\\d{3}[- ]\\d{4}$"; break; //phone number(301) 444-5555
		case 'E': return "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$"; break;//email
		case 'D': return "^\\d{2}/\\d{2}/\\d{4}$"; break; //date MM/DD/YYYY +not empty
		case 'MY': return "^\\d{2}/\\d{4}$"; break; //date MM/YYYY +not empty
		case 'N': return "^[0-9]+$"; break; //number //any digit + not empty
		case 'Y': return "^\\d{2}$"; break; //year //2 digits of year (YY)
		case 'Z': return "^\\d{5}$|^\\d{5}-\\d{4}$"; break; //zip //99999 or 99999-9999 and not empty
	}
}

//checks the form element
function ElementValidated(FormElement, MaskType)
{
	if (typeof FormElement.type == 'undefined') {var elType = FormElement[0].type;}
	else {var elType = FormElement.type;}

	switch (elType)
	{
		case "text":
		case "textarea":
		case "password":
			var ElementValue=FormElement.value;
			if (MaskType=="")
			{
				if (ElementValue=="") return false;
			}
			else
			{
				var Mask = new RegExp(getMask(MaskType));
				if (!Mask.test(ElementValue)) return false;
			}
			break;
		case "radio":
		case "checkbox":
			for (var i = 0; i < FormElement.length; i++)
			{
				if (FormElement[i].checked==true) return true;
			}
			return false;
			break;
		case "select-one":
			//alert();
			if (FormElement[FormElement.selectedIndex].value=="") return false;
			break;
	}
	return true;
}

//checks the list of form elements
function isFormValidated(form, oRequired, isResultList)
{
	var ListRes="";
	for (element_name in oRequired)
	{
		if ( ((oRequired[element_name][1])=="") || ((oRequired[element_name][1])==sMode) )
		{
			var el = form[element_name];

			if (typeof el =='undefined')
			{
				noFieldError = new Error ("The field "+element_name+" does not exist");
				throw noFieldError;
				return false;
			}

			var DoCheck = true;
			if ((oRequired[element_name][2]) != "")
			{
				if (form[oRequired[element_name][2]].value==oRequired[element_name][3])
					{DoCheck = true}
				else
					{DoCheck = false}
			}

			if (DoCheck)
			{
				if (!ElementValidated(el, oRequired[element_name][0]))
				{
					if (isResultList)
					{
						if (ListRes==""){ListRes=oRequired[element_name][4];}
						else {ListRes=ListRes+","+oRequired[element_name][4];}
					}
					else
					{
						//alert(oRequired[element_name][4]);
						$('#error_content').html(oRequired[element_name][4]);
						//$("#errorPop").popup("open", transition="flip");
						$('#popBtn').click();
						if (typeof el.type != 'undefined') el.focus();
						return false;
					}
				}
			}
		}
	}
	if (isResultList) {return ListRes;}
	else {return true;}
}

//checks the credit card number
//(formName, "PAY", false, "\nCredit Card number is invalid.")){
function CCNumValidate(form, mode, isResultList, Msg)
{

	if ( (mode=="") || (mode==sMode) )
	{
		for (var i = 0; i < form.PAYMENTTYPECD.length; i++)
		{
			if (form.PAYMENTTYPECD[i].checked==true)
				var cardtype = form.PAYMENTTYPECD[i].value;
		}
		
        if (verify_ccard(form.PAYMENTREFNUM.value, cardtype) != 0)
  		{
			if (isResultList) return "";
			else {
				$('#error_content').html(Msg);
			
				$('#popBtn').click();
				if (typeof el.type != 'undefined') el.focus();
				return false;
			}

            /*$("#PAYMENTREFNUM").assert('1' == '0',  Msg );*/
       
		}
	}

	if (isResultList) {return "";}
	else {return true;}
}

function verify_ccard(inNumber, type)
{// returns 0 if valid, positive number if invalid.
        var total = 1*0;
        var tmp = 1*0;

        var number = "";

        // make sure there are only numbers in the string...
        for(i = 0; i < inNumber.length; i++)
        {
		if(inNumber.charAt(i) >= "0" && inNumber.charAt(i) <= "9")
                {
                        number = number + inNumber.charAt(i);
                }
				else //commeted out if dashes and spaces are allowed
				{
					return 200; //character symbol
				}
        }

        if(number.length < 13) return 10; // too short for anything

        first = "" + number.charAt(0);
        second = "" + number.charAt(1);
        third = "" + number.charAt(2);
        firstTwo = first + second;
        firstFour = firstTwo + third + number.charAt(3);

        if(type == "MC")
        {
                if(first != "5" || second < "1" || second > "5")
                        return 11;// invalid Mastercard prefix
                if(number.length != 16)
                        return 21;
        }
        else if(type == "VISA")
        {
                if(first != "4")
                        return 12;// invalid Visa prefix
                if(number.length != 13 && number.length != 16)
                        return 22;
        }
        else if(type == "AMEX")
        {
                if(first != "3" || (second != "4" && second != "7"))
                        return 13;// invalid American Express Prefix
                if(number.length != 15)
                        return 23;
        }
        else if(type == "DISC")
        {
                        if(firstFour != "6011")
                                return 14;// invalid prefix.
                        if(number.length != 16)
                                return 24;
        }
        // now check the credit card suffix and length vs. the type


         // do the check sum
        for(loc = number.length - 2; loc >= 0; loc -= 2)
        {
                total += 1 * number.charAt(loc +1);
                tmp = number.charAt(loc) * 2;
		if(tmp > 9) total += 1;
		total += tmp%10;
        }
	if(number.length % 2 > 0)
	total += 1 * number.charAt(0);


        return (total % 10);

}

function luhn_check(card_number)
{

	cc_array = card_number.split( " " )
	cc_array.reverse()
	digit_string = " "

	for ( counter=0; counter < cc_array.length; counter++ )
	{
		current_digit = parseInt( cc_array[counter] )

		if (counter %2 != 0)
		{
			cc_array[counter] *= 2
		}

		digit_string += cc_array[counter]

	}

	digit_sum = 0

	for ( counter=0; counter<digit_string.length; counter++ )
	{
		current_digit = parseInt( digit_string.charAt(counter) )
		digit_sum += current_digit
	}

	if ( digit_sum % 10 == 0 )
	{
		return true
	}
	else
	{
		return false
	}

}

/*/////////////////// Auto Phone Formatting  /////////////////////////////*/

function getCursorPosition(el)
{
	if (document.selection)//IE
	{
		var range = document.selection.createRange();
		range.text = '';//delete selected text
		range.select();
		return (-1)*range.move("character", -100); //move selection to the first character. the result is the qty of moved characters that, actually, is a current cursor position
	}
	else //MOZILLA
	{
		var selStart = el.selectionStart; //get selection start point
		//delete selected text
		el.value = el.value.substring(0, selStart) + el.value.substring(el.selectionEnd, el.value.length);
		return selStart;
	}
}

function autoformat(el, e, mask)
{
	var CurrentElValue = el.value;
	var evt = (e) ? e : window.event; //IE:Mozilla
	var code = (document.all) ? evt.keyCode:evt.which; //IE:Mozilla
	var isAllowed = (code==0)||(code==8); //allow Backspace and all service key combination (Left, Right, Del, etc)
	code = String.fromCharCode(code);

    var CheckPattern = /^\d{1}$/; //checking pattern. one digital simbol
	var pos = getCursorPosition(el); //get current cursor position

	if (code.match(CheckPattern) || (code == mask.charAt(pos))) //if input simbol is digit or same as the mask
	{
		var InputVal = code+el.value.substring(pos); //start adding characters from current cursor position
		var OutputVal = el.value.substring(0,pos);	//part of the value for checking and formatting.
		for( k=0; k < InputVal.length; k++)
		{
			code = InputVal.charAt(k);
			if (code.match(CheckPattern) )
			{
				for( i=OutputVal.length; i <= mask.length; i++)
				{
					var tChar = mask.charAt(i); //compare input simbol with mask
					if (tChar=='#')
					{
						OutputVal = OutputVal+code; //replace # by input simbol and leave the loop.
						break;
					}
					else {OutputVal = OutputVal+tChar} //add character from mask and continue looping.
				}
			}
			else
			{
				//allow to input mask character. for first, input character only
				if ( (code == mask.charAt(pos)) && (k==0) ) {OutputVal = OutputVal+code}
			}
		}
		el.value=OutputVal; //return the result
	}
	else
	{
		if (!isAllowed)
		{
			el.value = CurrentElValue; //restore element value
			alert('invalid character');
		}
	}


	if ('\v'=='v'){e.returnValue = false;} //IE
	else
	{
		if (!isAllowed) {e.preventDefault();} //Mozilla
	}
}

var MaskPool = new Array('(###) ###-####','##/##/####');

function switchDateMask(val)
{
	switch(val)
	{
		case "1":
			MaskPool[1]='##/##/####';
  			break;
		case "2":
			MaskPool[1]='##.##.##';
		    break;
		default:
			MaskPool[1]='##/##/####';
	}
}


//changes mask based on the user's country
function checkCountryMask(country){
	//debug2(country);
	country = country.toLowerCase();
	if((country == '') || (country == 'usa') || (country == 'us') || (country == 'united states')){
		switchMask("1");
	}else{
		switchMask("3");
	}
}

function international(){
	if($('#Country').val()!='USA'){
		//alert("hi");
		$('#State').removeClass('reqField');
		$('#Zip').removeClass('reqField');
	}else{
		if (!$('#State').is('.reqField')){
			$(this).addClass('reqField');
		}
		if (!$('#Zip').is('.reqField')){
			$(this).addClass('reqField');
		}
	}
}


function switchMask(val)
{
	switch(val)
	{
		case "1":
			MaskPool[0]='(###) ###-####';
  			break;
		case "2":
			MaskPool[0]='+1(###) ###-####';
		    break;
		case "3":
			MaskPool[0]='+###################';
		    break;
		case "4":
			MaskPool[0]='####################';
		    break;
		default:
			MaskPool[0]='(###) ###-####';
	}
		//debug2(MaskPool[0]);
}

function autoformatWithPool(el, e, maskStr, PoolIndex)
{
	var CurrentElValue = el.value;
	var evt = (e) ? e : window.event; //IE:Mozilla
	var code = (document.all) ? evt.keyCode:evt.which; //IE:Mozilla
	var mask = maskStr;
	if (PoolIndex>-1) {mask = MaskPool[PoolIndex]};
	//debug2(mask);
	if ((mask!='') && (code != 0))
	{
		var isAllowed = (code==0)||(code==8); //allow Backspace and all service key combination (Left, Right, Del, etc)
		code = String.fromCharCode(code);

	    var CheckPattern = /^\d{1}$/; //checking pattern. one digital simbol

		//Use this mask for input that allow -, (), and spaces additionally to digits (internationl numbers)
		if(MaskPool[0]=='+###################'){
			CheckPattern = /^\d{1}|-|\(|\)|\s$/;
		}
		var pos = getCursorPosition(el); //get current cursor position

		if (code.match(CheckPattern) || (code == mask.charAt(pos))) //if input simbol is digit or same as the mask
		{
			var InputVal = code+el.value.substring(pos); //start adding characters from current cursor position
			var OutputVal = el.value.substring(0,pos);	//part of the value for checking and formatting.
			for( k=0; k < InputVal.length; k++)
			{
				code = InputVal.charAt(k);
				if (code.match(CheckPattern) )
				{
					for( i=OutputVal.length; i <= mask.length; i++)
					{
						var tChar = mask.charAt(i); //compare input simbol with mask
						if (tChar=='#')
						{
							OutputVal = OutputVal+code; //replace # by input simbol and leave the loop.
							break;
						}
						else {OutputVal = OutputVal+tChar} //add character from mask and continue looping.
					}
				}
				else
				{
					//allow to input mask character. for first, input character only
					if ( (code == mask.charAt(pos)) && (k==0) ) {OutputVal = OutputVal+code}
				}
			}
			el.value=OutputVal; //return the result
		}
		else
		{
			if (!isAllowed)
			{
				el.value = CurrentElValue; //restore element value
				alert('Invalid phone character.');
			}
		}


		if ('\v'=='v'){e.returnValue = false;} //IE
		else
		{
			if (!isAllowed) {e.preventDefault();} //Mozilla
		}
	}
}


function isNumeric(sText) {
	var ValidChars = "0123456789.";
	if (sText=='') return false;
	var IsNumber=true;
	var dotCount = 0;
	var Char;
	for (i = 0; i < sText.length && IsNumber == true; i++) {

		Char = sText.charAt(i);
		if (ValidChars.indexOf(Char) == -1) {
			IsNumber = false;
		}
		if(Char == '.'){
			dotCount ++;
		}
	}
	//alert(dotCount);
	if(dotCount > 1){
		IsNumber=false;
	}
	return IsNumber;
}

function isRadioOn(radiobtn)
{
    var radioChecked = false;

    if((radiobtn) && (!radiobtn.disabled))
    {
        for (var loop=0; !radioChecked && loop < radiobtn.length; loop++)
        {
            if(radiobtn[loop].checked){return true;}
        }

        if (!radioChecked)
        {
            radiobtn.focus();
$.validity.start();
            $(".membershipDues .subItem").assert(
        $(".membershipDues .subItem").is(":checked"),
        "You must select a membership category"
    );
      var result = $.validity.end();
       return result.valid;

    //return false;
        }
    }
    else
    {return true;}
}

function checkSubscripType(radio)
{
	if (!isRadioOn(radio)) {

		//alert("Please select your membership dues type");
return false;
	}
	return true;
}

function checkUpload(myUploadFileInput, optional, msg)
{
	setAddDoc(myUploadFileInput);

	if ($.trim($(myUploadFileInput).val()).length > 0)
	{return true;}
	else//nothing was uploaded
	{
		//then if required, alert & return false
		if (!optional)
		{
			alert('Please upload your ' + msg);
			return false;
		}
		//else is optional, now return true
		else{return true;}
	}
}

function checkResumeUL()
{
	setAddDoc('#resumefile');
	if ($.trim($('#resumefile').val()).length > 0 || $.trim($('#RESUMETEXT').val()).length > 0)
	{ return true;}
	else
	{
		$('#RESUMETEXT').focus();
		alert('Please paste or upload your resume');
		return false;
	}
}