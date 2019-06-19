function continueToExercise() {
  var checkBox = document.getElementById("instructions-checkbox");
  
  if (checkBox.checked) {
    window.location.replace('../pages/exercise-moderation.html');
  } else {
    alert('You must check "I have read and understood the project task." to continue.');
  }
  
}