const resultslist = document.getElementById('results');
const output = document.getElementById('container');

const url = "https://api.inaturalist.org/v1/identifications?place_id="
const urllist = "https://api.inaturalist.org/v1/places/autocomplete?q="

let results = null;

async function getPlace(place_id) {
    const response = await fetch(url + place_id);
    if (response.ok) {
        const data = await response.json();
        displayCards(data);
    }
}

function displayCards(data) {
    results = data.results;

    output.innerHTML = '';
    
    results.forEach((identification) => {
        let phototemplate = '';
        identification.observation.photos.forEach((photo) => {
            phototemplate += `<img src="${photo.url}" alt="{}">`;
        });

        const template = `
        <div id='datacards'>
            <h4>${identification.observation.taxon.preferred_common_name} </h4>  
            ${phototemplate}
        </div>
        `;
        output.innerHTML += template;
    })
}

function displayList(data) {
    console.log(data)

    resultslist.innerHTML = '';
    
    data.results.forEach((place) => {
        const listtemplate = `<li> <button data-url="${place.id}"> ${place.display_name} </button> </li> `;
        
        resultslist.innerHTML += listtemplate;
    });

    const buttons = resultslist.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.add("selected")
            getPlace(button.dataset.url);
        });
    });
}

async function getPlaceList(url, query) {
    const listresponse = await fetch(url + query);
    if (listresponse.ok) {
        const data = await listresponse.json();
        displayList(data);
    };
}

document.querySelector("#search").addEventListener("submit", (ev) => {
    // Get input from search bar
    // Send it to getPlaceList
    ev.preventDefault();
    const searchBar = document.querySelector('#place');
    getPlaceList(urllist, searchBar.value) 
})


// Use breakpoints to see what's inside variables in the code.
// Merge branch to main