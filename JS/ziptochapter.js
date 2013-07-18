var xmlHTTP;
var isMozilla;

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function GetZipInfo(zipValue)
{
	var locationHost = document.location.host;
	var locationpath = document.location.pathname;
	var URLaddress = 'http://'+locationHost + locationpath+'/';
	createXMLHttpRequest_ForCI();
	setIsMozilla();
	if(!isMozilla)
	{
		xmlHTTP.onreadystatechange = handleStateChange_ForZip;
	}
	var updStr=URLaddress+'../../../cgi-bin/memberdll.dll/ZipInfo?ZIP='+zipValue+'&WMT=none&WNR=none'; 
	xmlHTTP.open("get",updStr, false);
	xmlHTTP.send(null);
	if(isMozilla)
	{
		xmlHTTP.onreadystatechange = handleStateChange_ForZip();
	}	
}



function setIsMozilla()
{
	var tmpStr = BrowserDetect.browser;
	
	if(tmpStr == 'Explorer')
	{
		isMozilla = false;
	}
	else
	{
		isMozilla = true;
	}
}

function createXMLHttpRequest_ForCI()
{
	try
	{
	  // Firefox, Opera 8.0+, Safari
	  xmlHTTP = new XMLHttpRequest();
	  //isMozilla = true;
	}
	catch (e)
	{
	  // Internet Explorer
		try
		{
			xmlHTTP=new ActiveXObject("Msxml2.XMLHTTP");
			//isMozilla = false;
		}
		catch (e)
		{
			try
			{
				xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
				//isMozilla = false;
			}
			catch (e)
			{
				alert("Your browser does not support AJAX!");
				//isMozilla = false;
				return false;
			}
		}
	}
}

function handleStateChange_ForZip()
{
	if (xmlHTTP.readyState==4)
	{
		if (xmlHTTP.status==200)
		{
			if (xmlHTTP.responseText != '')
			{
				var ZipList = new Array();
				ZipList =  xmlHTTP.responseText.split(',');
				$('input[name=CITYHIDDEN]').val(ZipList[0]); 
				$('input[name=STATEHIDDEN]').val(ZipList[1]); 
				$('input[name=CHAPTERID]').val(ZipList[2]); 
				$('input[name=CITY]').val(ZipList[0]);  
				$('#COUNTY').val(ZipList[3]); 
				$('#STATECD').val(ZipList[1]);
				
				
				if ($('#ChapterInfoList').is(':visible'))
				{					
					for (var i = 0; i < document.abc.ChapterInfoList.length; i++) 
					{
						if (document.abc.ChapterInfoList.options[i].value == ZipList[2]) 
						{
							document.abc.ChapterInfoList.options[i].selected=true;
							break;
						}
					}	
				}
			}	
			//if no match just leave it
		}
	}
}