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


$(document).ready(function() {

    $('#country').betterAutocomplete('init', countries, {}, {});

    $("#cooper").click(function(event){
        event.preventDefault();

        var accessToken = 'a31ceab19d68d86b12b3c3193f5e123b';
        var queryString = '';

        if($('#query').val().length != 0) {
            var keywords = '&query='+$('#query').val();
            queryString += keywords;
        }
        if($('#country').val().length != 0) {
            var country = '&location='+$('#country').val();
            queryString += country;
        }
        
        var objectNum = 100;
        $.ajax({
            url: 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=5febed11aefd59ea1b44926abccfb780'+queryString+'&page=1&per_page='+objectNum,
            success: function (response) {

                console.log(response);

                var num = response.objects.length;
                var htmlString = "";

                $( '#results' ).empty();

                for(var i=0; i<num; i++){
                    console.log("good");
                    if(response.objects[i].images.length>0){
                        var imgurl = response.objects[i].images[0].sq.url;
                        var link = response.objects[i].url;

                        console.log(htmlString);
                        htmlString = '<a href="'+link+'"><img src="'+imgurl+'"></a>';
                        console.log(htmlString);
                        $('#results').append( htmlString );
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $( '#results' ).empty();
                $('#results').text('No results!');
            }
        });
    });
});