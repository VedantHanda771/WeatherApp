let btnsrch=document.getElementById("srch");

    
let logo1="./img/drop-silhouette.png";
   let logo2="./img/wind.png";
   let logo3="./img/temperature (1).png";
  let logo4="./img/temperature.png";
  let logo5="./img/rising-sun.png";
  let logo6="./img/sunset.png";

const key="6d0dda5f2a2e8b0e723ab2ad060b1860";
btnsrch.addEventListener("click",function(){
    let input=document.getElementById("city").value;
    getData(input);
   // console.log(input)
})

async function getData(city){
let url=  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

console.log(url)
   try{
      let res=await fetch(url)   
 let data=await res.json();
getLocationBysrch(data)
 console.log(data)
   }
   catch(err){
console.log(err);
   }
}

// let urlDays=`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

    //  By Search

async function   getLocationBysrch(data){
  let lat=data.coord.lat;
  let long=data.coord.lon;

let rl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`

let urlDays=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}`;
try{
    let resCord =await fetch(rl);
    let dataCord=await resCord.json();

    let resday=await fetch(urlDays);
    let dataDays=await resday.json();

    // console.log(dataCord.name);
     console.log(dataDays);

    
   let frm=  document.querySelector("#gmap_canvas");
   frm.src=`https://maps.google.com/maps?q=${dataCord.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
   
  
   appendBysrch(dataDays.daily,dataCord.coord.lat,dataCord.coord.lon)

}
catch(err){
    console.log(err);
}


}



function appendBysrch(data,lat,long){

document.querySelector(".days").innerHTML=null;
document.querySelector("#temp").innerHTML=null;
document.querySelector("#detl").innerHTML=null;
document.querySelector(".popltn").innerHTML=null;
document.querySelector(".default").classList.add("defaultV")
    document.querySelector(".frame").classList.add("frameV")

console.log(data);
console.log(lat);
console.log(long);
let icon=(data[0].weather[0].icon)
let sup=document.createElement("sup");
sup.innerText="C"
let h3Temp=document.createElement("h3");
let temp=(data[0].temp.day-(273.15)).toFixed(2)
//console.log(temp)
h3Temp.innerText=`${temp}°`;
h3Temp.append(sup);

let div_temp=document.createElement("div");

let div_img=document.createElement("img");
div_img.src=`https://openweathermap.org/img/w/${icon}.png`;

div_temp.append(div_img);

let h2day=document.createElement("h2");
const dy=new Date(data[0].dt*1000);

const [day, date,month] = [dy.getDay(), dy.getDate(),dy.getMonth()];

let dt=date.toString();
let dayr;
let dtr;
let mnth;
if(dt.length<2){
    dtr=`0${dt}`
}
else{
    dtr=`${dt}`
}
if(day===0){
    dayr="Sunday";
}
else if(day===1){
    dayr="Monday";
}
else if(day===2){
    dayr="Tuesday";
}
else if(day===3){
    dayr="Wednesday";
}
else if(day===4){
    dayr="Thursday";
}
else if(day===5){
    dayr="Friday";
}
else if(day===6){
    dayr="Saturday";
}


if(month===0){
    mnth="Jan";
}
else if(month===1){
    mnth="Feb";
}
else if(month===2){
    mnth="Mar";
}
else if(month===3){
    mnth="Apr";
}
else if(month===4){
    mnth="May";
}
else if(month===5){
    mnth="Jun";
}
else if(month===6){
    mnth="Jul";
}
else if(month===7){
    mnth="Aug";
}
else if(month===8){
    mnth="Sept";
}
else if(month===9){
    mnth="Oct";
}
else if(month===10){
    mnth="Nov";
}
else if(month===11){
    mnth="Dec";
}
h2day.innerText=`${dayr} ${dtr} ${mnth}`;

let hr1=document.createElement("hr");
let div_lat=document.createElement("div");
let lat_p=document.createElement("p");
lat_p.innerText=`Latitude`;
let lat_pv=document.createElement("p");
 lat_pv.innerText=`${lat}`;

 div_lat.append(lat_p,lat_pv);

 let div_lon=document.createElement("div");
 let lon_p=document.createElement("p");
 lon_p.innerText=`Longitude`;
 let lon_pv=document.createElement("p");
 lon_pv.innerText=`${long}`;
 let hr2=document.createElement("hr");

 div_lon.append(lon_p,lon_pv);
 let water_mark=document.createElement("p");
 water_mark.setAttribute("id","mark");
 water_mark.innerText=`Developed by Team Arjun`;

 document.querySelector(".popltn").classList.add("visible")

 document.querySelector(".popltn").append(h2day,hr1,div_lat,div_lon,hr2,water_mark)



let h5Sky=document.createElement("h5");
let sky=((data[0].weather[0].main).toUpperCase());
h5Sky.innerText=`${sky}`;
