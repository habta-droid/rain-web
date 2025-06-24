import {
  Schedule,
  RainPredictor,
  Location,
  haversineDistance,
} from "./rain_class.js";



let place = new Location("sample", 34, 32);
let plan = new Schedule("study",0);

// place.view_place()
plan.view()

const task_button = document.getElementById("schedule_button");
const list_button = document.getElementById("list_button");
const schedule = document.querySelector(".task_wrapper");
const list = document.querySelector(".list_wrapper");
 

task_button.addEventListener("click", () => {
    schedule.classList.add("d-none");
    list.classList.remove("d-none");
})

list_button.addEventListener("click", () => {
    schedule.classList.remove("d-none");
    list.classList.add("d-none");
})

const location_button = document.getElementById("loc_location_bty");
const lo_list_button = document.getElementById("lo_list_button");
const location_wrapper = document.querySelector(".location_wrapper");
const lo_list_wrapper = document.querySelector(".lo_list_wrapper");

lo_list_button.addEventListener("click", () => {
  lo_list_wrapper.classList.add("d-none");
  location_wrapper.classList.remove("d-none");
});

location_button.addEventListener("click", () => {
  lo_list_wrapper.classList.remove("d-none");
  location_wrapper.classList.add("d-none");
});


const loct_latitude_one = document.getElementById("loct_latitude_one");
const loct_longtude_one = document.getElementById("loct_longtude_one");
const space_one = document.getElementById("space_one");

const space_two = document.getElementById("space_two");
const loct_latitude_two = document.getElementById("loct_latitude_two");
const loct_longtude_two = document.getElementById("loct_longtude_two");


const lo_first_form = document.getElementById("lo_first_form");
const lo_second_form = document.getElementById("lo_second_form");

lo_first_form.addEventListener("submit", first_location);
lo_second_form.addEventListener("submit", second_location);

function first_location(e) {
  e.preventDefault();
  place.add_place(
    space_one.value.trim(),
    Number(loct_latitude_one.value),
    Number(loct_longtude_one.value)
  );
}

function second_location(e) {
  e.preventDefault();
  place.add_place(
    space_two.value.trim(),
    Number(loct_latitude_two.value),
    Number(loct_longtude_two.value)
  );
}

const cal_distance = document.getElementById("cal_distance");
const distance_answer = document.getElementById("distance_answer");
cal_distance.addEventListener("click", calculate_distance);

let travel = []

function calculate_distance(e) {
  e.preventDefault();

  let allKeys = Array.from(place.list_map.keys());
  if (allKeys.length < 2) {
    distance_answer.innerText = "Need two locations to calculate distance.";
    return;
  }
  // for (const [key, value] of place.list_map) {
  //   console.log(`${key}: ${value}`);
  // }  


  let lastTwoKeys = allKeys.slice(-2);
  let location_two_key = lastTwoKeys[0];
  let location_one_key = lastTwoKeys[1];
  console.log(location_one_key);
  console.log(location_two_key);


  let loco_one=place.list_map.get(location_one_key);
  let loco_two = place.list_map.get(location_two_key);
  let one_latitude = loco_one.latitude;
  let one_longitude = loco_one.longitude;
  let two_latitude = loco_two.latitude;
  let two_longitude = loco_two.longitude;
  let t_distance = haversineDistance(one_latitude, one_longitude, two_latitude, two_longitude, "km");
  let avg_speed = 30;
  let time_travel_hour = t_distance / avg_speed;
  let time_travel_minute = Math.round(time_travel_hour * 60);
  travel.push(time_travel_minute);
  console.log(travel);
  distance_answer.innerHTML = `<div>total distance: ${t_distance.toFixed(0)} km</div>
                                <div>time traveling: ${time_travel_minute} minutes </div>`;

}


const form_one = document.getElementById("first_form");
const form_two = document.getElementById("second_form");
const form_three = document.getElementById("third_form");
const form_four = document.getElementById("fourth_form");

const check_one = document.getElementById("check_one");
const action_one = document.getElementById("action_one");
const time_one = document.getElementById("time_one");
const submit_one = document.getElementById("submit_one");
const reset_one = document.getElementById("reset_one");

form_one.addEventListener("submit", (e) => {
    e.preventDefault();

    const action = action_one.value.trim();
    const time = time_one.value.trim();
    if (!action || !time) {
      alert("fill both fields");
      return;
    }

    plan.add(action, time);
    plan.view();
    
    // console.log("ACTION:", action);
    // console.log("TIME:", time); 
});

