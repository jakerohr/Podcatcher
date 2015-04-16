$(function(){
console.log("test js");

// When ready...
window.addEventListener("load",function() {
  // Set a timeout...
  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);
});

$('.glyphicon-chevron-up').on('click', function(e){
  e.preventDefault();
  if($('.timer').val() >= 0) {
    $('.timer').val(parseInt($('.timer').val())+5);
  }
})
  $('.glyphicon-chevron-down').on('click', function(e){
     e.preventDefault();
    if($('.timer').val() >= 5) {
    $('.timer').val(parseInt($('.timer').val())-5);
  }
})














})
