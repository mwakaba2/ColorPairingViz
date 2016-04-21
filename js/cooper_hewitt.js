var sliderRange = [1900, 2016];
var colorPairs = [];
var centerColor = '';
var objectIds = [];
var countries = [
    'France',
    'United States',
    'Italy',
    'United Kingdom',
    'Germany',
    'Japan',
    'Netherlands',
    'Austria',
    'Spain',
    'China',
    'India',
    'Mexico',
    'Belgium',
    'Switzerland',
    'Egypt',
    'Denmark',
    'Ireland',
    'Sweden',
    'Russia',
    'Columbia',
    'Peru',
    'Ecuador',
    'Hungary',
    'Finland',
    'Indonesia',
    'Greece',
    'Canada',
    'Jamaica',
    'Iran',
    'Phillipines'
];

var medium = ['graphite on tracing paper', 'block-printed', 'graphite\nsupport: tracing paper',
                'silk embroidery on linen foundation', 'pen and brown ink, brush and brown wash, graphite',
                'Tin-glazed earthenware, underglaze', 'etching on off-white laid paper', 'paper', 
                'block-printed on handmade paper', 'red chalk on paper', 'offset lithography', 'plastic', 
                'earthenware', 'cotton', 'graphite on thin cream paper', 
                'graphite; ruled border in graphite\nsupport: tracing paper', 'machine-printed, mica, liquid',
                'velvet', 'etching', 'lithograph on paper', 'graphite on tracing paper, ruled border in graphite', 
                'glass slide', 'stainless steel', 'gouache on paper', 'glazed porcelain', 'block-printed on paper', 
                'screen printed', 'wood', 'bronze', 'machine-printed on paper', 'silk, metallic thread', 'wool', 
                'wood, carved', 'engraving on white laid paper', 'ivory', 'porcelain', 'graphite on cream tracing paper',
                'glass', 'pen and brown ink, brush and brown wash', 'graphite, ruled border in graphite\nsupport: tracing paper',
                'graphite on paper', 'screen printed on paper', 'brass', 'silk', 'silver', 'offset lithograph on paper', 
                'silk, metallic', 'machine-printed', 'stoneware', 'glazed earthenware', 'metal',
                'tin-glazed earthenware, underglaze', 'etching and engraving on off-white laid paper',
                'linen', 'lithograph', 'graphite', 'brush and gouache on paper', 'offset lithograph on white wove paper',
                'other', 'printed']

period_dict = {'Rococo': 35417101, 'Hudson River School': 35417175, 'Neoclassical': 35417089,
                'American Modern': 35435409, 'early Modern': 35417049, 'Art Deco': 35417235, 
                'postwar': 35435429, ' Civil War': 35417141, 
                'Northern Renaissance': 35417075, 'Mid-20th century': 35417329, 
                'Late Nineteenth Century': 35417087, '  Late Twentieth Century': 35435423,
                'Early 20th century': 35417121}

periods = ["Rococo", "Hudson River School", "Neoclassical", "American Modern", "early Modern",          
        "Art Deco", "Baroque", "postwar", " Civil War", "Northern Renaissance", "Mid-20th century",
         "Late Nineteenth Century", "  Late Twentieth Century", "Early 20th century"]

