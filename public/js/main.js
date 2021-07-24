const submitBtn = document.getElementById('submitBtn');

const cityName = document.getElementById('cityName');

const city_name = document.getElementById('city_name');

 let weatherIcon = document.getElementById('weatherIcon');

const temp_real_val = document.getElementById('temp_real_value');

const dataHide = document.querySelector('.middle_layer');


 const getCurrentDay = () => {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        let currentTime = new Date();
         days = weekday[currentTime.getDay()];
let day = document.getElementById('day');
day.innerText = days;
      };

getCurrentDay();



const getCurrentTime = () => {

        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

        var now = new Date();
        var month = months[now.getMonth()];
        var date = now.getDate();


        let hours = now.getHours();
        let mins = now.getMinutes();

        let periods = 'AM';

        if (hours > 11) {
          periods = "PM";
          if (hours > 12) hours -= 12;
        }

        if (mins < 10) {
          mins = '0' + mins;
        }
        let todayDate = document.getElementById('today_date');
today_date.innerText = `${month} ${date} | ${hours}:${mins}/${periods}`;
      };
getCurrentTime();




const getInfo = async(event) => {
    event.preventDefault();
let cityVal = cityName.value;
if(cityVal == "") {
city_name.innerText = `Please Write The Name Before Search`;

dataHide.classList.add('data_hide');



}else{
try{
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=8a13df165f9099bdd3008e66764b2a56`;
const response = await fetch(url);
const data = await response.json();
const arrData = [data];

city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
temp_real_val.innerText = arrData[0].main.temp;

let tempStatus = arrData[0].weather[0].main;

 if (tempStatus == 'Sunny') {
        weatherIcon.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
      }
      else if (tempStatus == 'Clouds') {
        weatherIcon.innerHTML = "<i class='fas fa-cloud' style='color: #a4b0be;'></i>"
      }
      else if (tempStatus == 'Rainy') {
        weatherIcon.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>"
      }
       else if (tempStatus == 'Haze') {
        weatherIcon.innerHTML = "<i class='fas fa-cloud-cloud' style='color: #a4b0be;'></i>"
      }
      else {
        weatherIcon.innerHTML = "<i class='fas fa-cloud' style='color: #44c3de'></i>"
      }

dataHide.classList.remove('data_hide');


}catch{
    city_name.innerText = `Please Enter The City Name Properly`;
    dataHide.classList.add('data_hide');
}
}
}

submitBtn.addEventListener('click', getInfo);

