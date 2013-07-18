// JavaScript Document

//GLOBAL VARIABLES
var isDiscount = false;
var isPercent = false;
var discountAmt = 0;

/*////////////////// SHOPPING /////////////////////////////////*/

function loadSideBar(){
//alert('in side bar request');
var proddURL = '../msascartdll.dll/productlist?onwebflg=Y&WMT=none&whp=none&wnr=none&wbp=productList_side.htm&UNITPRICE=<80';
$.ajax({url:proddURL, type:"GET", success: function(response){
		//alert(response);
		$("#recSection").html('<h6>Our Top Recommended Products:</h6>'+response);
	}});
}

//populate cart summary:
function loadHeadBar(){
//NQ  - 7-5-11 - not sure when this gets called, so let's put an alert:
alert("NQ - 7-5-11 - debug! i was trying to figure out when/why this was called...this debug is in cartscripts.js");

var cartHeaderURL = '../msascartdll.dll/revieworder?WMT=none&WRP=cartSum.htm';
//debug(URL);

$.ajax({url:cartHeaderURL, type:"GET", success: function(response){
		//debug(response);
		//debug($('cartHeaderSummary').innerHTML);
		if(response.match('Your cart is empty') || response.match('No Cart Items')){
			var emptyString = 	'<a href="../msascartdll.dll/showcart">0 Item(s) In Cart</a> &nbsp;&nbsp;&nbsp; Total: $0.00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			$('#cartHeaderSummary').html(emptyString);
		}else{
			$('#cartHeaderSummary').html(response);
		}
	} });
}

function loadNothing(){
var nothingURL = '../msascartdll.dll/productlist?whp=nothing.htm&wbp=nothing.htm&WMT=none';
$.ajax({url:nothingURL, type:"GET", success: function(response){
		debug(response);
		$("nothingSection").html(response);
	}});
}



//adds all items to the cart
//NEW SHOPPING CART
function addToCart_newCart(formName, type){
	if(type == undefined){
		type = "P";
	}

	var something=0;
	var cartURL = createList_newCart(formName, type);

	if(cartURL != '../msascartdll.dll/showcart?'){
		something = 1;
	}


	if(something == 1){
		debug(cartURL);
		window.location = cartURL;
		return true;
	}else{
		alert("Please choose an item to add to the cart.");
		return false;
	}

}


//adds products to comma delimited list
//NEW SHOPPING CART
function createList_newCart(formName, type){
	var cartURL = '../msascartdll.dll/showcart?';

	for(var i=0; i<formName.PRODUCTSELECTION.length; i++){

		if(formName.PRODUCTSELECTION[i].checked){
			var productName = formName.PRODUCTSELECTION[i].value+'';
			productName = Trim(productName);

			var tempURL = '&ADD=ORDERTYPE='+type+',ITEMCD='+productName;

			if(formName.PRODUCTQTY[i].value >= 1){
				tempURL += ",ITEMQTY=" + formName.PRODUCTQTY[i].value;
			}
			//if(formName.PROMOCODE.value != ''){
         //tempURL += ',APPEALCD='+formName.PROMOCODE.value;
    //}
			tempURL += "&";
			cartURL += tempURL;

		}
	}

	//alert(formName.ADD.value);
	return cartURL;
}


//adds all items to the cart (OLD CART)
function addToCart(formName){
	var something=0;
	createList(formName);

	for(var i=0; i<formName.PRODUCTSELECTION.length; i++){
		if(formName.PRODUCTSELECTION[i].checked){
			something = 1;
		}
	}

	if(something == 1){
		//alert('submitting!');
		formName.action="../msascartdll.dll/getCart";
		formName.submit();
		return true;
	}else{
		alert("Please choose an item to add to the cart.");
		return false;
	}

}




