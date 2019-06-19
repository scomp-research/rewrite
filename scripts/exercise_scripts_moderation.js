var DOWNVOTE_ON = "../resources/downvote_on.png";
var DOWNVOTE_OFF = "../resources/downvote.png";
var UPVOTE_ON = "../resources/upvote_on.png";
var UPVOTE_OFF = "../resources/upvote.png";
var REPORT_ON = "../resources/flag_on.png";
var REPORT_OFF = "../resources/flag.png"; 

var REPORT_ON_RGB = "rgb(240, 108, 9)";
var REPORT_OFF_RGB = "rgb(155, 155, 155)"; 

var REPLY_COLOR = "#16A085";
var CANCEL_COLOR = "#F06C09";

var STANDARD_USER = "0444"; 
var currentCommentNum = 5; 
var currentReplyNum = 1; 

// Change the variables below to set your task. 
var interventionTask = true; 
var interventionComplete = false; 

var surveyTask = false; 
var surveyComplete = false; 

var surveyTask2 = true; 
var survey2Complete = false; 

var selectedIntervention = null; // The selected intervention will update in the "chooseIntervention" function.
possibleInterventions = ["twist", "remove", "control"];
//];
//possibleInterventions = ["control"];


var SURVEY_FILE_LOCATION = "../surveys/wordunscramblesurvey.html";
var SURVEY_WIDTH = "580px";
var SURVEY_HEIGHT = "470px"; 

var MAX_INTERVENTIONS_ATTEMPTED = 2; //Change this to change number of interventions to attempt.

localStorage.setItem("commentComplete", "not_complete");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function initializeTrial() {
      if (localStorage.getItem('selectedIntervention') === null){
      selectedIntervention = possibleInterventions[Math.floor(Math.random()*possibleInterventions.length)];
      localStorage.setItem('selectedIntervention', selectedIntervention);
      }
      selectedIntervention = localStorage.selectedIntervention;
      getAttemptedInterventions(function (e) {
      chooseIntervention(e.vals[0]); 
      //postToSheet("Chose intervention", "N/A", selectedIntervention); 
      })
      
}

function chooseIntervention(interventionValues) {
  for (var i=0; i<interventionValues.length; i++) {
    if (interventionValues[i] < MAX_INTERVENTIONS_ATTEMPTED) {
      selectedIntervention = possibleInterventions[i];
      localStorage.selectedIntervention = selectedIntervention;

      break;
    }
  }
  upValue(selectedIntervention);
  postToSheet("Chose intervention", "N/A", selectedIntervention); 
  
  setupIntervention(); 
}

function setupIntervention() {
  var intervention = document.getElementById("intervention"); 
  
  if (selectedIntervention === "highpos") {
    intervention.src = "../interventions/captchahighpos.html";
    intervention.style.width = "500px"; 
    intervention.style.height = "580px"; 
  } else if (selectedIntervention === "lowpos") {
    intervention.src = "../interventions/captchalowpos.html";
    intervention.style.width = "500px"; 
    intervention.style.height = "680px";
  } else if (selectedIntervention === "highneg") {
    intervention.src = "../interventions/captchahighneg.html";
    intervention.style.width = "500px"; 
    intervention.style.height = "580px";
  } else if (selectedIntervention === "lowneg") {
    intervention.src = "../interventions/captchalowneg.html";
    intervention.style.width = "500px"; 
    intervention.style.height = "580px";
  } else if (selectedIntervention === "captchalowposbasicinfo") {
    intervention.src = "../interventions/captchalowposbasicinfo.html";
    intervention.style.width = "500px";
    intervention.style.height = "680px";
  } else if (selectedIntervention === "captchalowposfullinfo") {
    intervention.src = "../interventions/captchalowposfullinfo.html";
    intervention.style.width = "500px";
    intervention.style.height = "680px";
  } else if (selectedIntervention === "control") {
    interventionTask = false; 
    surveyTask = false; 
    surveyTask2 = false; 
    return
  }
  interventionTask = false; 
  surveyTask = false; 
  surveyTask2 = false; 
}

function cleanResource(resource) {
  return resource.replace("../resources/", '');
}

