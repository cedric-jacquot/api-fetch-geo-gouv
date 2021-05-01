// exemple avec la ville "gondreville"
// https://geo.api.gouv.fr/communes?codePostal=54840&fields=,nom,code,codesPostaux,centre,surface,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre

const elementInputZipcode = document.getElementById('zipcode');
const elementSelectCity = document.getElementById('city');

const elementP = document.getElementById('cp');
const elementAPILink = document.getElementById('api-link');

let fetOptions =
{
    mode: 'cors',
}

function api() {
    let zipcode = elementInputZipcode.value;

    // clear select options
    elementSelectCity.options.length = 1;

    if (zipcode.length > 4) {

        let APILink = "https://geo.api.gouv.fr/communes?codePostal=" + zipcode + "&fields=,nom,code,codesPostaux,centre,surface,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre";

        fetch(APILink, fetOptions)
            .then(convertFromJson)
            .then(displayCities);
    }
}

// convert response in json
function convertFromJson(response) {
    return data = response.json();
}

// then add cities to select options
function displayCities(cities) {
    console.log(cities);

    for (let city in cities) {
        console.log(cities[city].nom);

        // create option element
        let option = document.createElement('option');
        // add city name
        option.text = cities[city].nom + " (code insee : " + cities[city].code + ")";
        // add city insee code
        option.value = cities[city].code;
        // add to option's select to the DOM
        elementSelectCity.add(option);
    }
}

elementInputZipcode.addEventListener('blur', api);