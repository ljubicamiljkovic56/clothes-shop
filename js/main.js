var template = $('#template').html();
console.log(template);
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
    var text = "";
    res.forEach(function (e){
        text = template.replace("{{imgSrc}}", e.imgSrc)
        .replace("{{productTitle}}", e.productTitle)
        .replace("{{model}}", e.model)
        .replace("{{price}}", e.price);
    $("#mainRow").append(text);
    })
})