//adds products to comma delimited list
function createList(formName){
	formName.ADD.value = '';
	for(var i=0; i<formName.PRODUCTSELECTION.length; i++){
		if(formName.PRODUCTSELECTION[i].checked){
			var productName = formName.PRODUCTSELECTION[i].value+'';
			productName = Trim(productName);
			//alert('---'+productName+'---');
			//check if first in list
			if(formName.ADD.value==""){
				formName.ADD.value += productName;
			}else{
				formName.ADD.value += ", " + productName;
			}

			if(formName.PRODUCTQTY[i].value >= 1){
				formName.ADD.value += "=" + formName.PRODUCTQTY[i].value;
			}
		}
	}

	//alert(formName.ADD.value);
	return true;
}

//function which enters quantity of 1 if the box is checked
function checkValues(formName){

	for(var i=0; i<formName.PRODUCTSELECTION.length; i++){
		if(formName.PRODUCTSELECTION[i].checked){
			if(formName.PRODUCTQTY[i].value == 0){
				formName.PRODUCTQTY[i].value = 1;
			}
		}
	}
}

//function which automatically checks the box if a quantity is entered
function checkBoxes(formName){

	for(var i=0; i<formName.PRODUCTSELECTION.length; i++){
		if(formName.PRODUCTQTY[i].value > 0){
			formName.PRODUCTSELECTION[i].checked = true;
		}
	}
}

//trims off whitespace
function Trim(str)
{  while(str.charAt(0) == (" ") )
  {  str = str.substring(1);
  }
  while(str.charAt(str.length-1) == " " )
  {  str = str.substring(0,str.length-1);
  }
  return str;
}






/*///////////////////////// CHECKOUT ///////////////////////////*/

function cartInitialize(formName){
	//check if theyre logged in
	var loggedIn = false;
	if(CUSTOMERCD != ''){
		loggedIn = true;
	}

	//check if logged in
if(!loggedIn){
	$('#showProfileLink').hide();
	$('#profileInformation').hide();
	$("#epi").html("Create a Profile");
	}else{
		$('#notLoggedIn').hide();
		$('#profileInformation').show();
	}

	calcCartTotals(formName);
}

function calcCartTotals(formName){
	var totalAmt = $('#cartTotal').html();

	var discountTotal = 0;
	var shipTotal = 0;
	var taxTotal = 0;
	var invoicesTotal = 0;

	//alert(invoicesTotal);
	if(isDiscount){
		debug(discountAmt);
		if(isPercent){
			debug(discountAmt + ' * ' + totalAmt);
			discountTotal = parseFloat(discountAmt) * parseFloat(totalAmt);
		}else{
			discountTotal = parseFloat(-discountAmt);
		}
	}

	$('#shipTotal').html(parseFloat(shipTotal).toFixed(2));

	var subTotal = parseFloat(totalAmt) + parseFloat(shipTotal) + parseFloat(taxTotal) + parseFloat(invoicesTotal) - parseFloat(discountTotal);
	//alert(totalAmt);

	$('#cartTotal').html(parseFloat(subTotal).toFixed(2));

	//NQ - 7-18-11 - if totalamt = 0, then show submit registration button
	if (parseFloat(subTotal) == 0)
		{$("#paymentOptions").hide();}
}