$(document).ready(function() {
    /* year slider */
    $( "#slider-range" ).slider({
        range: true,
        min: 1900,
        max: 2016,
        values: [ 1900, 2016 ],
        slide: function( event, ui ) {
            $( "#amount" ).html( ui.values[ 0 ] + "–" + ui.values[ 1 ]);

            sliderRange[0] = ui.values[0];
            sliderRange[1] = ui.values[1];
        }
    });

    /* year slider label */
    $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
    " - " + $( "#slider-range" ).slider( "values", 1 ) );

    $('#country').betterAutocomplete('init', countries, {}, {});
    $('#period').betterAutocomplete('init', periods, {}, {});
    $('#medium').betterAutocomplete('init', medium, {}, {});

    $("#cooper").click(function(event){
        event.preventDefault();

        var accessToken = 'a31ceab19d68d86b12b3c3193f5e123b';
        var queryString = '';
        var yearRange = '&year_start='+sliderRange[0]+'-'+sliderRange[1];
        queryString += yearRange;

        if($('#query').val().length != 0) {
            var keywords = '&query='+$('#query').val();
            queryString += keywords;
        }
        if($('#country').val().length != 0) {
            var country = '&location='+$('#country').val();
            queryString += country;
        }
        if($('#period').val().length != 0) {
            var period = '&period='+$('#period').val();
            queryString += period;
        }
        if($('#medium').val().length != 0) {
            var medium = '&medium='+$('#medium').val();
            queryString += medium;
        }


        var objectNum = 100;
        $.ajax({
            url: 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=f6fc4d52b4c2499d9929056b1946ccc7'+queryString+'&has_images=true&page=1&per_page='+objectNum,
            success: function (response) {

                console.log(response);
                var num = response.objects.length;
                var htmlString = "";

                $( '#results' ).empty();

                if(num == 0){
                    $( '#results' ).empty();
                    $('#results').text('No results!');
                }

                for(var i=0; i<num; i++){
                    if(response.objects[i].images.length>0){
                        var imgurl = response.objects[i].images[0].sq.url;
                        var link = response.objects[i].url;

                        var id = response.objects[i].id;
                        objectIds.push(id);
                        htmlString = '<a href="'+link+'"><img src="'+imgurl+'"></a>';
                        $('#results').append( htmlString );
                    }
                }
                getColors(objectIds);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $( '#results' ).empty();
                $('#results').text('No results!');
            }
        });

    });

    function getColors(idList) {
        for(var i = 0; i < idList.length; i++){
            var currId = idList[i];
            $.ajax({ 
                url: 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getColors&access_token=f6fc4d52b4c2499d9929056b1946ccc7&id='+currId,
                async: false,
                success: function (response) {
                    colors = response.colors;
                    var colorsList = [];
                    for(var i = 0; i < colors.length; i++){
                        color = colors[i].closest_css3;
                        colorsList.push(color);
                        colorsList.pairs(function(pair){
                            colorPairs.push(pair);
                        });
                    }
                }
            });
        }
        calculate(colorPairs, centerColor);
    }

    function calculate(list, value){
        var colorDictionary = {};
        if (value.length == 0){
            value = list[0][0];
        }
        for(var i = 0; i < list.length; i++){
            var idx = list[i].indexOf(value);
            if(idx > -1){
                if(idx == 0){
                    var color = list[i][1];
                }else{
                    var color = list[i][0];
                }
                if(color in colorDictionary){
                    colorDictionary[color] += 1;
                } else {
                    colorDictionary[color] = 1;
                }
            }
        }
        normalize(colorDictionary);
        colorPairingList = getSortedKeys(colorDictionary);
        console.log(colorDictionary);
        console.log(colorPairingList);
        displayColors(colorPairingList, colorDictionary);
    }

    function getSortedKeys(obj) {
        var keys = []; for(var key in obj) keys.push(key);
        return keys.sort(function(a,b){return obj[b]-obj[a]});
    }

    Array.prototype.pairs = function (func) {
        var pairs = [];
        for (var i = 0; i < this.length - 1; i++) {
            for (var j = i; j < this.length - 1; j++) {
                func([this[i], this[j+1]]);
            }
        }
    }

    function normalize(obj){
        var sum = getSum(obj);
        for(key in obj){
            obj[key] /= sum;
        }
    }

    function getSum(obj){
        var totalSum = 0;
        for(key in obj){
            totalSum += obj[key];
        }
        return totalSum;
    }

    function displayColors(list, obj){
        var constant = 1000;
        for(var i = 0; i < list.length; i++){
            var size = Math.floor(obj[list[i]]*constant);
            htmlString = '<div class="square" style="background-color:'+list[i]+'; width:'+ size +'px; height:' + size + 'px;"></div>';
            $('#colorList').append( htmlString );
        }
    }
});