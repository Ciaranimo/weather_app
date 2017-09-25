$(document).ready(function(){
  var lat;
  var long;
  var cTemp;
  var fTemp;
  var kTemp;
  var appid = 'e413609dc799cb017c4a2f0977641f82';
  //get location with ip address,
  $.getJSON("http://ip-api.com/json", function(data2){
    lat = data2.lat;
    long = data2.lon;

    var api =
    'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+appid;
    //get weather from within get location
    $.getJSON(api, function(data) {
    //JSON call for weather API
    var weatherType= data.weather[0].description.toLowerCase();
    kTemp = data.main.temp;//kelvn
    var windSpeed = data.wind.speed;
    var city = data.name;//gets the city name from the weather api

    //temperature conversion from Kelvin
      cTemp = (kTemp - 273.15).toFixed(1);
      fTemp = (kTemp * (9/5) - 459.67).toFixed(1);
      windSpeed = (3.6*(windSpeed)).toFixed(1);

    //adding items to HTML
      $("#city").html(city);
      $("#weatherType").html(weatherType);
      $("#cTemp").html(cTemp + " &#8451");
      //function to switch c & f
      $("#cTemp").click(function(){
        if(tempSwap === false){
          $("#cTemp").html(fTemp + " &#8457");
          tempSwap = true;
        }
        else{
          $("#cTemp").html(cTemp + " &#8451");
          tempSwap = false;
        }
      })

      $("#windSpeed").html(windSpeed + " km/h");

    //manipulate css body background images for temp
    if(cTemp > 23){
      $('body').css('background-image','url(http://chromecastbg.alexmeub.com/images/1080_AF1QipNxF4cDXIzm9leM3Jq0d1N6o0ljZDg3fZQ5-2Hx.jpg)');
    }
    else if(cTemp > 15){
      $('body').css('background-image','url(http://chromecastbg.alexmeub.com/images/1080_DX-7114-Edit-Recovered.jpg)');
    }
    else if(cTemp > 10){
      $('body').css('background-image','url(http://chromecastbg.alexmeub.com/images/1080_Rust.jpg)');
      $('#weather-icon').html('<i class="wi wi-day-sunny"></i>');
    }
    else if(cTemp > 5){
      $('body').css('background-image','url(http://chromecastbg.alexmeub.com/images/1080_AF1QipMU0OtS_xfstOuGtznDVEweT6oeSrfp3Ojhw4Fa.jpg)');
    }
    else if(cTemp > 0){
      $('body').css('background-image','url(http://chromecastbg.alexmeub.com/images/1080_AF1QipMU0OtS_xfstOuGtznDVEweT6oeSrfp3Ojhw4Fa.jpg)');
    }
    else{
      $('body').css('background-image','url(http://chromecastbg.alexmeub.com/images/1080_IMGP8440.jpg)');
    }


    // access weather icons depending on description
    if(weatherType.includes('rain')){
      $('#weather-icon').html('<i class="wi wi-day-rain"></i>');

    }
    else if(weatherType.includes('sun')){
      $('#weather-icon').html('<i class="wi wi-day-sunny"></i>');

    }
    else if(weatherType.includes('cloud')){
      $('#weather-icon').html('<i class="wi wi-day-cloudy"></i>');

    }

    }); // end get weather

  }); //end get location

}); //end document ready