function buttonClicked(buttonType, callerObject) { 
  if (buttonType==="downvote") {
    fireDownvote(callerObject); 
  } else if (buttonType==="upvote") {
    fireUpvote(callerObject); 
  } else if (buttonType==="report") {
    fireReport(callerObject); 
  } else if (buttonType==="reply") {
    fireReply(callerObject); 
  } else if (buttonType==="comment-submit") {
    fireComment(callerObject); 
  } else if (buttonType==="reply-submit") {
    fireReplySubmit(callerObject); 
  } else if (buttonType==="enter-comment") {
    fireEnterComment(callerObject);
  }
}

function fireDownvote(callerObject) {
    var elements = callerObject.getElementsByTagName("IMG");
    var elem = elements[0]; 
    var elemID = elem.id; 
    var counterpartID = elemID.replace('downvote', 'upvote'); 
    var counterpartElem = document.getElementById(counterpartID); 
    
    if (elem.src.includes(cleanResource(DOWNVOTE_ON))) {
      elem.src = DOWNVOTE_OFF;
      postToSheet('downvote', elemID, 'OFF'); 
    } else {
      elem.src = DOWNVOTE_ON; 
      counterpartElem.src = UPVOTE_OFF; 
      postToSheet('downvote', elemID, 'ON'); 
      postToSheet('upvote', elemID, 'OFF');
    }
}

function fireUpvote(callerObject) {
    var elements = callerObject.getElementsByTagName("IMG");
    var elem = elements[0]; 
    var elemID = elem.id; 
    var counterpartID = elemID.replace('upvote', 'downvote'); 
    var counterpartElem = document.getElementById(counterpartID); 
    
    if (elem.src.includes(cleanResource(UPVOTE_ON))) {
      elem.src = UPVOTE_OFF;
      postToSheet('upvote', elemID, 'OFF'); 
    } else {
      elem.src = UPVOTE_ON;  
      counterpartElem.src = DOWNVOTE_OFF;
      postToSheet('upvote', elemID, 'ON');
      postToSheet('downvote', elemID, 'OFF'); 
    }
  
    return elemID
}

function fireReport(callerObject) {
    var elements = callerObject.getElementsByTagName("IMG");
    var elem = elements[0]; 
    var elemID = callerObject.id;
  
    if (elem.src.includes(cleanResource(REPORT_ON))) {
      elem.src = REPORT_OFF;
      postToSheet('report', elemID, 'OFF'); 
    } else {
      elem.src = REPORT_ON;  
      postToSheet('report', elemID, 'ON'); 
    }
    
    return elemID
}

function fireReply(callerObject) {
  var elemID = callerObject.id; 
  var counterpartID = elemID.replace('reply-button', 'reply-area'); 
  
  var replyArea = document.getElementById(counterpartID); 
 
  var replyVis = replyArea.style.visibility
  if (replyVis === 'hidden' || replyVis==="") {
    replyArea.style.visibility = 'visible';
    replyArea.style.display = 'flex';
    callerObject.innerHTML = "Cancel";
    callerObject.style.color = CANCEL_COLOR; 
    postToSheet('reply', elemID, 'ON'); 
  } else {
    replyArea.style.visibility = 'hidden'; 
    replyArea.style.display = 'none';
    callerObject.innerHTML = "Reply";
    callerObject.style.color = REPLY_COLOR;
    postToSheet('reply', elemID, 'OFF'); 
  }
    
  return elemID

}

