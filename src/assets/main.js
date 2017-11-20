let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' || attempt.value === '') {
      setHiddenFields();
    }

    //Using a return will stop the function and return undefined.
    if (!validateInput(input.value)) return;
    else attempt.value ++;

    if (getResults(input.value)) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else if (attempt.value >=10) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
   answer.value = Math.floor(Math.random() * 10000).toString();
   while (answer.value.length < 4) {
     answer.value = "0" + answer.value;
   }
   attempt.value = 0;
}

function setMessage(msg) {
  document.getElementById('message').innerHTML = msg;
}

function validateInput(el) {
  if (el.length === 4) {
    return true;
  } else {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}

function getResults(input) {
  let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  let i = 0;
  while (i < input.length) {
    if (input.charAt(i) === answer.value.charAt(i)) {
      html += '<span class="glyphicon glyphicon-ok"></span>';
    } else if (answer.value.indexOf(input.charAt(i)) !== -1) {
      html += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      html += '<span class="glyphicon glyphicon-remove"></span>';
    }
    i++;
  } // end while
  html += '</div></div>';
  document.getElementById('results').innerHTML = html;

  /*it would suffice to check if strings are equal rather than
  find count of characters the user got correctly */
  if (input === answer.value) return true;
  else return false;
}

function showAnswer(success) {
  let target = document.getElementById('code');
  target.innerHTML = answer.value;
  if (success) target.className += " success";
  else target.className += " failure";
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
 }
