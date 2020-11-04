// buttons & onlick events
// search card interactions (buttons etc)
// making the modal appear with the results
// shows the content when activated 
//youtube code
let channelIds = {
    khanAcademy: ["UC4a-Gbdw7vOaccHmFo40b9g", "Khan Academy"], sesameStreet:
        ["UCoookXUzPciGrEZEXmh4Jjg", "Sesame Street"], smithsonianChannel: ["UCWqPRUsJlZaDp-PVbqEch9g", "The Smithsonian"], novaPbsOfficial:
        ["UCjHz5SVHeMT0AViCYZvsGDA", "Nova PBS"], crashCourse: ["UCX6b17PVsYBQ0ip5gyeme-Q", "Crash Course"], itsOkToBeSmart: ["UCH4BNI0-FOK2dMXoFtViWHw", "It's Okay To Be Smart"]
}

$(document).ready(() => {
    const channelSelectElement = $("#channelSelect");
    const channelIdsArray = Object.keys(channelIds);

    for (let i = 0; i < channelIdsArray.length; i++) {
        channelSelectElement.append(`<option value="${channelIds[channelIdsArray[i]][0]}">${channelIds[channelIdsArray[i]][1]}</option>`);
    }
})

function getVideo() {
    const channelIdSelect = $("#channelSelect option:selected").val();
    var searchTerm = $("#search-term").val()
    console.log(searchTerm)
    console.log()
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            // Jon's key: 'AIzaSyCBVJVvBCExc4LG0QasZwIOwB8Tjh0sCYk'
            key: 'AIzaSyAHi1lxmJnNf9lk23FC0XZPOKihGFIlFqk',
            q: searchTerm, //need to link to search box
            part: 'snippet',
            channelId: channelIdSelect,
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            embedVideo(data)
        },
        error: function (response) {
            console.log("Request Failed");
        }
    });
}

function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    $('h3').text(data.items[0].snippet.title)
    $('.description').text(data.items[0].snippet.description)
}
