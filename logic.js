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
    console.log(response.results);

    let results=response.results;
    
    for (let i = 0; i<=results.length; i++) {
      let schoolName = results[i].school_name;
      console.log(schoolName);

      let virtual = results[i].virtual;
        if (virtual === 0) {
        console.log("no");
      } else if (virtual === 1) {
        console.log("yes");
      } else {
        console.log("not sure")
      }

      let state = response.results[i].state_location;
        if (state === "AL") {
          console.log("Alabama")
        } else {
          console.log("Not Alabama")
        }
          
          
        }


  
});