//checks validity of promo code
function checkPromo(formName){
	var promoURL = '../orderdll.dll/verifyPromoCode?code='+formName.PRODUCTPROMOTIONALCODE_input.value;
	$.ajax({url:promoURL, type:'GET',
		success: function(response){
			//alert('Response is: '+response);
			var promoArray = response.split(',');
			var status = promoArray[0];
			var amt = promoArray[1];
			promoName = promoArray[2];
			var orgcd = parseInt(promoArray[3]);
			var tempAmt = 0;


			var successMessage = 'Promo code successful!';

			//alert('--'+orgcd+'-- ?= --<#ORGCD>--');

			if(status == 1){
				if((orgcd == '<#ORGCD>') || (isNaN(orgcd)) ){
					//valid promo code
					discountAmt = amt;
					//alert('amt: '+amt);

					if(parseFloat(amt) > 0){
						isPercent = true;
						tempAmt = parseFloat(amt) * parseFloat(100);
						successMessage = successMessage + ' A ' + tempAmt + '% discount will be applied to your total price.';
 					}else if(parseFloat(amt) == 0){
						isPercent = false;
						tempAmt = parseFloat(amt) * parseFloat(-1);
					}else{
						isPercent = false;
						tempAmt = parseFloat(amt) * parseFloat(-1);
						successMessage = successMessage + ' A $' + tempAmt  + ' discount will be applied to your total price.';
					}

					isDiscount = true;
					alert(successMessage);
					//copy to hidden field
					formName.PRODUCTPROMOTIONALCODE.value = formName.PRODUCTPROMOTIONALCODE_input.value;

					//disable promo seactions
					$('#promo_button').attr('disabled', 'disabled');
					$('#promo_code').attr('disabled', 'disabled');
					calcCartTotals(formName);

				}else{
					alert('This promo code does not apply to your organization.');
				}
			}else if(status == 0){
				alert('This promo code has expired.');
			}else{
				alert('This promo code does not exist.');
			}

		},
		error: function(){alert('An AJAX error has occured. Please ensure that you have Javascript-enabled browser and re-load the page to try again.');}
	});
}



//on cart, toggles update info section on or off
function toggleUpdate(show){
	if(show){
		$('#hideProfileLink').show();
		$('#profileInformation').show();
		$('#showProfileLink').hide();
	}else{
		$('#hideProfileLink').hide();
		$('#profileInformation').hide();
		$('#showProfileLink').show();
	}
}

function validatePartial(field, total){
	var totalAmt = parseFloat(total);
	var partial = field.value;
	if(!isNumeric(partial)){
		alert("Please enter a valid numerical value for your partial payment.");
		field.focus();
		return false;
	}else if(parseFloat(partial) < 0){
		alert("Please enter a partial payment greater than zero.");
		field.focus();
		return false;
	}else if(parseFloat(partial) > totalAmt){
		alert("Please ensure that your partial payment is less than the invoice total.");
		field.focus();
		return false;
	}else{
		return true;
	}
}


//checks validity of promo code (for new shopping cart)
function checkPromo_newCart(formName){
	var promoURL = '../orderdll.dll/verifyPromoCode?code='+formName.PRODUCTPROMOTIONALCODE_input.value;
	$.ajax({url:promoURL, type:'GET',
		success: function(response){
			var promoArray = response.split(',');
			var status = promoArray[0];
			var amt = promoArray[1];
			promoName = promoArray[2];
			var orgcd = parseInt(promoArray[3]);
			var tempAmt = 0;

			var successMessage = 'Promo code successful!';

			if(status == 1){
				if((orgcd == '<#ORGCD>') || (isNaN(orgcd)) ){
					//valid promo code
					discountAmt = amt;
					//alert('amt: '+amt);

					if(parseFloat(amt) > 0){
						isPercent = true;
						tempAmt = parseFloat(amt) * parseFloat(100);
						successMessage = successMessage + ' A ' + tempAmt + '% discount will be applied to your total price.';
 					}else if(parseFloat(amt) == 0){
						isPercent = false;
						tempAmt = parseFloat(amt) * parseFloat(-1);
					}else{
						isPercent = false;
						tempAmt = parseFloat(amt) * parseFloat(-1);
                        alert(amt);
						successMessage = successMessage + ' A $' + tempAmt  + ' discount will be applied to your total price.';
					}

					isDiscount = true;
					alert(successMessage);
					//copy to hidden field
					//formName.PRODUCTPROMOTIONALCODE.value = formName.PRODUCTPROMOTIONALCODE_input.value;

					//add promo code to cart
					//debug("TO DO: Add Discount Code to Cart");
					var promoURL = '../msascartdll.dll/showcart?PRODUCTPROMOTIONALCODE='+formName.PRODUCTPROMOTIONALCODE_input.value;
					//debug('going to discount url: '+promoURL);
					window.location = promoURL;

					//disable promo seactions
					//$('promo_button').disable();
					//$('promo_code').disabled = true;
					//calcCartTotals(formName);

				}else{
					alert('This promo code does not apply to your organization.');
				}
			}else if(status == 0){
				alert('This promo code has expired.');
			}else{
				alert('This promo code does not exist.');
			}

		},
		error: function(){alert('An AJAX error has occured. Please ensure that you have Javascript-enabled browser and re-load the page to try again.');}
	});
}


