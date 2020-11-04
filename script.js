// buttons & onlick events
// search card interactions (buttons etc)
// making the modal appear with the results
// shows the content when activated 
//youtube code
let channelIds = {khanAcademy:"UCjHz5SVHeMT0AViCYZvsGDA", sesameStreet:
"UCoookXUzPciGrEZEXmh4Jjg", smithsonianChannel: "UCWqPRUsJlZaDp-PVbqEch9g", novaPbsOfficial:
"UCjHz5SVHeMT0AViCYZvsGDA" , crashCourse: "UCX6b17PVsYBQ0ip5gyeme-Q", itsOkToBeSmart: "UCH4BNI0-FOK2dMXoFtViWHw" }

//const channelIdSelect = $("#channelIds-select option:selected").val();

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
            channelId: channelIds.channelIdsSelect,
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
  