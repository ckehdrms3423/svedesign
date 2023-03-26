
var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10 
};

var map = new naver.maps.Map('map', mapOptions);

$.ajax({
  url:"/data",
  method: "GET",
  success: function(data){
    displayMarkers(data);
  },
  error: function(error){
    console.log(error);
  }
});

let markerList=[];
let infowindowList=[];

const getClickHandler=(i)=>()=>{
  const marker=markerList[i];
  const infowindow=infowindowList[i];
  if(infowindow.getMap()){
    infowindow.close();
  }else{
    infowindow.open(map,marker);
  }
}

function displayMarkers(data){
  for(let i in data){
    const target=data[i];
    const latlng=new naver.maps.LatLng(target.y,target.x);
    const color=(target.traffic>3)? '#0000FF' : '#FF0000';
    let marker = new naver.maps.Circle({
      map: map,
      center: latlng,
      radius: 20,
      strokeColor: color,
      strokeOpacity: 0.7,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.2,
      icon:{
        content: `<div class="marker"></div>`,
        anchor: new naver.maps.Point(10,10),
      },
    });
    const content=`
      <div class="infowindow_wrap">
        <div class="infowindow_title">${target.traffic}</div>
      </div>
    `;
    const infowindow=new naver.maps.InfoWindow({
      content:content,
      backgroundColor:"#00ff0000",
      borderColor:"#00ff0000",
      anchorSize: new naver.maps.Size(0,0),
    });
    markerList.push(marker);
    infowindowList.push(infowindow);
  }
}

for(let i = 0,ii=markerList.length;i<ii;i++){
  naver.maps.Event.addListener(markerList[i],"click",getClickHandler(i));
}