//toggle shipping addresses
//switch shipping address
function switchAddress(formName,address,orgcd){
		//check if theyre logged in
		var loggedIn = false;
		if(CUSTOMERCD != ''){
			loggedIn = true;
		}

		var url = '';
		var div = 'shipSection';

		if(loggedIn){
			if(address == 'home'){
				url=url+'../memberdll.dll/info?wmt=none&wrp=shipHome.htm&wnr=shipAddress.htm';
			}else if(address == 'work'){
				url=url+'../memberdll.dll/info?wmt=none&wrp=shipWork.htm&wnr=shipAddress.htm';
			}else if(address == 'org'){
				url=url+'../organizationdll.dll/info?wmt=none&wrp=shipAddress.htm&wnr=shipAddress.htm&orgcd='+orgcd;
			}else if(address == 'new'){
				url=url+'../memberdll.dll/info?wmt=none&wrp=shipAddress.htm&wnr=shipAddress.htm';
			}





			$.ajax({
			  url: url,
			  async:'false',
			  success: function(response) {
				$("#" + div).html(response);
					//update fields with newly entered info
					$("#" + div).trigger('create');
			  }
			});



		}else{
			//NOTE LOGGED IN
			url += '../memberdll.dll/openpage?wmt=none&wrp=shipAddress.htm';
			//new Ajax.Updater(div, url, {method:'get', asynchronous:'false'});
			$.ajax({url:url, type:'GET', async:'false',
				success:function(response){

					$("#" + div).html(response);
					//update fields with newly entered info
					if(formName.ADDRESS1){
						if(address == 'home'){
							formName.SHIPADDRESS1.value = formName.ADDRESS1.value;
							//formName.SHIPADDRESS2.value = formName.ADDRESS2.value;
							formName.SHIPCITY.value = formName.CITY.value;
							formName.SHIPSTATECD.selectedIndex = formName.STATECD.selectedIndex;
							formName.SHIPZIP.value = formName.ZIP.value;
							formName.SHIPCOUNTRY.selectedIndex = formName.COUNTRY.selectedIndex;
						}/*else if(address == 'work'){
							formName.SHIPADDRESS1.value = formName.ALTADDRESS1.value;
							//formName.SHIPADDRESS2.value = formName.ALTADDRESS2.value;
							formName.SHIPCITY.value = formName.ALTCITY.value;
							formName.SHIPSTATECD.selectedIndex = formName.ALTSTATE.selectedIndex;
							formName.SHIPZIP.value = formName.ALTZIP.value;
							formName.SHIPCOUNTRY.selectedIndex = formName.ALTCOUNTRY.selectedIndex;
						}*/
					}
					$("#" + div).trigger('create');
				},
				error:function(){alert('ERROR: An AJAX error has occurred. Please re-load the page and try again.');}
				});
		}

		// $( "div[data-role=page]" ).page( "destroy" ).page();
}

