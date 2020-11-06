$(document).ready(() => {
    const statesArray = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const stateSelectElement = $("#state-select");
    const zipHistoryDatalist = $("#zip-history");
    const resultsDiv = $("#data-results")
    let zipHistoryArray;

    // Populate State Abbr. dropdown list
    statesArray.forEach((item) => {
        stateSelectElement.append(`<option>${item}</option>`);
    });
    // Get ZIP code history from local storage
    zipHistoryArray = JSON.parse(localStorage.getItem("zipHistory")) || [];
    updateHistory();

    // Search Button onclick event
    $("#search-button-state").click(() => {

        const stateSelect = $("#state-select option:selected").text();
        const zipInput = $("#search-zip").val();
       
        const queryURL =
            `https://educationdata.urban.org/api/v1/schools/ccd/directory/2018/?state_location=${stateSelect}`

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            // Clear resultsDiv
            resultsDiv.html('')
            // ERROR message
            if (isNaN(zipInput) || zipInput.length > 5) {
                resultsDiv.text("ERROR: Please enter a 5 digit zip code")
                return
            }
            
            let results = response.results;
            for (let i = 0; i < results.length; i++) {
                const zipLocation = results[i].zip_location;
                const zipMailing = results[i].zip_mailing;

                if (zipInput === zipLocation || zipInput === zipMailing) {
                    const schoolName = results[i].school_name;
                    const phoneNumber = results[i].phone;
                    const enrollment = results[i].enrollment;
                    // APPEND data to results div
                    resultsDiv.append(`<div class='card m-3 bg-light'><div class='card-body'><b>School Name:</b> ${schoolName} <br> <b>Phone:</b> ${phoneNumber} <br> <b>Enrollment:</b> ${enrollment} students</div></div>`)
                }
            }
        

        if (zipHistoryArray.includes(zipInput)) {
            let rptIndex = zipHistoryArray.indexOf(zipInput);
            zipHistoryArray.splice(rptIndex, 1);
        };
        zipHistoryArray.unshift(zipInput);
        updateHistory();
    });
    })

    function updateHistory() {
        localStorage.setItem("zipHistory", JSON.stringify(zipHistoryArray));

        zipHistoryDatalist.html('')
        for (let i = 0; i < zipHistoryArray.length; i++) {
            let newOption = `<option value="${zipHistoryArray[i]}"/>`;
            zipHistoryDatalist.append(newOption);
        }
        $("#search-zip").val('')
    }
})