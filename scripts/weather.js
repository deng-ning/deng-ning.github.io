const newCity = document.querySelector('#newCity');
const currentCity = document.querySelector('#currentCity');
const btn = document.querySelector('#btn-hero');
const whose = document.querySelector('#whose');
const temperature = document.querySelector('#temperature');
const time = document.querySelector('#time');
const weather = document.querySelector('#weather');

btn.addEventListener('click', function(){
    currentCity.textContent = newCity.value;
    console.log(whose.textContent);
    if (!currentCity.textContent.includes('Tucson')) {
        whose.textContent = "Your";
    } else {
        whose.textContent = "My";
    }
    fetch('http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationKey=346936&apikey=qG5TAKJCAWfy6ZAQ49w8Vz0wBmLvTPi7')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        weather.textContent = json[0].WeatherText;
        let value = json[0].Temperature.Metric.Value;
        let unit = json[0].Temperature.Metric.Unit;
        temperature.textContent = value + "˚" + unit;
        let datetime = json[0].LocalObservationDateTime;
        time.textContent = datetime.substring(11, 19) + " " + datetime.substring(0, 10);
    });
});