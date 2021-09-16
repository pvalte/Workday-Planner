var list = JSON.parse(localStorage.getItem('plannarAppts')) || [];

//WHEN I open the planner THEN the current day is displayed at the top of the calendar
var todaysDate = moment();
$('#currentDay').append(todaysDate.format('dddd, MMM Do'));

//Each timeblock is color coded to indicate whether it is in the past, present, or future
var colorCoder = function() {
  var hours = $('.hour');
  var descriptions = $('.description');
  for(var i = 0; i < hours.length; i++) {
      var hourName = hours[i].textContent;
      var convertedHour = moment(hourName, ["hA"]).format("HH");
      var currentHour = moment(todaysDate).format("HH");
      var hourDiff = currentHour - convertedHour;

    if (hourDiff > 0) {
      descriptions[i].className += ' past';
    } else if (hourDiff === 0) {
      descriptions[i].className += ' present';
    } else {
      descriptions[i].className += ' future';
    }
  }
};

//WHEN I click the save button for that timeblock THEN the text for that event is saved in local storage
$('.saveBtn').on('click', function () {
  // get nearby values
  var value = $(this)
    .siblings('textarea')
    .val();
  var time = $(this)
    .parent()
    .attr('id');

  localStorage.setItem(time, value);
})

//TO DO: WHEN I refresh the page THEN the saved events persist
function renderAppointments() {
  //get data from local storage
  var timeBlocks = $('.time-block'); 
  var textAreas = $('textarea');
  console.log(timeBlocks);
  console.log(textAreas);

  for(var i = 0; i < timeBlocks.length; i++) {
    var timeId = timeBlocks[i].id;
    var value = localStorage.getItem(timeId);
    
    if (value) {
      textAreas[i].textContent = value;
    }
  }
}

// render our to-dos on page load
renderAppointments();
colorCoder();