reset_one.addEventListener("click", () => {
    const action = action_one.value.trim();
    plan.remove(action);
})

// const distKm  = haversineDistance(9.03, 38.74, 9.00, 38.76, 'km');
// const distM   = haversineDistance(9.03, 38.74, 9.00, 38.76, 'm');
// const distMi  = haversineDistance(9.03, 38.74, 9.00, 38.76, 'mi');

// console.log(`Distance ≈ ${distKm.toFixed(2)} km`);
// console.log(`Distance ≈ ${distM.toFixed(0)} m`);
// console.log(`Distance ≈ ${distMi.toFixed(2)} mi`);


check_one.addEventListener("change", () => {
    action_one.style.textDecoration = check_one.checked ?
        "line-through" : "none";
        const action = action_one.value.trim();
    plan.remove(action);
});


const check_two = document.getElementById("check_two");
const action_two = document.getElementById("action_two");
const time_two = document.getElementById("time_two");
const submit_two = document.getElementById("submit_two");
const reset_two = document.getElementById("reset_two");

form_two.addEventListener("submit", (e) => {
    e.preventDefault();
    const action = action_two.value.trim();
    const time = time_two.value.trim();
    if (!action || !time) {
      alert("fill both fields");
      return;
    }

    plan.add(action, time);
    plan.view();

    // console.log("ACTION:", action);
    // console.log("TIME:", time);

})

reset_two.addEventListener("click", () => {
  const action = action_two.value.trim();
  plan.remove(action);
});

check_two.addEventListener("change", () => {
  action_two.style.textDecoration = check_two.checked ? "line-through" : "none";
  const action = action_two.value.trim();
  plan.remove(action);
});


const check_three = document.getElementById("check_three");
const action_three = document.getElementById("action_three");
const time_three = document.getElementById("time_three");
const submit_three = document.getElementById("submit_three");
const reset_three = document.getElementById("reset_three");

form_three.addEventListener("submit", (e) => {
    e.preventDefault();

    const action = action_three.value.trim();
    const time = time_three.value.trim();
    if (!action || !time) {
      alert("fill both fields");
      return;
    }

    plan.add(action,time);
    plan.view();

});

reset_three.addEventListener("click", () => {
  const action = action_three.value.trim();
  plan.remove(action);
});

check_three.addEventListener("change", () => {
  action_three.style.textDecoration = check_three.checked ? "line-through" : "none";
  const action = action_three.value.trim();
  plan.remove(action);
});


const check_four = document.getElementById("check_four");
const action_four = document.getElementById("action_four");
const time_four = document.getElementById("time_four");
const submit_four = document.getElementById("submit_four");
const reset_four = document.getElementById("reset_four");

form_four.addEventListener("submit", (e) => {
    e.preventDefault();
    const action = action_four.value.trim();
    const time = time_four.value.trim();
    if (!action || !time) {
      alert("fill both fields");
      return;
    }

    plan.add(action, time);
    plan.view();

    // console.log("ACTION:", action);
    // console.log("TIME:", time);

});


reset_four.addEventListener("click", () => {
  const action = action_four.value.trim();
  plan.remove(action);
});

check_four.addEventListener("change", () => {
  action_four.style.textDecoration = check_four.checked ? "line-through" : "none";
  const action = action_four.value.trim();
  plan.remove(action);
});

const todo_time = document.getElementById("todo_time");
let schedule_time = [];

function sum_schedule_time(e) {
  e.preventDefault();
  let sum=0
  for (const value of plan.list_map.values()) {
    sum += Number(value);
  } 

  schedule_time.push(sum);
  todo_time.innerHTML=`<div>Time Needed ${sum} minutes</div> `
  
}


const to_do_time = document.getElementById("to_do_time");
to_do_time.addEventListener("click", sum_schedule_time);


// rain form
const rain_form = document.getElementById("rain_form");
let store = document.getElementById("rain_time");

let rain = [];

