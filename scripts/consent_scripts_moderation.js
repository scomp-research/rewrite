function continueToTask() {
  var ageElem = document.getElementById("age-consent-yes");
  var readElem = document.getElementById("read-consent-yes");
  var participateElem = document.getElementById("participate-consent-yes");
  
  if (ageElem.checked && readElem.checked && participateElem.checked) {
    window.location.replace('pages/pre-exercise-moderation.html');
  } else {
    alert("You must check 'Yes' in all three boxes above to proceed. If you do not meet these conditions, please exit this task now.");
  }
  
}