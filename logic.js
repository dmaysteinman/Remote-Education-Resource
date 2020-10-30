// APIS go in here
// googleclassroom
// openED
// blackboard

var queryURL =
  "https://educationdata.urban.org/api/v1/schools/ccd/directory/2018/";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
    console.log(response.results[300].school_name);
  
});
