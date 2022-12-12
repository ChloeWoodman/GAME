const postUser2=()=>{

  //encode data
  let username = document.getElementById("uname").value;
  let password = document.getElementById("psw").value;
  let formData = {name: username, pass: password};

  //console.log(formData);

  //data
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/post", true);
  xhr.setRequestHeader('Content-type', 'application/json')
  
  //decode response
  xhr.onload = () => {
    let result= xhr.response;
    console.log("Get response from express:"+ result); // Received text
    let resultObj = JSON.parse(result);
    if(resultObj.error){
      document.querySelector("#result").innerHTML = "Wrong user name and password, Please try again";
    }else{
      alert("correct user!");
      window.location.replace("https://game.chloewoodman03.repl.co/score");
    } 
  }
}
 //set events 
 const form = document.querySelector("#loginbtn");
 form.addEventListener('click', postUser2);