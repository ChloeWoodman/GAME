const postUser=()=>{
  
  //encode data
  let username = document.getElementById("runame").value;
  let password = document.getElementById("rpsw").value;
  let formData = {name: username, pass: password};

  let postData = JSON.stringify(formData);
  console.log(formData);
    // send data using XHR
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/save", true);
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(postData);

    //decode response
    /*xhr.onload = () => {
      let result= xhr.response;
      console.log("Get response from express:"+ result); // Received text
      let resultObj = JSON.parse(result);
      if(resultObj.error){
        document.querySelector("#result").innerHTML = "Wrong user name and password, Please try again";
      }else{
        alert("correct user!");
        window.location.replace("https://game.chloewoodman03.repl.co/score");
        //window.location.replace("http://www.w3schools.com");
      
      }
      
    }*/
}
 

 //set events 
 const form = document.querySelector("#loginbtn");
 form.addEventListener('click', postUser);