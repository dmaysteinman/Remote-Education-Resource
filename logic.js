const statesArray = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

$(document).ready(() => {
    const stateSelectElement = $("#state-select");
    statesArray.forEach((item) => {
        stateSelectElement.append(`<option>${item}</option>`);
    })
})

function getData() {

    const stateSelect = $("#state-select option:selected").text();
    const zipInput = $("#searchBtn-zip").val();
    const resultsDiv = $("#data-results")

    var queryURL =
        `https://educationdata.urban.org/api/v1/schools/ccd/directory/2018/?state_location=${stateSelect}`


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        // Clear resultsDiv
        resultsDiv.html('')

        let results = response.results;

        for (let i = 0; i < results.length; i++) {

            const zipLocation = results[i].zip_location;
            const zipMailing = results[i].zip_mailing;

            if (zipInput === zipLocation || zipInput === zipMailing) {
                const schoolName = results[i].school_name;
                const phoneNumber = results[i].phone;
                const enrollment = results[i].enrollment;

                // APPEND data to results div
                resultsDiv.append(`<div class='card m-2 bg-light'><div class='card-body'><b>School Name:</b> ${schoolName} <br> <b>Phone:</b> ${phoneNumber} <br> <b>Enrollment:</b> ${enrollment} students</div></div>`)

                // For reference
                console.log(schoolName)
                console.log(phoneNumber)
                console.log(enrollment)
            }
        }
    });
}