//UNIVERSAL update totals function
//looks for products, donations, subscriptions, and membership
//populates appropriate hidden fields and updates totals screen
function updateTotals(initialTotal){
	var tempTotal = 0.00;
	var donsTotal = 0.00;
	var membershipTotal = 0.00;
	var subsTotal = 0.00;

	var subItems = '';
	var cartItems = '';

	if(initialTotal != undefined){
		tempTotal = parseFloat(initialTotal);
	}
	//all subscription type items
	//cycles thorugh all items where class='subItem
	//id = subsriptionname
	//value = price
	//name = type of subscription
	$('.subItem').each(function(){
		if(this.checked){
			if(this.name=="SUBSCRIPTIONNAME"){
				subsTotal += parseFloat(this.value);
			}
			if(this.name=="MEMBERSHIPNAME"){
				membershipTotal += parseFloat(this.value);
                taxTotal = getMembershipTax( $(this).attr("id"), $("#State").val() );
			}

			subItems += this.id+',';
			tempTotal += parseFloat(this.value) + parseFloat(taxTotal);
		}

		if((this.type=="text") && (parseFloat(this.value) > 0.00)){
			if(this.name=="DONATIONNAME"){
				donsTotal += parseFloat(this.value);
				subItems += this.id + '=' +this.value + ',';
				tempTotal += parseFloat(this.value);
			}
		}
	});

	$('#subsTotal').html(parseFloat(subsTotal).toFixed(2));
	$('#membershipTotal').html(parseFloat(membershipTotal).toFixed(2));
	$('#donsTotal').html(parseFloat(donsTotal).toFixed(2));
	$('#totalAmt').html(parseFloat(tempTotal).toFixed(2));

	//trim trailing comma off subitems
	$('#SUBITEMS').val(subItems.substring(0,subItems.length-1));
	//debug('Subitems: '+$('SUBITEMS').value);
}
function getMembershipTax(subItem, shipStateCd) {
	var taxAmt = 0.00;
	var estimateUrl = '../orderdll.dll/estimatetotals?wrp=taxAndCartTotal.htm&wmt=none&subitems=' + subItem + '&SHIPSTATECD=' + shipStateCd;
	$.ajax({url:estimateUrl, type:'GET', async:false,
		success: function(response){
			var tempArray = response.split("|");
			taxAmt = tempArray[0];
		},
		error: function(){
			alert('An AJAX error has occured. Please ensure that you have Javascript-enabled browser and re-load the page to try again.');
		}
	});
	return parseFloat(taxAmt);

}

function membershipApp_addToCart(formName){
	//validate everything (except payment)
	//if(checkSubscripType(formName.MEMBERSHIPNAME) && validateAll(formName,false)){
	if(checkSubscripType(formName.MEMBERSHIPNAME) && validateAll(formName,false)){
		//create customer record, return CUSTOMERCD
		var customercd='';
		$.ajax({url:'../memberdll.dll/updateInfo', type:"GET", async:false, data:$('#user_profile').serialize(),
			success:function(response){

					//alert("TO DO: Get CUSTOMERCD for a new user! Update User Response: \n\n"+response);
					//get new customercd if new user

					customercd = removeNL(response);
					//alert('created new user! '+customercd+'!');
			}
		});

		//construct cart URL
		var addURL = '../msascartdll.dll/showcart?';
		$('.subItem').each(function(){
			//donation items
			if((this.type == 'text') && (parseFloat(this.value) > 0)){
				addURL += 'ADD=ORDERTYPE=D,ITEMCD='+this.id+',USEMEMPRICES=Y,PRICEAMT='+parseFloat(this.value);
			}
			//subscript items
			if((this.type == 'checkbox') || (this.type == 'radio')){
				if(this.checked == true){
					addURL += 'ADD=ORDERTYPE=D,ITEMCD='+this.id+',USEMEMPRICES=Y,ITEMQTY=1';
				}
                if(formName.PROMOCODE.value != ''){
         addURL += ',APPEALCD='+formName.PROMOCODE.value;
    }
			}
            addURL += "&";
		});

		//debug(addURL);
		//add cart items via URL

		$.ajax({url:addURL, type:"GET", async:false});
		window.location = '../memberdll.dll/info?wrp=membershipapp_confirm.htm';
	}
}

