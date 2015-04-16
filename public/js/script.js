$(function(){
console.log("test js");



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
