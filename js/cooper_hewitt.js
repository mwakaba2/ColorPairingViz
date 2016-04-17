$("#cooper").click(function(event){
    event.preventDefault();

    // var myName = $( '#queryMine' ).val();
    // var dateName = $( '#queryDate').val();
    // var birthYear = $( '#queryBirth' ).val();
    // var typeString = $( '#type option:selected' ).text();
    var accessToken = 'a31ceab19d68d86b12b3c3193f5e123b';
    var query = 'Graphic Design';
    var objectNum = 500;
    $.ajax({
        url: 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=5febed11aefd59ea1b44926abccfb780&query='+query+'&page=1&per_page='+objectNum,
        success: function (response) {

            // document.getElementById('results').innerHTML = '';

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

                    // htmlString = '<img src="'+imgurl+'">';
                   
                    $( '#results' ).append( htmlString );
                }
            }
        }
    });
});