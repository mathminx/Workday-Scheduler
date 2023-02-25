// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  refreshTimeSlots();
  getEvents();

  //Save button with listener. When clicked, the user input is saved in  
  //local storage using the id in the containing time-block as the key.
  $(".saveBtn").on("click", saveEvents);
  
  function saveEvents() {
    var savedEvents = JSON.parse(localStorage.getItem("myEvents"));
    var eventsArray = [];
    if (savedEvents !== null) {
      eventsArray = savedEvents;
    }
    var newEvent = {"ID": dayjs().valueOf(), "Time": $(this).parent().attr("id"), "Event": $(this).siblings(".description").val()};
    eventsArray.push(newEvent);
    localStorage.setItem("myEvents", JSON.stringify(eventsArray));
  }
  
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
 
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
});