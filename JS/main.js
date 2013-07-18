//Declaring main application namespace for cv WEB
window.cv = window.cv || {};
// console.log("CV Console initiated");
//declaring nested namespaces
cv.config = cv.config || {};
cv.events = cv.events || {};
cv.util = cv.util || {};
//here is an alternate indexed property declaration for a NS
cv.user = cv.user || {};

/*========================================
=            config functions            =
========================================*/



cv.config = (function() {

	//private property
	var _baseURL = "http://localhost/cvmm2/cgi-bin/";
	var _loginURL = "logindll.dll/IndLogin";
	var _logoutURL = "logindll.dll/IndLogoff";

	//private functions


	return {
		baseURL: _baseURL,
		loginURL: _loginURL,
		logoutURL: _logoutURL
	};

}());

/*-----  End of config functions  ------*/



/*======================================
=            User Functions            =
======================================*/

cv.user = (function() {

	//private property
	var name = "John Doe";
	var CUSTOMERCD = '<#COOKIE_CUSTOMERCD>';
	var ISMEMBERFLG = '<#COOKIE_ISMEMBERFLG>';
	var MEMBERNAME = '<#COOKIE_MEMBERNAME>';
	var STATUSSTT = '<#COOKIE_STATUSSTT>';
	var CUSTOMERTYPE = '<#COOKIE_CUSTOMERTYPE>';
	var ORGCD = '<#COOKIE_ORGCD>';
	var ORGNAME = '<#ORGNAME>';
	//private functions

	function _login() {
		var webID = prompt("ID:");
		var webPWD = prompt("Password:");
		var jqxhr = $.post(cv.config.baseURL + cv.config.loginURL, {
			WEBUSERID: webID,
			WEBUSERPASSWORD: webPWD,
			ALLOWSESSIONID: "Y"
		}, function() {
			console.log("success");
		})
		.done(function() {
			console.log("second success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("finished");
		});

		return cv.config.baseURL;
	}

	function _logout() {

		var jqxhr = $.post(cv.config.baseURL + cv.config.logoutURL, function() {
			console.log("success");
		})
		.done(function() {
			console.log("second success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("finished");
		});

	}

	function _setName(inputName) {
		_name = inputName;
		console.log("The user's name is now set to: " + _name);
		cv.util.save();
	}

	function _getName() {
		return _name;


	}

	return {
		getName: function() {
			console.log(_getName());
		},
		name: name,
		setName: _setName,
		login: _login,
		logout: _logout
	};

}());


/*-----  End of User Functions  ------*/


/*==========================================
=            util Functions            =
==========================================*/

cv.util = (function() {

	//private property
	function _save() {
		console.log(window.cv);
		localStorage.setItem('cvStorage', JSON.stringify(window.cv));

	}
	function _load(){
		var cvStorage = JSON.parse(localStorage.getItem('cvStorage'));
		console.log(cvStorage);
	}

	function _reset(){
		localStorage.removeItem("cvStorage");
	}

	function _displayStoredItem(){
		var storedCV = JSON.parse(localStorage.getItem("cvStorage"));
		storedCV.user.getName();
	}
	//private functions

	/*==========  module returns  ==========*/

	return {
		save: _save,
		load: _load,
		reset: _reset,
		disp: _displayStoredItem
	};
}());





/*-----  End of util Functions  ------*/

/*========================================
=            CV Save Function            =
========================================*/


console.log("CV Console ready!");



// window.cv = window.cv || {};
// window.cv.events =(function(){
// var testVar = 1;
// }() );