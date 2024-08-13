var template = $('#template').html();
console.log(template);
//var title = new RegExp('{{title}}', 'g');
var collections = $("[data-collection]");
var mainRow = $('#mainRow');
console.log(collections.length);

window.onload = function () {
    collections.parent().removeClass('active')
    $.ajax({
        url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
        method: "get",
        dataType: "json"
    })
    .done(function(res) {
        displayCollections(res);
        collections.on('click', function(){
            displayCollections.call(this,res);
        })
    })
}

$('.back-to-top').click(function(){
    $('html, body').animate({scrollTop: 0}, 1000);
});

//window.onload = displayCollections;
//display();
/*function display(){
    mainRow.html("");
    $('.back-to-top').click(function(){
        $('html, body').animate({scrollTop: 0}, 1000);
    });
    $.ajax({
        url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
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
} */

function displayCollections(res){
    mainRow.html("");
    event.preventDefault();
    var col = $(this).data('collection');
    console.log(col);

    if(col === 'male' || col === 'female'){
        var colFilter = res.filter(function (el){
             return el.colection === col;
        })
        console.log(res);
        displayProduct(colFilter);
    }else if(col === 'newCol' || col === 'popular' || col === 'action'){
        collections.parent().removeClass('active');
        $(this).parent().addClass('active');
        var colFilter = res.filter(function (el) {
         return el[col];
    })
        displayProduct(colFilter);
    } else {
        displayProduct(res);
    }
}

function displayProduct(filter){
    var text = "";
        filter.forEach(function (e){
        console.log(e);
        text = template.replace("{{imgSrc}}", e.imgSrc)
                .replace("{{productTitle}}", e.productTitle)
                .replace("{{model}}", e.model)
                .replace("{{price}}", e.price);
        mainRow.append(text);
    })
}
