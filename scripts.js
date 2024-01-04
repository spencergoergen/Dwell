// Get references to the search button and search input field
const searchInput = document.getElementById('searchInput');
const searchField = document.getElementById('searchField');

// Event listener for typing in the search field
searchField.addEventListener('input', () => {
// Handle input changes, perform search operations, etc.
// You can access the search input value using: searchField.value
});

document.addEventListener('DOMContentLoaded', () => {
    // Get all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');

    // Add click event listener to each dropdown
    dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropdown.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the document

        // Toggle the display of the dropdown content
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';

        // Hide other dropdowns' content if clicked
        dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
            otherDropdown.querySelector('.dropdown-content').style.display = 'none';
            }
        });
        });

        // Close the dropdown when clicking outside of it
        document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
        });
    });
});

mapboxgl.accessToken = 'pk.eyJ1Ijoic2dvZXJnZW4iLCJhIjoiY2xxOGh3NXNmMWRpbDJybGt0M3dlaWhuaCJ9._cf-BoBhMT2C5-sHnyHqeQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-85, 43], // Center the map on Michigan
    zoom: 8 // Adjust the zoom level as needed
});

function goBack() {
        window.history.back();
}

const bounds = [ [-91, 41], // Southwest coordinates of Michigan
[-81.5, 49] // Northeast coordinates of Michigan
];

const infoDisplay = document.getElementById('info');
let mapInfo; // Declare countyInfo variable outside the event handlers

