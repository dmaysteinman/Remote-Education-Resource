function getData() {

const stateSelect = $("#state-select option:selected").text();
console.log(stateSelect)

var queryURL =
  "https://educationdata.urban.org/api/v1/schools/ccd/directory/2018/?state_location=" + stateSelect



$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
    console.log(response.results);

    let results=response.results;
  
    
    for (const i = 0; i<=results.length; i++) {
      const schoolName = results[i].school_name;
      console.log(schoolName);

      const virtual = results[i].virtual;
        if (virtual === 0) {
        console.log("no");
      } else if (virtual === 1) {
        console.log("yes");
      } else {
        console.log("not sure")
      }

      const state = response.results[i].state_location;
        if (state === "VA") {
          console.log("Virginia")
        } else if (state === "NH") {
          console.log("New Hampshire")
        } else if (state === "ME") {
            console.log("Maine")
        } else {
          console.log("Other")
        }

        // The zip code for loop etc
      // const zip = response.results[i].zip_location;
      //   if (zip === "") {
      //     console.log(schoolName)
      //   }
      
          
          
      }


  
});
}