function get_weather(e) {
  e.preventDefault();
  const user_location = document.getElementById("user_location");
  const city_name = user_location.value.trim();

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=9af8bc1b6986edcd1edf0598f4a26dd8&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      let rain_status = {
        clouds_all: data.clouds.all,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind_speed: data.wind.speed,
        temp_max: data.main.temp_max,
        temp: data.main.temp,
      };

      const predictor = new RainPredictor();
      const p1 = predictor.update(rain_status);
      console.log(p1);
      console.log(predictor.getMedianETA());
      let time_to_rain = predictor.getMedianETA();
      rain.push(time_to_rain);
      store.innerHTML = `<h5>approximate time to rain in : ${time_to_rain} minutes</h5>
                   <h5>description: ${data.weather[0].description}</h5>`;
      console.log(rain_status);
      console.log(rain);
    })
    .catch((err) => {
      store.innerHTML = "<h5>could't find the  city,try again</h5>";
      console.log(err);
    });
}



rain_form.addEventListener("submit", get_weather);


const rain_btn = document.querySelector(".rain_button");
const rain_time_wrapper = document.querySelector(".rain_time_wrapper");
const return_rain_home = document.querySelector(".return_rain_home");
const rain_wrapper = document.querySelector(".rain_wrapper");

function show_rain(e) {
  e.preventDefault();
  rain_wrapper.classList.add("d-none");
  rain_time_wrapper.classList.remove("d-none");
}

rain_btn.addEventListener("click", show_rain);

function show_rain_home(e) {
  e.preventDefault();
  rain_wrapper.classList.remove("d-none");
  rain_time_wrapper.classList.add("d-none");
}

return_rain_home.addEventListener("click", show_rain_home);

const explain_box = document.querySelector(".explain_box");
const summerize_button = document.getElementById("summerize_button");
const end_result = document.getElementById("end_result");


function summerize(e) {

  e.preventDefault();
  end_result.classList.remove("d-none");
  explain_box.classList.add("d-none");

 
  if (rain.length === 0 || travel.length === 0 || plan.list_map.size === 0 || place.list_map.size < 2) {
    end_result.innerHTML = `<h3>there are forms that have not been filled.please fill out all requirments</h3>`;
    return; 
  }

  let time_schedule_arr = [];
  for (const value of plan.list_map.values()) {
    time_schedule_arr.push(value);
  }
  let action_schedule_arr = [];
  for (const key of plan.list_map.keys()) {
    action_schedule_arr.push(key);
  }
  let spot_picked = [];
  for (const key of place.list_map.keys()) {
    spot_picked.push(key);
  }
  let true_num_Array = time_schedule_arr.map(Number);
  let t_length = true_num_Array.length - 1;
  let time_sum = [];
  for (let i = t_length; i >= 0; i--) {
    let partialSum = true_num_Array
      .slice(0, i + 1)
      .reduce((sum, current) => sum + current, 0);
    time_sum.push(partialSum);
    
    console.log(partialSum);
  }
  console.log("answer", time_sum);
  console.log(travel[0]);
  console.log(rain[0]);
  console.log(spot_picked)
  
  if (travel[0] > rain[0]) {
    if (spot_picked.length >= 3) {
      end_result.innerHTML = `you don't have enough time to get to ${spot_picked[2]} ,pick umbrella and head out now`;
    } else {
      end_result.innerHTML = `you don't have enough time to get to destinations, pick umbrella and head out now.`;
    }
  }

  if (travel[0] + time_sum[0] <= rain[0]) {
    end_result.innerHTML = `relax,you have got enough time to do all your chores`;
  } else if (travel[0] + time_sum[1] <= rain[0]) {
    end_result.innerHTML = `you have only got time to do 3 actions. ${action_schedule_arr[0]},${action_schedule_arr[1]} and ${action_schedule_arr[2]}`;
  } else if (travel[0] + time_sum[2] <= rain[0]) {
    end_result.innerHTML = `you have only got time to do 2 things. ${action_schedule_arr[0]} and ${action_schedule_arr[1]}`;
  } else if (travel[0] + time_sum[3] <= rain[0]) {
    end_result.innerHTML = `you have only got time to do 1 thing. ${action_schedule_arr[0]}`;
  } else {
    end_result.innerHTML = `you have barely enough time to get to ${spot_picked[2]}`;
  }
}

summerize_button.addEventListener("click", summerize)

const getStartedBtn = document.querySelector('.header_button');
const headerSlide = document.querySelector('header.top.slide');
const rainSlide = document.querySelector('section.rain_status.slide');

getStartedBtn.addEventListener('click', () => {
  headerSlide.classList.add('d-none');
  rainSlide.classList.remove('d-none');
  setTimeout(() => {
    headerSlide.classList.remove("d-none");
  }, 1000);

});

