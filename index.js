API_KEY="8e124fac44ff8d037d46b725a5a04494"
var content=document.getElementById("content")
var useflx=document.getElementById("useflex")
var map=document.getElementById("map")
var flex=document.getElementById("load")

var load="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
var error="https://c.tenor.com/oUaU9MLofEcAAAAM/where-are-you-location.gif"
document.getElementById("btn").addEventListener("click",display)
function display()
{
    content.innerHTML="";
    content.style.display="none"
    map.innerHTML="";
    flex.innerHTML=`<img src=${load} alt="" id="logo">`
   
   //var gmap=document.getElementById("gmap_canvas")
   //url="https://maps.google.com/maps?q=Bhubaneswar&t=&z=13&ie=UTF8&iwloc=&output=embed"
  setTimeout( async function()
  {
    try{
        var city= document.getElementById("city").value
        var res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
       var res1=await res.json()
       console.log(res1);
       flex.innerHTML="";
       content.style.display="block"
       content.innerHTML=
            `<div>
                <h3>${res1.name}</h3>
                <h5>${Date()}</h5>
                <p>Temp:${res1.main.temp}c</p> <p>Min Temp:${res1.main.temp_min}c</p>
                <p>Max Temp:${res1.main.temp_max}c</p>
                <p>Wind:${res1.wind.speed}</p>
                <p>Clouds:${res1.weather[0].description}</p>
                <p>sunrise:${res1.sys.sunrise}</p>
                <p>sunset:${res1.sys.sunset}</p>
            </div>`

            map.innerHTML=`<div class="mapouter">
            <div class="gmap_canvas">
                <iframe
                width="600"
                height="500"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=${res1.name}&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                ></iframe>
            </div>
            </div>`
       }
       catch(e)
       {
        flex.innerHTML=`<img src=${error} alt="" id="logo2">`
        content.style.display="none"
        console.log(e,"error")
       }
  },1800) 
}

function getlocation()
{
    async function success(pos) {
        const crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        var res3=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8e124fac44ff8d037d46b725a5a04494&units=metric`)
        var res4=await res3.json()
        console.log(res4);

        var content=document.getElementById("content")
          content.innerHTML=
             `<div>
                 <h3>${res4.name}</h3>
                 <h5>${Date()}</h5>
                 <p>Temp:${res4.main.temp}c</p>
                 <p>Max Temp:${res4.main.temp_max}c</p>
                 <p>Wind:${res4.wind.speed}</p>
                 <p>Clouds:${res4.weather[0].description}</p>
                 <p>sunrise:${res4.sys.sunrise}</p>
                 <p>sunset:${res4.sys.sunset}</p>
             </div>`
            
             var map=document.getElementById("map")
             map.innerHTML=`<div class="mapouter">
             <div class="gmap_canvas">
                 <iframe
                 width="600"
                 height="500"
                 id="gmap_canvas"
                 src="https://maps.google.com/maps?q=${res4.name}&t=&z=13&ie=UTF8&iwloc=&output=embed"
                 frameborder="0"
                 scrolling="no"
                 marginheight="0"
                 marginwidth="0"
                 ></iframe>
             </div>
             </div>`
            }
            navigator.geolocation.getCurrentPosition(success);
        }