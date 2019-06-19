function continueToEnd() {
  var checkBox = document.getElementById("instructions-checkbox");
  if (localStorage.getItem("commentComplete") === "complete") {
    if (selectedIntervention === 'control'){
      window.location.replace('../pages/post-demographics-moderation.html');
    } else {
      window.location.replace('../pages/post-survey-moderation.html');
    }
    
  } else {
    alert('You must make a comment to continue.');
  }
}

function continueToTask() {
  window.location.replace('../interventions/task-twist.html');
}