//duesScripts.js
//(c) 2010 Jacob Reed @ Euclid Technology
//Description: Utilties for dues renewal and payment

//updates totals and constructions SUBITEMS for dues and donations
function dues_updateTotals(formName){
	var totalAmt = parseFloat($('#balanceTotal').html());
	var sub = "";
	var tempID = "";
	var extraDues = "";
	var subsTotal = 0;
	
	//get subscriptions
	if (formName.SUBSCRIPTIONNAME){
		//alert(formName.SUBSCRIPTIONNAME.length);
		if (formName.SUBSCRIPTIONNAME.length){
		for (var i = 0; i < formName.SUBSCRIPTIONNAME.length; i++)
		{
			//alert('hi');
			if (formName.SUBSCRIPTIONNAME[i].checked==true)
			{
				var tempID_cost = formName.SUBSCRIPTIONNAME[i].value+"_COST";
				var tempID_dues = formName.SUBSCRIPTIONNAME[i].value+"_OTHERDUES";
				
				subsTotal += parseFloat($("#" + formName.SUBSCRIPTIONNAME[i].value + '_COST').value);

				//create subitems list
				if(sub != ''){
					sub = sub + ','+formName.SUBSCRIPTIONNAME[i].value;
				}else{
					sub = formName.SUBSCRIPTIONNAME[i].value;
				}

			}
		}
	}
	else {
		if (formName.SUBSCRIPTIONNAME.checked==true)
			{
			//alert('hi');
				var tempID_cost = formName.SUBSCRIPTIONNAME.value+"_COST";
				var tempID_dues = formName.SUBSCRIPTIONNAME.value+"_OTHERDUES";
				
				subsTotal += parseFloat($("#" + formName.SUBSCRIPTIONNAME.value + '_COST').value);

				//create subitems list
				if(sub != ''){
					sub = sub + ','+formName.SUBSCRIPTIONNAME.value;
				}else{
					sub = formName.SUBSCRIPTIONNAME.value;
				}

			}
		}
	}
		
	//update subscription totals
	$('#subsTotal').innerHTML = subsTotal.toFixed(2);
	formName.SUBITEMS.value = sub;
	
	//get donation totals
	var donsTotal = 0;
	var donsList = '';
	$('.donationAmt').each(function(){
		if(parseFloat(this.value) > 0){
			donsTotal = donsTotal + parseFloat(this.value);
			if(donsList == ''){	
				donsList = this.id + '=' + parseFloat(this.value);
			}else{
				donsList = donsList + ',' + this.id + '=' + parseFloat(this.value);
			}
		}		
	});
	
	$('#donsTotal').html(donsTotal.toFixed(2));
	if(sub == ''){
		formName.SUBITEMS.value = donsList;
	}else if(donsList != ''){
		formName.SUBITEMS.value += ','+donsList;
	}
	
	//alert('balance: '+totalAmt+ '   subs: '+subsTotal+'    dons: '+donsTotal);
	//alert(formName.SUBITEMS.value);
	$('#totalAmt').html(parseFloat(totalAmt + subsTotal + donsTotal).toFixed(2));
	
	//alert(document.order.SUBITEMS.value)
}

//displays optional subscriptions (with Associated dues prices)
function dues_showSubs(formName){
	var subsURL = '../subscriptiondll.dll/subitems?udef1txt=subscription&wmt=none&sort=subscriptiondes&inactiveflg=n&onwebflg=y&whp=subitemsList_header.htm&wbp=subitemsList_chbox_d.htm&wnr=norec_ajax.htm';
	$("#subscriptions_div").load(subsURL);	
}


//displays optional donations
function dues_showDons(){

	var donsURL = '../subscriptiondll.dll/subitems?udef1txt=donation&wmt=none&sort=subscriptiondes&inactiveflg=n&onwebflg=y&whp=donItems_header.htm&wbp=donItems_list.htm&wnr=norec_ajax.htm';
	$("#donations_div").load(donsURL);
}