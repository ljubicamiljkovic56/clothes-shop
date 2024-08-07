var template = $('#template').html();
console.log(template);
//var title = new RegExp('{{title}}', 'g');
var collections = $("[data-collection]");
var mainRow = $('#mainRow');
console.log(collections.length);
collections.on('click', displayCollections);
display();

function display(){
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
}

function displayCollections(e){
    mainRow.html("");
    e.preventDefault();
    var col = $(this).data('collection');
    console.log(col);
    $('.back-to-top').click(function(){
        $('html, body').animate({scrollTop: 0}, 1000);
    });
    $.ajax({
        url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
        method: "get",
        dataType: "json"
    })
    .done(function(res){
        if(col === 'male' || col === 'female'){
            var colFilter = res.filter(function (el){
                return el.colection === col;
            })
            console.log(res);
            var text = "";
            colFilter.forEach(function (e){
                text = template.replace("{{imgSrc}}", e.imgSrc)
                .replace("{{productTitle}}", e.productTitle)
                .replace("{{model}}", e.model)
                .replace("{{price}}", e.price);
            $("#mainRow").append(text);
            })
        }else if(col === 'newCol' || col === 'popular' || col === 'action'){
            var colFilter = res.filter(function (el) {
                return el[col];
            })
            var text = "";
            colFilter.forEach(function (e){
                console.log(e);
                text = template.replace("{{imgSrc}}", e.imgSrc)
                    .replace("{{productTitle}}", e.productTitle)
                    .replace("{{model}}", e.model)
                    .replace("{{price}}", e.price);
                mainRow.append(text);
        })
        }

    })
}
