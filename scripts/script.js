var currentDayTag = document.getElementById("currentDay");
var currentMoment = moment().format("dddd, MMMM Do");
currentDayTag.innerText = currentMoment;