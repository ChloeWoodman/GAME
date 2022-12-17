const postUser2 = () => {
  // Encode data
  let username = document.getElementById("uname").value;
  let password = document.getElementById("psw").value;
  let formData = {name: username, password: password};
  
  let postData = JSON.stringify(formData);
  //console.log(formData);
  //send it out
  let xhr = new XMLHttpRequest();
  
  xhr.open("POST", "/auth", true);
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(postData);
  
  //decode response
  xhr.onload = () => {
    //get server response
    let result = xhr.response;
    console.log("Get response from express:"+ result); // Received text
    let resultObj = JSON.parse(result);
    
    if (resultObj.error) {
      //set contents of an HTML element to server's response
      document.querySelector("#result").innerHTML = "Wrong user name or password, Please try again";
    } else {
      let highScore = resultObj.highscore;
      alert(`Correct user! Highest score is: ${highScore}`);
      window.location.replace("https://game.chloewoodman03.repl.co/game");
    }
  }
}
 //set events 
 const form = document.querySelector("#loginbtn");
 form.addEventListener('click', postUser2);