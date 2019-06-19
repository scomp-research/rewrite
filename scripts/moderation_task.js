success = [1,2,3,4,5,6,7,8,9]; // Positions of objects that are okay to select.
selected = []; // Positions of objects that are selected at time of validation.

function validation() {
  $('.captcha-cell').each(function(i, cell) {
    if (cell.classList.contains("selected")) {
      selected.push(i+1); 
    }
  });
  
  var fail = false; 
  selected.forEach(function(i) {
    if (!success.includes(i)) {
      fail = true; 
    }  
  }); 

  if (fail) {
    alert("Please select images that contain people."); 
    selected = []; 
  } else {
    parent.validateIntervention("faces-LowNeg", selected); 
  }
}



function initialize() {
  $('.captcha-cell').click(function () {
    var icon = $(this).find(".marked-icon");
    
    if (icon.css("display")==="block") {
      icon.css("display", "none");
      $(this).removeClass("selected"); 
    } else {
      icon.css("display", "block");
      $(this).addClass("selected"); 
    }
  });
}


$(document).ready(function() {
    initialize(); 
});


function continueToDiscussion() {

  if ($('.reply-textarea').text == null) {
    alert("Please enter a response"); 
    selected = []; 
  } else {
    window.location.replace('../pages/exercise-moderation.html'); 
  } 
}





