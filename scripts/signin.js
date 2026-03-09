// logout button
// document.getElementById("signout-btn").addEventListener("click", function () {
//   console.log("logout btn added");
// });
// document.getElementById("signout-btn").addEventListener("click", function () {
//   document.getElementById("main-section").classList.add("hidden");
//   document.getElementById("header-section").classList.remove("hidden");
// });
document.getElementById("signin-btn").addEventListener("click", function () {
  console.log("signin button clicked");
  const userNumber = document.getElementById("user-number");
  const userNumberValue = userNumber.value;
  const passwordNumber = document.getElementById("password-number");
  const passwordNumberValue = passwordNumber.value;
  console.log(userNumberValue, passwordNumberValue);
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  if (userNumberValue === "admin" && passwordNumberValue === "admin123") {
    alert("Signin Successful");
    modalTitle.innerText = "Wow!!! Excellent";
    modalDescription.innerText = "Signin successful";
    document.getElementById("login-modal").showModal();
    document.getElementById("header-section").classList.add("hidden");
    document.getElementById("main-section").classList.remove("hidden");
  } else {
    modalTitle.innerText = "ERROR!!! ";
    modalDescription.innerText = "Signin failed";
    // alert("Signin Failed");
    document.getElementById("login-modal").showModal();
    return;
  }
});

function signout() {
  // dashboard hide
  document.getElementById("main-section").classList.add("hidden");

  // login show
  document.getElementById("login-section").classList.remove("hidden");
}


