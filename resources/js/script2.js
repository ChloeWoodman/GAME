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
    xhr.addEventListener("load", function() {
    let result = JSON.parse(xhr.responseText);
    if (result.error) {
      //set contents of an HTML element to server's response
      document.querySelector("#result").innerHTML = "Username already exists. Please try again";
    } else {
      alert("Registered account!");
    }
  });
}

 //set events 
 const form = document.querySelector("#loginbtn");
 form.addEventListener('click', postUser);