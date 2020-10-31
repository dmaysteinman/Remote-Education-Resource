// buttons & onlick events
// search card interactions (buttons etc)
// making the modal appear with the results
// shows the content when activated 
//youtube code
function getVideo() {
    var test = $("#search-term").val()
    console.log(test)
  
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyCBVJVvBCExc4LG0QasZwIOwB8Tjh0sCYk',
            q: test, //need to link to search box
            part: 'snippet',
            channelId: 'UC4a-Gbdw7vOaccHmFo40b9g',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            embedVideo(data)
        },
        error: function(response){
            console.log("Request Failed");
        }
      });
    }
  
    function embedVideo(data) {
      $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
      $('h3').text(data.items[0].snippet.title)
      $('.description').text(data.items[0].snippet.description)
  }
  