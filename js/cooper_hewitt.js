var accessToken = 'b6164ca5516e06395cae70033875c98f';
var sliderRange = [1900, 2016];
var ListofColorLists = [];
var colorPairs = [];
var centerColor = '';
var artObjects = {};
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

//$(document).ready(function() {
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

    $(document).delegate('.circle', 'click', function(){
        var selectedColor = getHex($(this).css("background-color"));
        calculate(colorPairs, selectedColor, 15);
    });

    $("#cooper").click(function(event){
        event.preventDefault();
        var queryString = '';
        if(sliderRange[0] == 1900 || sliderRange[1] == 2016){
            if(sliderRange[0] != 1900 || sliderRange[1] != 2016){
                var yearRange = '&year_start='+sliderRange[0]+'-'+sliderRange[1];
                queryString += yearRange;
            }
        }
        if($('#query').val().length != 0) {
            var keywords = '&query='+$('#query').val();
            queryString += keywords;
        }
        if($('#country').val().length != 0) {
            var country = '&location='+$('#country').val();
            queryString += country;
        }
        if($('#period').val().length != 0) {
            var period = '&period_id='+period_dict[$('#period').val()];
            queryString += period;
        }
        if($('#medium').val().length != 0) {
            var medium = '&medium='+$('#medium').val();
            queryString += medium;
        }

        if(queryString.length > 0){
            $('#results').before('<div id="loading">Loading...</div>');
            $.ajax({
                url: 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token='+accessToken+queryString+'&page=1&per_page=100',
                success: function (response) {
                    
                    console.log(response);
                    artObjects = response.objects;
                    var num = response.objects.length;
                    var htmlString = "";

                    $( '#results' ).empty();

                    if(num == 0){
                        $('#loading').remove();
                        $( '#results' ).empty();
                        $('#results').text('No results!');
                    }

                    for(var i=0; i<num; i++){
                        if(response.objects[i].images.length>0){
                            var imgurl = response.objects[i].images[0].sq.url;
                            var link = response.objects[i].url;

                            var id = response.objects[i].id;
                            objectIds.push(id);
                            htmlString = '<a target="_blank" href="'+link+'"><img src="'+imgurl+'"></a>';
                            $('#results').append( htmlString );
                        }
                    }
                    getColors(objectIds);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#loading').remove();
                    $( '#results' ).empty();
                    $('#results').text('No results!');
                }
            });
        } else {
            $('#results').text('You forgot to search for anything!');
        }
 
        

    });

    function getColors(idList) {
        ListofColorLists = [];
        var colorNum = 100;
        for(var i = 0; i < idList.length; i++){
            var currId = idList[i];
            var colorsList = [];
            $.ajax({ 
                url: 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getColors&access_token='+accessToken+'&id='+currId,
                success: function (response) {
                    colorsList = [];
                    colors = response.colors;
                    for(var i = 0; i < colors.length; i++){
                        color = colors[i].closest_css3;
                        colorsList.push(color);
                        colorsList.pairs(function(pair){
                            colorPairs.push(pair);
                        });
                    }
                    ListofColorLists.push(colorsList);
                },
                complete: function () {
                    console.log("CALLING CALCULATE");
                    calculate(colorPairs, centerColor, colorNum);
                }
            });
        }
    }

    function calculate(list, value, colorNum){
        var colorDictionary = {};
        if (list.length > 0 && value.length == 0){
            value = ListofColorLists[0][0];
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
        var colorPairingList = getSortedKeys(colorDictionary)
        // .slice(0, colorNum);
        displayColors(value, colorPairingList, colorDictionary);
        console.log(dots);
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
        //var sum = getSum(obj);

        var max = 0;
        for (key in obj) {
            if (obj[key] > max) {
                max = obj[key];
            }
        }

        for(key in obj){
            //obj[key] /= sum;
            obj[key] /= max;
        }
    }

    function getSum(obj){
        var totalSum = 0;
        for(key in obj){
            totalSum += obj[key];
        }
        return totalSum;
    }

    // converts a rgb hex string to hsl array.
    function rgb2hsl(hex) {
        var temp = hex.replace(/^#/, '');
        var r = parseInt(temp.substring(0, 2), 16) / 255;
        var g = parseInt(temp.substring(2, 4), 16) / 255;
        var b = parseInt(temp.substring(4, 6), 16) / 255;

        var cmax = max(r, g, b);
        var cmin = min(r, g, b);
        var delta = cmax - cmin;
        var l = (cmax + cmin) / 2;
        var h = 0;

        if (delta === 0) {
            h = 0
        } else if (cmax === r) {
            h = 60 * (((g - b) / delta) % 6);
        } else if (cmax === g) {
            h = 60 * ((b - r) / delta + 2);
        } else if (cmax === b) {
            h = 60 * ((r - g) / delta + 4);
        }

        var s = 0;
        if (delta === 0) {
            s = 0;
        } else {
            s = delta / (1 - Math.abs(2 * l  - 1));
        }

        /*
        console.log([r * 255, g * 255, b * 255]);
        console.log([h, Math.round(s * 100) / 100, Math.round(l * 100) / 100]);
        */
        return [Math.round(h * 100) / 100, Math.round(s * 10000) / 100, Math.round(l * 10000) / 100];
    }

    function displayColors(selectedColor, list, obj){
        $('#loading').remove();
        var constant = 1000;
        var selectedArtworks = [];
        
        if($('#results').length){
            $('#results').empty();
        }

        dots = [{"hsl": rgb2hsl(selectedColor), "score": -100}];

        for(var i = 0; i < list.length; i++){
            // update dots. hsl and score normalized to 0-100
            dots.push({"hsl": rgb2hsl(list[i]), "score": obj[list[i]] * 100, "hex": list[i]});
        }


        console.log(ListofColorLists.length);
        for(var i = 0; i < ListofColorLists.length; i++){
            var colorList = ListofColorLists[i];
            if(colorList.indexOf(selectedColor) > -1){
                var currId = objectIds[i];
                for(j in artObjects){
                    if(artObjects[j].id == currId){
                        selectedArtworks.push(artObjects[j]);
                    }
                }
            }
        }
        console.log(selectedArtworks.length);
        for(var i = 0; i < selectedArtworks.length; i++){
            if(selectedArtworks[i].images.length>0){
                var imgurl = selectedArtworks[i].images[0].sq.url;
                var link = selectedArtworks[i].url;

                var id = selectedArtworks[i].id;
                objectIds.push(id);
                htmlString = '<a target="_blank" href="'+link+'"><img src="'+imgurl+'"></a>';
                $('#results').append( htmlString );
            }
        }
        
    }

    function getHex(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        color = '#' + parts.join('');
        return color;
    }
//});