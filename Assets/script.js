// All code that interacts with the DOM wrapped in a call to jQuery 
// to ensure that the code isn't run until the browser has finished 
// rendering all the elements in the html.

$(function () {
  refreshTimeSlots();
  getEvents();

  //Save button with listener; when clicked, user input is saved in  
  //local storage using the id in the containing time-block as the 
  //first value in the object. The object also contains a unix timestamp 
  //to make each saved item unique.
  $(".saveBtn").on("click", saveEvents);
  
  function saveEvents() {
    var savedEvents = JSON.parse(localStorage.getItem("myEvents"));
    var eventsArray = [];
    if (savedEvents !== null) {
      eventsArray = savedEvents;
    }
    var newEvent = {"Time": $(this).parent().attr("id"), "Event": $(this).siblings(".description").val(), "ID": dayjs().valueOf()};
    eventsArray.push(newEvent);
    localStorage.setItem("myEvents", JSON.stringify(eventsArray));
  }
  
  // Retrieve any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  function getEvents() {
  var savedEvents = JSON.parse(localStorage.getItem("myEvents"));
  $(savedEvents).each(function() {
    var thisId = ("#" + this.Time)
    $(thisId).children(".description").val(this.Event);
    });
  }

  // Display the current date in the header of the page.
  $("#currentDay").html(dayjs().format("dddd, MMMM DD"));

  //Sets a 60-second interval for refreshing the time slot colours.
  //This ensures that the colours are always up to date.
  setInterval(refreshTimeSlots, 60000);

  // Apply the past, present, or future class to each time block by comparing
  // block by comparing the id to the current hour.
  function refreshTimeSlots() {
    $(".time-block").each(function() {
      var $currentHour = dayjs().hour();
      var $timeBlockHour = $(this).attr("id").substring(5);
      if ($timeBlockHour < $currentHour) {
        $(this).attr("class", "row time-block past");
      }
      else if ($timeBlockHour == $currentHour) {
        $(this).attr("class", "row time-block present");
      }
      else {
        $(this).attr("class", "row time-block future");
      }
    });
  }

});