!function(){function e(e){var t=document.getElementById("myModal");document.querySelector(".modal-content").innerHTML='<img src="'.concat(e,'" alt="Modal Image" />'),t.style.display="block"}document.querySelector(".footer-form").addEventListener("submit",(function(t){t.preventDefault();var o=document.querySelector(".footer-input").value;/\S+@\S+\.\S+/.test(o)?function(t){"elena.gudz1995@gmail.com"===t?localStorage.getItem("registeredEmail")===t?e("/src/images/-1.jpg"):(e("/src/images/+1.jpg"),localStorage.setItem("registeredEmail",t)):console.log("Invalid email")}(o):console.log("Invalid email format")}));var t=document.getElementById("myModal");window.onclick=function(e){e.target===t&&(t.style.display="none")},document.querySelector(".close").addEventListener("click",(function(){t.style.display="none"}))}();
//# sourceMappingURL=index.75109985.js.map
