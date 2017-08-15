var request = new XMLHttpRequest();
request.open('GET','webDevHRTest.xml',false);
request.send();
var xml = request.responseXML;

/*var users = xml.getElementsByTagName("entry")[0].getAttribute("type");*/
var data = xml.getElementsByTagName("entry");
//alert(users.length);
var count=0;
for(var i = 0; i < data.length; i++) {
    if(data[i].getAttribute("type")==1){
   	
   count++;
    }
}

 var tempValue = 0;

for(var x = 0; x < data.length; x++) //a.length = # of indices in the array
    {
       
        

        for(var y = 0; y < data.length-1; y++)
        {
            if(data[y+1].getAttribute("name") > data[y].getAttribute("name"))
            {
            	tempValue = data[y+1];
            	data[y+1]=data[y];
            	data[y]=tempValue;
            	
            }
        }
    }
for (var i = 0; i < data.length; i++) {
	console.log(i+"- "+data[i].getAttribute("name"));
}

var lats = [];
var lons = [];
var names = [];
var images = [];
var images2 = [];
for(var i = 0; i < data.length; i++) {
    if(data[i].getAttribute("type")==1){
    var image = data[i].getElementsByTagName("image")[0].getAttribute("source");
    var image2 = data[i].getElementsByTagName("image")[0].getAttribute("source");
    image = "http://www.digitaleg.com/Digital_Egypt/Cairo-Festival-City/Media/Images/" +image+"_Image_L5.jpg";
      image2 = "http://www.digitaleg.com/Digital_Egypt/Cairo-Festival-City/Media/Images/" +image2+"_Image_L2.jpg";
    var user = data[i];
    var lat = data[i].getAttribute("y");
    var lon = data[i].getAttribute("x");
    var name = data[i].getAttribute("name");
    lats.push(lat); 
    lons.push(lon); 
    names.push(name); 
    images.push(image); 
    images2.push(image2); 
    }
}





function initialize() {

    var myOptions = {
        center: new google.maps.LatLng(30.031472,31.412864),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    var map = new google.maps.Map(document.getElementById("default"),
        myOptions);

    setMarkers(map, lats,lons,names,images2)
}


function setMarkers(map, lats,lons,names,images2) {

    var marker, i
    for (i = 0; i < lats.length; i++) {

        //var loan = locations[i][0]
        
        var lat = lats[i]
        
        var long = lons[i]
        var name = names[i]
        var image = images2[i]
       
        //var add = locations[i][3]
      
        latlngset = new google.maps.LatLng(lat, long);

        var marker = new google.maps.Marker({
            map: map, title: name, position: latlngset
        });
        map.setCenter(marker.getPosition())

        var content = '<h3 style="text-transform:capitalize;">'+ name +'<h3/>' + '<img src="' + image +'" title="'+name+'" alt="'+name+'">'

        var infowindow = new google.maps.InfoWindow()

       google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
    return function() {
        infowindow.setContent(content);
        infowindow.open(map,marker);
    };
})(marker,content,infowindow));  
    }
}

