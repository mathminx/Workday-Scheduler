// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  

  // Display the current date in the header of the page.
  var now = dayjs().format("dddd, MMMM DD");
  var timeNow = dayjs().format("HH:mm");
  var hour9 = dayjs().hour(9).minute(0).second(0);
  
  // Apply the past, present, or future class to each time block by comparing
  // block by comparing the id to the current hour. 
  for (timeSlot = 13; timeSlot <= 15; timeSlot++) {
    //Check if current time slot is in the past
    if ((dayjs().hour(timeSlot).minute(59).second(59)).isBefore(dayjs())) {
      var idName = "hour-" + timeSlot;
      var element = document.getElementById(idName);
      element.classList = "row time-block past";
    }
    //Check if current time slot is in the present
    else if ((dayjs().hour(timeSlot).minute(59).second(59)).isAfter(dayjs()) && 
    (dayjs().hour(timeSlot).minute(0).second(0)).isBefore(dayjs())) {
      var idName = "hour-" + timeSlot;
      var element = document.getElementById(idName);
      element.classList = "row time-block present";
    }
    //Check if current time slot is in the future
    else if ((dayjs().hour(timeSlot).minute(59).second(59)).isAfter(dayjs())) {
      var idName = "hour-" + timeSlot;
      var element = document.getElementById(idName);
      element.classList = "row time-block future";
    }
  }
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?