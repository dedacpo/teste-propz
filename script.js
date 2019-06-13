
$( document ).ready(function() {
    getData();
});

var dictionaryCards = {
    "0":"img/visa.png",
    "1":"img/master.png",
    "2":"img/amex.png"
}


function getData(){
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "landing_page_data.json",
        success: function(dados)
        {
           insertData(dados);
        }
    });
}

function insertData(dados){
    var template = $(".item");
    dados.forEach(function(value,i){
        if(i > 0)
            $("#hidden").append(template.clone());  
    });
    template = $(".item");
    template.each(function(i,value){
       $(value).find(".name").html(dados[i].name);
        $(value).find(".img img").attr('src',dados[i].img_path);
       $(value).find(".times").each(function(i2,value2){
            $(value2).html(dados[i].parcellment[i2].times + 'X');
        });
        $(value).find(".value").each(function(i2,value2){
            var splited = dados[i].parcellment[i2].value.toString().replace('.',',').split(',')
            $(value2).html(splited[0]);
            $(value2).find('.cents').eq(i2).html(splited[1])
        });
        $(value).find(".accepted_cards img").each(function(i2,value2){
            $(value2).attr('src',dictionaryCards[dados[i].accepted_cards[i2]])
        });
        $(value).find(".vista").html(dados[i].price.toFixed(2).toString().replace('.',','));
        $('#slickear').append(template);
    });

    toSlick();
}

function toSlick(){
    $("#slickear").slick({
        infinite:true,
        centerMode: true,
        slidesToShow:3,
        slidesToScroll:1,
        centerPadding: 0,
        cssEase: 'linear',
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2                
              }
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 1               
              }
            }            
          ]
    })
}