function fireReplySubmit(callerObject) {
  var elemID = callerObject.id; 
  var counterpartID = elemID.replace("reply-submit-button-", "comment");
  var textAreaID = elemID.replace("reply-submit-button", "reply-textarea");
  var counterpartElem = document.getElementById(counterpartID); 
  
  var replyTextArea = document.getElementById(textAreaID);
  var replyText = replyTextArea.value; 
  
  if (isIllegalString(replyText)) {
    return; 
  }
  
  var replyHTML = `
  <div id="replyComNum" class="reply-submission"> 
    <div class="comment-username user-username">User UserNum   <a>(Just now)</a></div>
    <div class="comment-text">ComText</div>
    <div class="comment-interactions secondary-interactions">
      <button id="downvote-button-ComNum" class="response-button" onclick="buttonClicked('downvote', this);"> 
        <img id="downvote-comment-icon-ComNum" class="button-icon" src='../resources/downvote.png'>Downvote</button>
      <button id="upvote-button-ComNum" class="response-button" onclick="buttonClicked('upvote', this);"> 
        <img id="upvote-comment-icon-ComNum" class="button-icon" src='../resources/upvote.png'>Upvote</button>
    </div>
    <div class="comment-spacer"> </div>
  </div>
  `
  
  replyHTML = replyHTML.replace(new RegExp("UserNum", "g"), STANDARD_USER);
  replyHTML = replyHTML.replace(new RegExp("ComNum", "g"), currentReplyNum.toString());
  var date = new Date();

  replyHTML = replyHTML.replace(new RegExp("DateAndTime", "g"), getDate());
  replyHTML = replyHTML.replace(new RegExp("ComText", "g"), replyText); 
  
  // Add Comment
  counterpartElem.innerHTML = counterpartElem.innerHTML + replyHTML; 
  
  postToSheet('reply-submit', elemID, replyText); 
  replyTextArea.value = '';
  
  var replyButtonID = elemID.replace("reply-submit-button", "reply-button"); 
  var replyButton = document.getElementById(replyButtonID); 
  replyButton.innerHTML = "Reply";
  replyButton.style.color = REPLY_COLOR;
  
  fireReply(replyButton); 
  return elemID; 
}

function fireComment(callerObject) {
  
  var commentText = makeComment(); 
  postToSheet('comment-submit', "comment-submit-button", commentText); 

}

function fireEnterComment(callerObject){

  startIntervention(); 

}


function unhideSecondaryInteractions() {
  var elems = document.getElementsByClassName("secondary-interactions"); 

  for (var i=0; i<elems.length; i++) {
    elems[i].style.display = 'block'; 
    elems[i].style.visibility = 'visible';
  }
}

var taskResponse

function taskComment() {
  var taskResponseInput = document.getElementById("comment-textarea-task");
  taskResponse = taskResponseInput.value.trim(); 
  // Check if the comment is legal. 
  if (isIllegalString(taskResponse)) {
    return;
  }
  if (taskResponse === "") {
    alert("Empty comments are not allowed.");
  } else {
    console.log('working');
    parent.postToSheet('task-submit', "task-submit-button", taskResponse); 
    parent.processResponse(taskResponse);
  }

}

window.processResponse = function(taskResponse){
  if (selectedIntervention === 'twist'){
    
    console.log('working!!!');
    interventionComplete = true;
    parent.document.getElementById("intervention").style.display = "none";
    parent.document.getElementById("overlay").style.display = "none";
    var insertText = parent.document.getElementById("twist-response");
    insertText.append(" " + taskResponse);
    console.log(taskResponse)
    //parent.document.getElementById("twist-response").textContent(taskResponse);

    parent.updateComments();
  } else if (selectedIntervention === 'remove'){
    //parent.document.getElementById("moderated-comment").textContent(taskResponse);
    //var insertText = parent.document.getElementById("moderated-comment");
    //insertText.text(taskResponse);
    document.body.innerHTML = document.body.innerHTML.replace('Are you stupid? you have no idea what your talking about. Your actually a fascist and deserve to be called deplorable.', taskResponse);
    parent.document.getElementById("moderated-comment").style.color = "blue";
    parent.document.getElementById("overlay").style.display = "none";
    parent.document.getElementById("intervention").style.display = "none"; 
    interventionComplete = true;
    parent.updateComments();
  }
}


