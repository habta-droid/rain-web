
import  { Schedule, RainPredictor } from "./rain_class.js"



// class Schedule {
//     constructor(action, time) {
//     this.list_map = new Map();
//     this.list_map.set(action, time);
//     }
    
//     add(new_action, new_time) {
//     this.list_map.set(new_action, new_time);
//     }
    
//     remove(removed_action) {
//     this.list_map.delete(removed_action);
//     }

//     view() {
//         for (const [key, value] of this.list_map) {
//           console.log(`${key}: ${value}`);
//         }   
//     }
// }

let plan = new Schedule("study", 30);
plan.add("project", 20);
plan.remove("project");
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


const rain_form = document.getElementById("rain_form");
let store = document.getElementById("rain_time");

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
      };
      
      const predictor = new RainPredictor();
      const p1 = predictor.update(rain_status);
      const { confidence } = p1;
      console.log(predictor.getMedianETA());
      const time_to_rain = predictor.getMedianETA();


    store.innerHTML = `<h5>approximate time to rain in : ${time_to_rain} minutes</h5>
                   <h5>description: ${data.weather[0].description}</h5>`;
      console.log(rain_status);
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