function membershipApp_payNow(formName){
	var moveOn = (!(formName.MEMBERSHIPNAME)) || checkSubscripType(formName.MEMBERSHIPNAME);
	if (moveOn){
		if ($('#BILLME').attr('checked')=='checked'){
            formName.WMT.value = '../main_template_css.htm';
			formName.RESPONSEPAGE.value = 'billme.htm';
			formName.action = '../orderdll.dll/orderp';
			formName.submit();
		} else if(validateAll(formName,true) && passwordConfirm(formName)){
			formName.WMT.value = '../main_template_css.htm';
			formName.RESPONSEPAGE.value = 'membershipapp_confirm.htm';
			formName.action = '../orderdll.dll/orderp';
			formName.submit();
		}
	}
	else {return false;}
}
function orgmembershipApp_addToCart(formName){
	//validate everything (except payment)
	if(checkSubscripType(formName.MEMBERSHIPNAME)){

		//create customer record, return orgcd
		var orgcd='';
        var orgname='';
		$.ajax({url:'../organizationdll.dll/updateInfo', type:"GET", async:false, data:$('#org_profile').serialize(),
			success:function(response){
				orgcd = $(response).find('#ORGID').text();
                orgname = $(response).find('#ORGNAME').text();
			}
		});
		$.ajax({url:'../memberdll.dll/updateInfo?customercd='+CUSTOMERCD+'&orgcd='+orgcd+'&orgname='+orgname, type:"GET", async:false,
			success:function(response){


			}
		});
		//construct cart URL
		var addURL = '../msascartdll.dll/showcart?ORGORDERFLG=Y&';
		$('.subItem').each(function(){
			//donation items
			if((this.type == 'text') && (parseFloat(this.value) > 0)){
				addURL += 'ADD=ORDERTYPE=D,ITEMCD='+this.id+',PRICEAMT='+parseFloat(this.value)+',CUSTOMERCD='+orgcd+',CUSTOMERTYPE=O&';
			}
			//subscript items
			if((this.type == 'checkbox') || (this.type == 'radio')){
				if(this.checked == true){
					addURL += 'ADD=ORDERTYPE=D,ITEMCD='+this.id+',ITEMQTY=1,CUSTOMERCD='+orgcd+',CUSTOMERTYPE=O&';
				}
			}

		});
		//debug(addURL);
		//add cart items via URL

		$.ajax({url:addURL, type:"GET", async:false});
		window.location = '../organizationdll.dll/updateinfo?wrp=membershipapp_confirm.htm&orgcd='+orgcd;
	}
}
 function orgmembershipApp_payNow(formName){
	var moveOn = (!(formName.MEMBERSHIPNAME)) || checkSubscripType(formName.MEMBERSHIPNAME);
	if (moveOn)
	{	   if ($('#BILLME').attr('checked')=='checked'){
            formName.WMT.value = '../main_template_css.htm';
			formName.RESPONSEPAGE.value = 'billme.htm';
			formName.action = '../orderdll.dll/orderp';
			formName.submit();
    }
			if(validateAll(formName,true) && passwordConfirm(formName)){

                formName.WMT.value = '../main_template_css.htm';
				formName.RESPONSEPAGE.value = 'organizationapp.htm';
				formName.action = '../orderdll.dll/orderp';
               formName.submit();
           /*  var orgcd='';
                var orgname='';
				$.ajax({url:'../orderdll.dll/orderp', type:"post", async:false, data:$('#org_profile').serialize(),
			success:function(response){
                orgcd = $(response).find('#ORGID').text();
                orgname = $(response).find('#ORGNAME').text();
                $.ajax({url:'../memberdll.dll/updateInfo?customercd='+CUSTOMERCD+'&orgcd='+orgcd+'&orgname='+orgname, type:"GET", async:false,
			success:function(data){
                document.write(response);

			}
		});

			}
		});*/

		}
	else {
		return false;
		}
	}
}
function submitDonationToCart(){


		var donationSelected = false;
	for (var i=0; i<document.abc.DONATIONNAME.length; i++) {
		if (document.abc.DONATIONNAME[i].checked)
		{
			var donItem  = document.abc.DONATIONNAME[i].value;
			donationSelected =true;
		}
	}

	if (!donationSelected) {
		alert("Please select the type of gift your making.");
		document.getElementById("donationTypeContainer").style.border = "2px solid red";
		window.location = "#donationTypeAnchor";
		return false;
	}

	for (var i=0; i<document.abc.DONATIONVALUE.length; i++) {
		if (document.abc.DONATIONVALUE[i].checked)
			document.abc.donationAmt.value  = document.abc.DONATIONVALUE[i].value;
	}


	//var donItem  = document.abc.DONATIONNAME.value;
	//alert("nq you have selected: " + donItem);
	$(".subItem").each(function(element){
		if(element.checked == true){
			donItem = element.id;
		}
	});

	if(parseFloat(document.abc.donationAmt.value) > 0){
		document.abc.SUBITEMS.value = donItem + '=' + document.abc.donationAmt.value;
		//alert(document.abc.SUBITEMS.value);
		if(validateAll(document.abc, false)){
			setPhoneType(); // NQ - 1-24-11 see  function for explanation




			//NQ - 3-16-12 - if this is a new user, then turn SENDEMAIL on so that it sends the info
			var newCustomer = false;
			var thisPersonCd = "";
			if (document.abc.CUSTOMERCD.value == "")
				newCustomer = true;


			var cartURL = '../msascartdll.dll/showcart?ADD=ORDERTYPE=D,ITEMCD='+donItem + ',PRICEAMT=' + document.abc.donationAmt.value;
			var comments = ",COMMENTS=|UDEF5TXT=" + document.abc.SS_UDEF5TXT.value
							+ "|DONATIONNOTE=" + document.abc.SS_DONATIONNOTE.value
							+ "|SHIPCONTACT=" + document.abc.SHIPCONTACT.value
							+ "|SHIPADDRESS1=" + document.abc.SHIPADDRESS1.value
							+ "|SHIPADDRESS2=" + document.abc.SHIPADDRESS2.value
							+ "|SHIPCITY=" + document.abc.SHIPCITY.value
							+ "|SHIPSTATECD=" + document.abc.SHIPSTATECD.value
							+ "|SHIPZIP=" + document.abc.SHIPZIP.value
							+ "|SHIPCOUNTRY=" + document.abc.SHIPCOUNTRY.value
							+ "|SHIPEMAIL=" + document.abc.INVOICENOTE.value ;
			cartURL = cartURL + comments;
			//alert(cartURL);

			$.ajax({url:'../memberdll.dll/updateInfo', type:'post',async:false,data:$('form_abc').serialize(true),
				success: function(content){
					var response = content.responseText || '';
					//alert(response);
					thisPersonCd = removeNL(response);
				},
				error:function(){
					alert("An AJAX error has occurred. Please re-submit this form to try again."); return false;
				}
			});

			if (newCustomer) {
				//alert('in second ajax');
				var welcomeEmail = "../memberdll.dll/updateInfo?CUSTOMERCD=" + thisPersonCd + "&SENDEMAIL=Y&EMAILFROMADDRESS=dtapia@forestfoundation.org&EMAILRESPONSEFORMAT=HTML&EMAILREPLYFORM=welcomeEmail.htm&EMAILSUBJECT=New Account Information";

				$.ajax({url:welcomeEmail,type:'get',async:false,
				success: function(content){
					var response = content.responseText || '';
				},
				error:function(){
					alert("An AJAX error has occurred. Please re-submit this form to try again."); return false;
				}
			});

			}

			//NQ  - 3-24-12 - NOW send order to cart via ajax

				$.ajax({url:cartURL, type:'get',async:false,
				success: function(content){
					var response = content.responseText || '';
					//alert(response);

				},
				error:function(){
					alert("An AJAX error has occurred. Please re-submit this form to try again."); return false;
				}

			});
			window.location.href = "../msascartdll.dll/showcart";




		}
	} else{

		alert("Please select a donation amount");
		return false;
	}



}