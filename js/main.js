$('.back-to-top').click(function(){
    $('html, body').animate({scrollTop: 0}, 1000);
});
$.ajax({
    url: "shop.json",
    method: "get",
    dataType: "json"
})
.done(function(res){
    console.log(res);
})