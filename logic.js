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

                // Populate Results text with data
                resultsDiv.append(`School Name: ${schoolName} <br>Phone: ${phoneNumber} <br>Enrollment: ${enrollment} students <br><br>`)

                // For reference
                console.log(schoolName)
                console.log(phoneNumber)
                console.log(enrollment)
            }
        }
    });
}
