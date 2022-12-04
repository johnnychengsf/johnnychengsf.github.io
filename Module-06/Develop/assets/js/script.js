const APIKey = "6a98b38377919f5ea5d35e522b9642c6";
const iconPath = "http://openweathermap.org/img/w/";
var city = "";
var lat = 0;
var lon = 0;

$(document).ready(function(){
    loadCities();
    var info = initCity();
    if (info.length > 0) {
        var geo = info.match(/:(.*)/i)[1].split(",");
        getWeather(info.match(/.+?(?=:)/), geo[0],geo[1]);
    }
    $("#btnSearch").click(function(){

        city = $("#city").val();
        $("#city").val("");
        if (city == "---") {
            localStorage.clear();
            $("#historalGroup").html("");
            $("#forecast").html("");

            $("#weather-City-Date").html("");
            $("#weather-temp").html("");
            $("#weather-wind").html("");
            $("#weather-humidity").html("");
        } else {
            var API = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;
            fetch(API)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                if (data.length > 0) {
                    localStorage.setItem(data[0].name, data[0].lat + "," + data[0].lon);
                    $("#historalGroup").html("");
                    loadCities();
                    getWeather(data[0].name, data[0].lat, data[0].lon);
                }
            });
         }
      });

    $(document).on("click", ".btnHistrical", function() {
        getWeather($(this).html(), $(this).attr("data-lat"), $(this).attr("data-lon"));
    });
    /*
      $(".btnHistrical").click(function() {
            getWeather($(this).html(), $(this).attr("data-lat"), $(this).attr("data-lon"));
      });
      */
});

function initCity() {
    var cities = allStorage();
    if (cities.length > 0) {
        return cities[0];
    }
    return Array();
}
function loadCities() {
    var cities = allStorage();
    for(var i = 0; i < cities.length;i++){
        histricalAdd(cities[i]);
    } 
}
function getWeather(city, lat, lon) {
    var API = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&daily=4&appid=${APIKey}&exclude=minutely,hourly&units=imperial`;
    fetch(API)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        console.log("getWeather");
        console.log(data);
        console.log(city);

        var timeStamp = data.current.dt * 1000;
        console.log(timeStamp);
        var dateFormat = new Date(timeStamp);
        var current_date = (dateFormat.getMonth()+1) +
            "/" + dateFormat.getDate() +
            "/" + dateFormat.getFullYear();

        var icon = data.current.weather[0].icon;
        $("#weather-City-Date").html(city + " (" + current_date + ") <img src='http://openweathermap.org/img/wn/" + icon + ".png'>");
        $("#weather-temp").html("Temp:&nbsp;" + data.current.temp + "&#8457");
        $("#weather-wind").html("Wind:&nbsp;" + data.current.wind_speed + "&nbsp;MPH");
        $("#weather-humidity").html("Humidity:&nbsp;" + data.current.humidity +"&nbsp;%");
        var html = "";
        var daily = data.daily.slice(1,6);
        for (var i = 0; i < daily.length; i++) {
            forecastdata = daily[i];
            var timeStamp = forecastdata.dt * 1000;

            var dateFormat = new Date(timeStamp);
            var current_date = (dateFormat.getMonth()+1) +
                "/" + dateFormat.getDate() +
                "/" + dateFormat.getFullYear();
            var icon = forecastdata.weather[0].icon;

            html += '<div class="forecastCard d-flex flex-column justify-content-around">';
            html += '<div class="forecastCardItem"><span style="padding-left: 5px;font-size: 24px;font-weight: bolder;color:#ffffff">' + current_date + '</span></div>';
            html += '<div class="forecastCardItem"><span class="forecastCardText"><img src="http://openweathermap.org/img/wn/' + icon + '.png"></span></div>';
            html += '<div class="forecastCardItem"><span class="forecastCardText">Temp: ' + forecastdata.temp.eve + '&#8457</span></div>';
            html += '<div class="forecastCardItem"><span class="forecastCardText">Wind: ' +forecastdata.wind_speed+ '&nbsp;MPH</span></div>';
            html += '<div class="forecastCardItem"><span class="forecastCardText">Humidity: '+ forecastdata.humidity+ '&nbsp;%</span></div>';
            html += '</div>';
        }
        $("#forecast").html(html);
    });
}

function histricalAdd(info) {
    var geo = info.match(/:(.*)/i)[1].split(",");
    $("#historalGroup").append('<div class="p-2"><button data-lat="' + geo[0] + '" data-lon="' + geo[1] + '" class="btnHistrical">' + info.match(/.+?(?=:)/) + '</button></div>');
}

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push( keys[i] + ":" + localStorage.getItem(keys[i]) );
    }
    return values;
}