function makeComment() {
  var commentTextArea = document.getElementById("comment-textarea");
  var commentText = commentTextArea.value.trim(); 
  
  // Check if the comment is legal. 
  if (isIllegalString(commentText)) {
    return;
  }
  
  var commentHTML = `
  <div id="commentComNum" class="comment-box user-comment"> 
    <div class="comment-username user-username">User UserNum   <a>(Just now)</a></div>
    <div class="comment-text">ComText</div>
    <div class="comment-interactions secondary-interactions">
      <button id="downvote-button-ComNum" class="response-button" onclick="buttonClicked('downvote', this);"> 
        <img id="downvote-comment-icon-ComNum" class="button-icon" src='../resources/downvote.png'>Downvote</button>
      <button id="upvote-button-ComNum" class="response-button" onclick="buttonClicked('upvote', this);"> 
        <img id="upvote-comment-icon-ComNum" class="button-icon" src='../resources/upvote.png'>Upvote</button>
    </div>
    <div class="comment-spacer"> </div>
  </div>
  `
  
  
  commentHTML = commentHTML.replace(new RegExp("UserNum", "g"), STANDARD_USER);
  commentHTML = commentHTML.replace(new RegExp("ComNum", "g"), currentCommentNum.toString());
  var date = new Date();

  commentHTML = commentHTML.replace(new RegExp("DateAndTime", "g"), getDate());
  commentHTML = commentHTML.replace(new RegExp("ComText", "g"), commentText); 
  
  // Add Comment
  commentSection = document.getElementById("comment-section"); 
  commentSection.innerHTML = commentSection.innerHTML + commentHTML; 
  
  // Increment Comment Number
  currentCommentNum += 1;
  
  // Empty text area
  commentTextArea.value = ""; 
  
  // Show rest of the page; 
  unhideSecondaryInteractions();
  
  localStorage.setItem("commentComplete", "complete");
  document.getElementById("exercise-continue").style.display = "block";

  return commentText
}

// https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i#12409344
function getDate() {
  var today = new Date();
  
  //https://stackoverflow.com/questions/9070604/how-to-convert-datetime-from-the-users-timezone-to-est-in-javascript
  //EST
  offset = -5.0
  utc = today.getTime() + (today.getTimezoneOffset() * 60000);
  serverDate = new Date(utc + (3600000*offset));
  
  return serverDate.toLocaleString([], {day:'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'}).replace(",", "") + " EST";
}

function isEmpty (input) {
  if (input === "") {
    alert("Empty comments are not allowed."); 
    return true;
  }
}

function containsIllegalCharacter (input) {
  if (input.includes("<") || input.includes(">")) {
    alert("Cannot use '<' or '>' characters in your comments!");
    return true; 
  }
}

function isIllegalString(input) {
  if(isEmpty(input) || containsIllegalCharacter(input)) {
    return true; 
  }
}

function checkForIntervention(){
  // Just Survey
  if (surveyTask && !interventionTask) {
    startSurvey(); 
  } else if (interventionTask && !interventionComplete) {
    startIntervention(); 
  } else {
    console.log("No Task supplied"); 
  }
}

function startIntervention() {
  if (selectedIntervention === 'twist'){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("intervention").style.display = "block"; 
    document.getElementById('intervention').src = "../interventions/task-twist.html";
  } else if (selectedIntervention === 'remove') {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("intervention").style.display = "block"; 
    document.getElementById('intervention').src = "../interventions/task-word-removal.html";
  } else if (selectedIntervention === 'control') {
    interventionComplete = true;
    updateComments()
  }  
}



function startSurvey() {
  var intervention = parent.document.getElementById("intervention");
  // Update survey contents...
  intervention.src = SURVEY_FILE_LOCATION; 
  intervention.style.width = SURVEY_WIDTH;
  intervention.style.height = SURVEY_HEIGHT; 
  
  var overlay = document.getElementById("overlay");
  // Show overlay
  overlay.style.display = "block"; 
  intervention.style.display = "block";
  
  postToSheet("begin-survey", "N/A", selectedIntervention);
}

function endIntervention(intervention) {
  postToSheet("end-intervention", "N/A", intervention);
  if (surveyTask) {
    startSurvey(); 
  } else {
    interventionComplete = true;
    parent.document.getElementById("intervention").style.display = "none"; 
    parent.document.getElementById("overlay").style.display = "none"; 
  }
}

window.endSurvey = function(intervention, value) {
  surveyComplete = true;
  postToSheet("end-survey", intervention, JSON.stringify(value));
  
  setTimeout(function() {
    window.location.replace('../pages/post-exercise.html');
  }, 50);
  
}

window.validateIntervention = function(intervention, value) {
  postToSheet("validate-intervention", "N/A", JSON.stringify(value));
  
  setTimeout(function () {
    interventionComplete = true;
    endIntervention(intervention); 
  }, 50); 
}


function updateComments(){
  if (interventionComplete === true){
    document.getElementById("enter-comment").style.display = "none";
    document.getElementById("comment-display").style.display = "block";
  }
}


