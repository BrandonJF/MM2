

var xmlHttp;

function doAjaxFill(URL, fieldToFill) {
		
	
					//detect browser 
                      if(navigator.userAgent.match('Firefox')){
								createXMLHttpRequest();
								var myUrl=URL;
                                xmlHttp.open("get",myUrl, false);					
                                xmlHttp.send(null);
								xmlHttp.onreadystatechange = handleStateChange(fieldToFill);
					  }else{
						  	//alert('in IE');
						  	var http = getHTTPObjectIE();
	                        http.onreadystatechange = function (){ fillFieldIE(http, fieldToFill)};
                            http.open("GET", URL, false); 
                            http.send(null);
					  }
								
}
	

function createXMLHttpRequest()
 {
                               if (window.ActiveXObject)
                                {
                                                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                                }
                                else if (window.XMLHttpRequest)
                                {
                                                xmlHttp = new XMLHttpRequest();
                                }
}
				

function handleStateChange(fieldToFill)
{
	//alert('state change');
	if (xmlHttp.readyState==4)
	{   
		if (xmlHttp.status==200)
        {
        	results = xmlHttp.responseText;
			if (results.indexOf("<!--BEGINTAG-->") > -1) {  // Check for presence of BEGINTAG and ENDTAG delimiters.
	     	begin   = results.indexOf("<!--BEGINTAG-->");
		 	end     = results.indexOf("<!--ENDTAG-->");
			results = results.slice(begin, end);
		}
		//alert('results: '+results);
		document.getElementById(fieldToFill).innerHTML = results;
   }
 }
						
}



//CODE FOR IE (original scriptsAJAX.js)

function doAjaxFillIE(URL, fieldToFill) {
	var http = getHTTPObjectIE();
    http.onreadystatechange = function (){ fillFieldIE(http, fieldToFill)};
    http.open("GET", URL, false); 
    http.send(null);
}
	
function getHTTPObjectIE() { 
    var xmlhttpIE;
	if (window.ActiveXObject)
	{
		xmlhttpIE=new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest)
	{
		xmlhttpIE=new XMLHttpRequest();	
	}	
      return xmlhttpIE; 
    } 
	
function fillFieldIE(http, fieldToFill) {
      if (http.readyState == 4) { 
        results = http.responseText;
		if (results.indexOf("<!--BEGINTAG-->") > -1) {  // Check for presence of BEGINTAG and ENDTAG delimiters.
		  begin   = results.indexOf("<!--BEGINTAG-->");
		  end     = results.indexOf("<!--ENDTAG-->");
		  results = results.slice(begin, end);
		}
		//alert(fieldToFill);
		//alert(results);
		document.getElementById(fieldToFill).innerHTML = results;
		
      } 
}

