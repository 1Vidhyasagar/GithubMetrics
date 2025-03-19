document.addEventListener("DOMContentLoaded", function(){

  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");


  searchButton.addEventListener('click', function(){
    const username = usernameInput.value;
    console.log("Username :", username )
  })

})