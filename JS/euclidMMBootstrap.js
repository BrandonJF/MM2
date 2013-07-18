function setTitle() {
	// var newTitle = $("h1.title").text();
	// if (currentTitle.size()) {
	// currentTitle.text(newTitle);
	// console.log( "Title Changed.") ;
	// }
	// else{
	// console.log( $('#mainpage div h1:first').text($("h1.title").text())) ;
	// }
	console.log("Title Set!");

	$(function () {
		var titleObject = $(".ui-header .ui-title");
		var targetTitleObject = $('.title');
		var currentTitle = titleObject.text();
		var desiredTitle = $('.title').text();
		titleObject.text(desiredTitle);
		console.log("Title Set @ ready!");
	});
	//return false;
}

$(document).ready(function() {
	window.cv = window.cv || {};
	// console.log("CV Console initiated!");
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
		var _baseURL = "http://localhost/mm2/cgi-bin/";
		var _loginURL = "logindll.dll/IndLogin";
		var _logoutURL = "logindll.dll/IndLogoff";

		//private functions

		function _setName(inputName) {
			_name = inputName;
		}

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
		var _name = "John Doe";
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
		}

		function _getName() {
			return _name;

		}

		return {
			getName: function() {
				console.log(_getName());
			},
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
		var _name = "John Doe";
		//private functions

		function _save() {
			console.log(Window.cv);
			localStorage.setItem('cv', JSON.stringify(cv));

			// Retrieve the object from storage

		}
		/*==========  module returns  ==========*/

		return {
			save: _save
		};

	}());



	/*-----  End of util Functions  ------*/



	///

	// console.log(cv);
});

/*$(document).ready(function(){
	$('#camera_wrap_1').camera({
				thumbnails: false,
				fx:'scrollLeft',
				loaderStroke:3,
				loaderOpacity:.5,
				pagination:false,
				width:'100%'
			});

	// var windowURL;
	// windowURL = window.location.href;
	// if (windowURL.match("mainloginwelcome")) {
	// 	alert(windowURL);
	// };


})

*/

// $.gritter.add({
// (string | mandatory) the heading of the notification
// title: 'Function in 15 minutes!',
// (string | mandatory) the text inside the notification
// text: 'How to Organize Associations.'
// });