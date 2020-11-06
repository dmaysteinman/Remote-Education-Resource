// Logic for YouTube API Call

const channelIds = {
    khanAcademy: ["UC4a-Gbdw7vOaccHmFo40b9g", "Khan Academy"], sesameStreet:
        ["UCoookXUzPciGrEZEXmh4Jjg", "Sesame Street"], smithsonianChannel: ["UCWqPRUsJlZaDp-PVbqEch9g", "The Smithsonian"], novaPbsOfficial:
        ["UCjHz5SVHeMT0AViCYZvsGDA", "Nova PBS"], crashCourse: ["UCX6b17PVsYBQ0ip5gyeme-Q", "Crash Course"], itsOkToBeSmart: ["UCH4BNI0-FOK2dMXoFtViWHw", "It's Okay To Be Smart"]
}
const channelIdsArray = Object.keys(channelIds);
const vidResultsDiv = $("#video-results");
const channelSelectElement = $("#channelSelect");
const topicHistoryDatalist = $("#topic-history");
let topicHistoryArray;

$(document).ready(() => {
    // Populate YouTube channel dropdown list
    for (let i = 0; i < channelIdsArray.length; i++) {
        channelSelectElement.append(`<option value="${channelIds[channelIdsArray[i]][0]}">${channelIds[channelIdsArray[i]][1]}</option>`);
    }
    // Get topic history from local storage
    topicHistoryArray = JSON.parse(localStorage.getItem("topicHistory")) || [];
    updateHistory();
})

function getVideo() {
    const channelIdSelect = $("#channelSelect option:selected").val();
    var searchTerm = $("#search-term").val()
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyAHi1lxmJnNf9lk23FC0XZPOKihGFIlFqk', // Joel's key
            q: searchTerm,
            part: 'snippet',
            channelId: channelIdSelect,
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            embedVideo(data)
        },
    });
    if (topicHistoryArray.includes(searchTerm)) {
        let rptIndex = topicHistoryArray.indexOf(searchTerm);
        topicHistoryArray.splice(rptIndex, 1);
    };
    topicHistoryArray.unshift(searchTerm);
    updateHistory();
}

function updateHistory() {
    localStorage.setItem("topicHistory", JSON.stringify(topicHistoryArray));

    topicHistoryDatalist.html('')
    for (let i = 0; i < topicHistoryArray.length; i++) {
        let newOption = `<option value="${topicHistoryArray[i]}"/>`;
        topicHistoryDatalist.append(newOption);
    }
    $("#search-term").val('')
}

function embedVideo(data) {
    vidResultsDiv.html('')
    if (data.items.length) {
        const newIframe = $('<iframe>').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
        const newTitle = $('<h3>').text(data.items[0].snippet.title)
        const newDescription = $('<p>').text(data.items[0].snippet.description)

        vidResultsDiv.append(newIframe, newTitle, newDescription);
    } else {
        vidResultsDiv.text("ERROR: No results found")
    }
    
}