// Load the JSON data from external file
fetch('/JSON/michigan.json')
.then(response => response.json())
.then(data => {
    const mapInfo = data;

    map.on('load', () => {
    const sliderValueDisplay = document.getElementById('slider-value');
    const sliderContainer = document.getElementById('slider-container');
    const sliderValueTop = document.getElementById('slider-top'); // New element for top display
    const slider = document.getElementById('real-slider');
    const infoPage = document.getElementById('info');

    slider.addEventListener('input', (e) => {
        const sliderValue = parseFloat(e.target.value);
        // Update slider value display
        sliderValueDisplay.textContent = sliderValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        // Update the element at the top with the slider value and static text
        const monthlyCostText = 'Estimated Home Value: ';
        const sliderValueTop = document.getElementById('slider-top');
        //const monthlyCostText2 = '(Homestead)';
        
        // Assuming sliderValue is a number representing the currency value
        sliderValueTop.textContent = `${monthlyCostText}$${Number(sliderValue).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
        // add ${monthlyCostText2} to end of the ^^
    });

    map.setMaxBounds(bounds);
    map.setMinZoom(3);

    // Load county boundary data
    map.addSource('townships', {
        type: 'geojson',
        data: '/geoJSON/townships.geojson' // Replace with the path to your county boundary JSON file
    });   

            // Load county boundary data
    map.addSource('schools', {
        type: 'geojson',
        data: '/geoJSON/schools.geojson' // Replace with the path to your county boundary JSON file
    });   

                    // Load county boundary data
    map.addSource('counties', {
        type: 'geojson',
        data: '/geoJSON/county.geojson' // Replace with the path to your county boundary JSON file
    });   


    map.addLayer({
        'id': 'townships-line-layer',
        'type': 'line',
        'source': 'townships',
        'paint': {
        'line-color': '#000000', // Adjust the color of the county lines as needed
        'line-opacity': 0.1,
        'line-width': 3 // Adjust the width of the county lines
        }
    });
    map.addLayer({
        'id': 'schools-line-layer',
        'type': 'line',
        'source': 'schools',
        'paint': {
        'line-color': '#000000', // Adjust the color of the county lines as needed
        'line-opacity': 0.1,
        'line-width': 3 // Adjust the width of the county lines
        }
    });
    map.addLayer({
        'id': 'county-line-layer',
        'type': 'line',
        'source': 'counties',
        'paint': {
        'line-color': '#000000', // Adjust the default fill color of the counties as needed
        'line-opacity': 0, // Adjust the fill opacity of the counties
        'line-width': 4
        }
    });
    map.addLayer({
        'id': 'townships-fill-layer',
        'type': 'fill',
        'source': 'townships',
        'paint': {
        'fill-color': '#0000FF', // Adjust the default fill color of the counties as needed
        'fill-opacity': 0 // Adjust the fill opacity of the counties
        }
    });
    map.addLayer({
        'id': 'county-fill-layer',
        'type': 'fill',
        'source': 'counties',
        'paint': {
        'fill-color': '#000000', // Adjust the default fill color of the counties as needed
        'fill-opacity': 0 // Adjust the fill opacity of the counties
        }
    });
    map.addLayer({
        'id': 'schools-fill-layer',
        'type': 'fill',
        'source': 'schools',
        'paint': {
        'fill-color': '#FF0000', // Adjust the default fill color of the counties as needed
        'fill-opacity': 0 // Adjust the fill opacity of the counties
        }
    });

    // Information display div
    const infoDisplay = document.getElementById('info');

    map.on('click', (e) => {
        const countyFeatures = map.queryRenderedFeatures(e.point, { layers: ['county-fill-layer'] });
        const townshipFeatures = map.queryRenderedFeatures(e.point, { layers: ['townships-fill-layer'] });
        const schoolFeatures = map.queryRenderedFeatures(e.point, { layers: ['schools-fill-layer'] });

        const infoDiv = document.getElementById('info');
        const bottomText = document.getElementById('bottom-text');
        infoDiv.innerHTML = ''; // Clear previous content
        bottomText.innerHTML = ''; // Clear previous content

        let clickedCounty = ''
        let clickedTwp = ''
        let clickedSchool = ''
        //infoDiv.innerHTML += `<strong>Monthly Property Tax For Loan Amount: </strong> ${sliderValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
        infoDiv.innerHTML += `<strong><span style="color: purple;">Selected Area</span></strong><br>`;
        bottomText.innerHTML += `Use slider; Re-select area to updatee<br>`;

        if (countyFeatures.length > 0) {
        clickedCounty = countyFeatures[0].properties.NAME_2; // Extract county name from the GeoJSON property
        infoDiv.innerHTML += `<strong>County:</strong> <strong>${clickedCounty}</strong><br>`;
        }

        if (townshipFeatures.length > 0) {
            clickedTwp = townshipFeatures[0].properties.LABEL;
            infoDiv.innerHTML += `<strong><span style="color: blue;">Township/City:</span></strong> ${clickedTwp}<br>`;
        }

        //console.log(mapInfo[clickedCounty][clickedTwp]);
        let cost = 'Cost not calculated';

        if (schoolFeatures.length > 0 && mapInfo) {
        let clickedSchoolName = schoolFeatures[0].properties.NAME.toLowerCase().split(' ');
        clickedSchool = schoolFeatures[0].properties.NAME

        // Words to be filtered out
        const wordsToRemove = ['comm', 'community', 'school', 'schools'];

        // Remove specific words from the clickedSchoolName array
        clickedSchoolName = clickedSchoolName.filter(word => !wordsToRemove.includes(word));

        // Split words on dash ("-") and flatten the array
        clickedSchoolName = clickedSchoolName.flatMap(word => word.split('-'));

        let rate = 'Rate not found'; // Default message if rate is not found
        //console.log(clickedSchoolName);
        //console.log("^^ Real Clicked");
        const countyData = mapInfo[clickedCounty];
        
        if (countyData && countyData[clickedTwp]) {
            const schoolsInTownship = countyData[clickedTwp][0];

            Object.keys(schoolsInTownship).forEach(school => {
                const lowercaseSchool = school.toLowerCase();
                const schoolWords = lowercaseSchool.split(/[\s-]+/);
                //console.log(schoolWords);
                //console.log("^^ From JSON");

                // Check if any word in the clicked school name matches a word in the school name
                schoolWords.forEach(clickedWord => {
                    if (clickedSchoolName.includes(clickedWord)) {
                        rate = schoolsInTownship[school].Rate;
                    }
                });
            });
            const sliderValue = parseFloat(document.getElementById('real-slider').value);
            cost = ((sliderValue / 2000) * rate) / 12;
            yearly = cost * 12;
            cost = Math.floor(cost);
            yearly = Math.floor(yearly);

        }

        infoDiv.innerHTML += `<strong><span style="color: red;">School:</span></strong> ${schoolFeatures[0].properties.NAME}<br>`;
        //infoDiv.innerHTML += `<strong>Rate:</strong> ${rate}<br>`;
        infoDiv.innerHTML += `<strong style="font-size: 17px;">Property Tax: </strong>$<span style="font-size: 17px;">${cost} monthly | $${yearly} yearly</span><br>`;
        //infoDiv.innerHTML += `<strong style="font-size: 17px;">Yearly Property Tax:</strong>$<span style="font-size: 17px;">${yearly}</span><br>`;
        infoDiv.innerHTML += `<span style="font-size: 12px;">*Only an Estimate based on posted 2022 Michigan Millage Rates</span>`;
        }

        map.setPaintProperty('townships-fill-layer', 'fill-opacity', [
            'case',
            ['==', ['get', 'LABEL'], clickedTwp],
            0.4, // Change this to the desired opacity for the clicked county (0.5 for example)
            0.0 // Default opacity for other counties
            ]);

        map.setPaintProperty('county-fill-layer', 'fill-opacity', [
            'case',
            ['==', ['get', 'NAME_2'], clickedCounty],
            0.0, // Change this to the desired opacity for the clicked county (0.5 for example)
            0.3 // Default opacity for other counties
        ]);

        map.setPaintProperty('county-line-layer', 'line-opacity', [
            'case',
            ['==', ['get', 'NAME_2'], clickedCounty],
            1.0, // Change this to the desired opacity for the clicked county (0.5 for example)
            0.1 // Default opacity for other counties
            ]);

        map.setPaintProperty('schools-line-layer', 'line-opacity', [
            'case',
            ['==', ['get', 'NAME'], clickedSchool],
            1.0, // Change this to the desired opacity for the clicked county (0.5 for example)
            0.2 // Default opacity for other counties
        ]);

        map.setPaintProperty('townships-line-layer', 'line-opacity', [
            'case',
            ['==', ['get', 'LABEL'], clickedTwp],
            1.0, // Change this to the desired opacity for the clicked county (0.5 for example)
            0.2 // Default opacity for other counties
        ]);

        map.setPaintProperty('schools-fill-layer', 'fill-opacity', [
        'case',
        ['==', ['get', 'NAME'], clickedSchool],
        .25, // Change this to the desired opacity for the clicked county (0.5 for example)
        0.0 // Default opacity for other counties
        ]);

});

    // Change cursor to pointer when hovering over county fill
    map.on('mouseenter', 'county-fill-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back to default
    map.on('mouseleave', 'county-fill-layer', () => {
        map.getCanvas().style.cursor = '';
    });
    });
})
.catch(error => {
    console.error('Error fetching JSON:', error);
});

// Function to toggle school display for a township/city
function toggleSchools(element) {
const schoolsElement = element.nextElementSibling;
if (schoolsElement.style.display === 'none'){
    schoolsElement.style.display = 'block';
} 
else {
    schoolsElement.style.display = 'none';
}
}