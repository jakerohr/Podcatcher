$(function(){
console.log("test js");

$('.alert').delay(2000).fadeOut(3000)


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

$('.create-save').on('submit', function(e){
  e.preventDefault();
  var myUrl = $(this).attr('action')
  var myData = $(this).serialize()
      $.ajax({
          method:'POST',
          url:myUrl,
          data:myData
      }).done(function(){
        console.log('completed save')
      });
  })
$('.go').on('click',function(){
  $('.success').fadeIn(1200).removeClass('hidden').delay(1000).fadeOut(1200)


});















})
