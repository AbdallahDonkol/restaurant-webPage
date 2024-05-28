//*================== open and close side menu function ====================================*//
let leftSideWidth = $(".leftSide").innerWidth();
$(".open-close-icon").click(function () {
  let { left: asideOffset } = $("aside").offset();
  if ($(this).hasClass("rotation-clockwise")) {
    $(this).removeClass("rotation-clockwise").addClass("rotation-anticlockwise");
  } else {
    $(this).removeClass("rotation-anticlockwise").addClass("rotation-clockwise");
  }
  if (asideOffset < 0) {
    openSidebar();
  } else {
    closeSidebar();
  }
});
function openSidebar() {
  $("aside").animate({ left: 0 }, 500);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  $("aside .leftSide li").eq(0).animate({ top: 0 }, 500);
  $("aside .leftSide li").eq(1).animate({ top: 0 }, 600);
  $("aside .leftSide li").eq(2).animate({ top: 0 }, 700);
  $("aside .leftSide li").eq(3).animate({ top: 0 }, 800);
  $("aside .leftSide li").eq(4).animate({ top: 0 }, 900);
}
function closeSidebar() {
  $("aside").animate({ left: -leftSideWidth }, 500);
  $(".open-close-icon").removeClass("fa-x");
  $(".open-close-icon").addClass("fa-align-justify");
  $("aside .leftSide li").eq(0).animate({ top: 300 }, 900);
  $("aside .leftSide li").eq(1).animate({ top: 300 }, 800);
  $("aside .leftSide li").eq(2).animate({ top: 300 }, 700);
  $("aside .leftSide li").eq(3).animate({ top: 300 }, 600);
  $("aside .leftSide li").eq(4).animate({ top: 300 }, 500);
}
//add active class to links
$("aside .leftSide li").click(function(){
  $("aside .leftSide li").removeClass('active');
  $(this).addClass('active');
})
//* ================loading page====================================*//
$(document).ready(() => {
    $(".loading").fadeOut(1000,() => {
        $("body").css("overflow", "auto");
    });
});
//* ============== remove search bar ================================*//
$("#searchContainer").html(" ");
//* ============== add search bar ===================================*//
function addSearchBar() {
  closeSidebar();
  $("#row").html(" ");
  hideContact();
  closeDetails();
  $("#searchContainer").html(`<div class="row mb-5 gy-3">
    <div class="col-md-6">
        <input type="text" onkeyup="getSearchedName(this.value)" class="form-control bg-transparent shadow-none" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input type="text" onkeyup="getSearchedLetter(this.value)" class="form-control bg-transparent shadow-none" maxlength="1" placeholder="Search By First Letter">
    </div>
</div>`);
}
getSearchedName("");
//* ================== onclick on logo icon function ======================*//
$('#logo').click(()=>{
  getSearchedName("");
  closeSidebar();
  $("#searchContainer").html(" ");
  hideContact();
  closeDetails();
})
//* =================== get and display by search by name =================================================*//
async function getSearchedName(searchedName) {
    $(".inner-loading").css({display:'flex'});
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedName}`);
  let { meals } = await data.json();
  if(meals){
    $(".inner-loading").css({display:'none'});
    displaySearchedName(meals);
  }
}
function displaySearchedName(list) {
  let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<div class="col-md-3 " data-aos="zoom-in">
        <div class="item position-relative overflow-hidden rounded-3" onclick="getDetails('${list[i].idMeal}')">
            <img src="${list[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute overflow-hidden start-0 w-100 h-100 d-flex align-items-center p-2">
                <h3 class="text-capitalize mb-0">${list[i].strMeal}</h3>
            </div>
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
//* =================== get and display by search by letter ===============================================*//
async function getSearchedLetter(searchedLetter) {
    searchedLetter = searchedLetter || 'a'; // ==> This will set searchedLetter to 'a' if it's falsy (i.e., undefined, null, 0, "", etc.).
    $(".inner-loading").css({display:'flex'});
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchedLetter}`
  );
  let { meals } = await data.json();
  if(meals){
    $(".inner-loading").css({display:'none'});
    displaySearchedLetter(meals)
  }
}
function displaySearchedLetter(list) {
  let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<div class="col-md-3 " data-aos="zoom-in">
        <div class="item position-relative overflow-hidden rounded-3" onclick="getDetails('${list[i].idMeal}')">
            <img src="${list[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute overflow-hidden start-0 w-100 h-100 d-flex align-items-center p-2">
                <h3 class="text-capitalize mb-0">${list[i].strMeal}</h3>
            </div>
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
//* =========================get and display categories=================================================*//
async function getCategory() {
  closeSidebar();
  $("#searchContainer").html(" ");
  hideContact();
  closeDetails();
  $(".inner-loading").css('display','flex');
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let { categories } = await data.json();
  if(categories){
    $(".inner-loading").css({display:'none'});
    displayCategories(categories);
  }
}
function displayCategories(list) {
  let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<div class="col-md-3 " data-aos="zoom-in">
        <div class="item position-relative overflow-hidden rounded-3" onclick="getCatMeals('${list[i].strCategory}')">
            <img src="${list[i].strCategoryThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute overflow-hidden start-0 w-100 h-100 d-flex flex-column align-items-center p-2">
                <h3 class="text-capitalize mb-0">${list[i].strCategory}</h3>
                <p class="text-center mt-3">${list[i].strCategoryDescription.split(" ").splice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
// get meals of category
async function getCatMeals(cat){
    $(".inner-loading").css('display','flex');
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    let {meals} = await data.json();
    if(meals){
        $(".inner-loading").css({display:'none'});
        displayCatMeals(meals);
      }
   
}
// display meals of category
function displayCatMeals(list){
    let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<div class="col-md-3 " data-aos="zoom-in">
        <div class="item position-relative overflow-hidden rounded-3" onclick="getDetails('${list[i].idMeal}')">
            <img src="${list[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute overflow-hidden start-0 w-100 h-100 d-flex align-items-center text-start p-2">
                <h3 class="text-capitalize mb-0">${list[i].strMeal}</h3>
            </div>
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
//* ==================get and display area===========================================================*//
async function getArea() {
  closeSidebar();
  $("#searchContainer").html(" ");
  hideContact();
  closeDetails();
  $(".inner-loading").css('display','flex');
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let { meals } = await data.json();
  if(meals){
    $(".inner-loading").css({display:'none'});
    displayArea(meals);
  }
}
function displayArea(list) {
  let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<div class="col-md-3 text-white mb-3" data-aos="zoom-in">
        <div class="item position-relative overflow-hidden rounded-3" onclick="getAreaMeals('${list[i].strArea}')">
            <i class="fa-solid fa-house-laptop fa-4x mb-1"></i>
            <h3 class="text-capitalize mb-0">${list[i].strArea}</h3>
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
// get meals of area
async function getAreaMeals(area){
    $(".inner-loading").css('display','flex');
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let {meals} = await data.json();
    if(meals){
        $(".inner-loading").css({display:'none'});
        displayAreaMeals(meals);
      }
    
}
// display meals of category
function displayAreaMeals(list){
    let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<div class="col-md-3 " data-aos="zoom-in">
        <div class="item position-relative overflow-hidden rounded-3" onclick="getDetails('${list[i].idMeal}')">
            <img src="${list[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute overflow-hidden start-0 w-100 h-100 d-flex align-items-center text-start p-2">
                <h3 class="text-capitalize mb-0">${list[i].strMeal}</h3>
            </div>
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
//* =======================get and display ingredients==========================================================*//
async function getIngredients() {
  closeSidebar();
  $("#searchContainer").html(" ");
  hideContact();
  closeDetails();
  $(".inner-loading").css('display','flex');
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let { meals } = await data.json();
  if(meals){
    $(".inner-loading").css({display:'none'});
    displayIngredients(meals);
  }
}
function displayIngredients(list) {
  let cartona = "";
  for (let i = 0; i < list.length; i++) {
    const strDescription = list[i].strDescription? list[i].strDescription.split(" ").splice(0, 20).join(" ") : "No description available";
    cartona += `<div class="col-md-3 text-white mb-3" data-aos="zoom-in">
        <div class="item position-relative overflow-hidden rounded-3" onclick="getIngredientsMeals('${list[i].strIngredient}')">
            <i class="fa-solid fa-drumstick-bite fa-4x mb-1"></i>
            <h3 class="text-capitalize mb-0">${list[i].strIngredient}</h3>
            <p class="text-center mt-3">${strDescription}</p>
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
// get meals of ingredients
async function getIngredientsMeals(ingredients){
    $(".inner-loading").css('display','flex');
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    let {meals} = await data.json();
    if(meals){
        $(".inner-loading").css({display:'none'});
        displayIngredientsMeals(meals);
      }
    
}
// display meals of category
function displayIngredientsMeals(list){
    let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<div class="col-md-3 " data-aos="zoom-in">
        <div class="item position-relative overflow-hidden rounded-3" onclick="getDetails('${list[i].idMeal}')">
            <img src="${list[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute overflow-hidden start-0 w-100 h-100 d-flex align-items-center text-start p-2">
                <h3 class="text-capitalize mb-0">${list[i].strMeal}</h3>
            </div>
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
//* ===========================get details of a single meal function =============================================*//
async function getDetails(id) {
    $('#home').addClass('d-none');
    $('#details').removeClass('d-none');
    $(".inner-loading").css({display:'flex'});
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let { meals } = await data.json();
  if(meals){
    $(".inner-loading").css({display:'none'});
    displayDetails(meals[0]);
  }
  
}
function displayDetails(meals){
    let ingredients = '';
    for(let i=1;i<=20;i++){
        if(meals[`strIngredient${i}`]){
            ingredients += `<li class="bg-recipes p-2 rounded-3 mx-2">${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meals.strTags?.split(",");
    if(tags == undefined){
        tags = ['No available tags'];
    }
    let tagsStr = '';
    for(let i=0;i<tags.length;i++){
        tagsStr += `<li class="bg-tags p-2 rounded-3 mx-2">${tags[i]}</li>`
    }
    let cartona = `<div class="col-md-4">
    <div class="item rounded-3">
        <img src="${meals.strMealThumb}" class="img-fluid rounded-3 shake filter" alt="">
        <h3 class="text-capitalize mb-sm-3 mb-md-0 text-white">${meals.strMeal}</h3>
    </div>
    </div>
    <div class="col-md-7">
    <div class="content text-white">
        <h2>Introduction</h2>
        <p>${meals.strInstructions}</p>
        <h3><span>Area: </span><span>${meals.strArea}</span></h3>
        <h3><span>Category: </span><span>${meals.strCategory}</span></h3>
        <h3>Recipes:</h3>
        <ul class="recipes d-flex flex-wrap my-2">${ingredients}</ul>
        <h3>Tags:</h3>
        <ul class="d-flex flex-wrap mt-2 mb-3">${tagsStr}</ul>
        <a href="${meals.strSource}" target="_blank" class="py-2 px-3 rounded-3 bg-success">source</a>
        <a href="${meals.strYoutube}" target="_blank" class="py-2 px-3 rounded-3 bg-danger">Youtube</a>
    </div>
</div>
<div class="col-md-1 text-end">
    <i class="close-details-icon fa-solid fa-2x fa-x text-white iconHover" onclick="closeDetails()"></i>
</div>`;

    document.getElementById("detailsContent").innerHTML = cartona;
}
// close details section function 
function closeDetails(){
    $('#details').addClass('d-none')
    $('#home').removeClass('d-none');
}
//* ================================display contact section ============================================*// 
function displayContact(){
    $('#mainContainer').addClass('d-none')
    $('#contact').removeClass('d-none');
    closeSidebar();
    closeDetails();
    $("#searchContainer").html(" ");
}
//* ===================================hide contact section=============================================*//
function hideContact(){
    $('#mainContainer').removeClass('d-none')
    $('#contact').addClass('d-none');
}
//* =======================================contact validation============================================*//
let nameFocused = false;
let mailFocused = false;
let phoneFocused = false;
let ageFocused = false;
let passFocused = false;
let rePassFocused = false;
$('#username').on('focus',function(){
    nameFocused = true;
})
$('#userMail').on('focus',function(){
    mailFocused = true;
})
$('#userPhone').on('focus',function(){
    phoneFocused = true;
})
$('#userAge').on('focus',function(){
    ageFocused = true;
})
$('#userPass').on('focus',function(){
    passFocused = true;
})
$('#userRe-pass').on('focus',function(){
    rePassFocused = true;
})
// validate name function
function validateName() {
  let username = document.getElementById("username");
  let regexName = /^[A-Z a-z]{3,15}(\s? [A-z a-z]{3,15})?$/;
  return regexName.test(username.value);
}
// validate email function
function validateMail() {
  let userMail = document.getElementById("userMail");
  let regexMail = /^(\w){1,}@[a-z]{1,}.com$/;
  return regexMail.test(userMail.value);
}
//validate phone function
function validatePhone() {
  let userPhone = document.getElementById("userPhone");
  let regexPhone = /^(\d){11}$/;
  return regexPhone.test(userPhone.value);
}
//validate age function
function validateAge() {
  let userAge = document.getElementById("userAge");
  return userAge.value >= 5 && userAge.value <= 99;
}
//validate password function
function validatePass() {
  let userPass = document.getElementById("userPass");
  let regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regexPass.test(userPass.value);
}
//validate re-password function
function validateRepass() {
  let userPass = document.getElementById("userPass");
  let userRepass = document.getElementById("userRe-pass");
  return userRepass.value == userPass.value;
}
// total inputs validation function
function validateAllInputs(){
    if(nameFocused){
        if(validateName()){
            $("#nameAlert").removeClass("d-block").addClass("d-none");
        }else{
            $("#nameAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if(mailFocused){
        if(validateMail()){
            $("#mailAlert").removeClass("d-block").addClass("d-none");
        }else{
            $("#mailAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if(phoneFocused){
        if(validatePhone()){
            $("#phoneAlert").removeClass("d-block").addClass("d-none");
        }else{
            $("#phoneAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if(ageFocused){
        if(validateAge()){
            $("#ageAlert").removeClass("d-block").addClass("d-none");
        }else{
            $("#ageAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if(passFocused){
        if(validatePass()){
            $("#passAlert").removeClass("d-block").addClass("d-none");
        }else{
            $("#passAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if(rePassFocused){
        if(validateRepass()){
            $("#re-passAlert").removeClass("d-block").addClass("d-none");
        }else{
            $("#re-passAlert").removeClass("d-none").addClass("d-block");
        }
    }
    if(validateName() &&
    validateMail() &&
    validatePhone() &&
    validateAge() &&
    validatePass() &&
    validateRepass()){
        $('#submitBtn').removeAttr('disabled');
    }else{
        $('#submitBtn').attr('disabled','disabled');
    }
}
$('#username, #userMail, #userPhone, #userAge, #userPass, #userRe-pass').on('keyup', function() {
    validateAllInputs();
});
//* =================animation library=====================================================*//
AOS.init();
//* =====================add 50 elements to star background animation=============================================*//
for(let i=1;i<=50;i++){
  $('.stars').append(`<div class="star"></div>`);
}