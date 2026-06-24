const resultslist = document.getElementById('results');
const output = document.getElementById('container');

const url = "https://api.inaturalist.org/v1/identifications"
const urllist = "https://api.inaturalist.org/v1/places"

let results = null;

// function matchSearch() {
//     return ;
// }

async function getPlace(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        displayCards(data);
    }
}

function displayCards(data) {
    results = data;

    const template = `<h1>Place: ${data.name} </h1>`
    
    output.innerHTML = template;
}


function displayList(data) {
    console.log(data)

    resultslist.innerHTML = '';
    
    resultslist.forEach((place) => {
        const listtemplate = `<li> <button data-url="${place.url}"> ${place.display_name} </button> </li> `;
        
        resultslist.innerHTML += listtemplate;
    });

    const buttons = resultslist.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            getPlace(button.dataset.url);
        });
    });
}

async function getPlaceList(url) {
    const listresponse = await fetch(url);
    if (listresponse.ok) {
        const data = await listresponse.json();
        displayList(data);
    };
}

getPlace(url);
getPlaceList(urllist);

// function selectedResults() {
//     return ;
// }



