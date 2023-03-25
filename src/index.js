import { debounce } from 'debounce';
import Notiflix from 'notiflix';
// import addCountry from './templates.addcountry.hbs';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCounrty, DEBOUNCE_DELAY));

function searchCounrty(event) {
  const countryName = event.target.value.trim();
  if (countryName === '') {
    clearHTML();
    return;
  }
  console.log(countryName);
  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        cleanHTML();
        Notiflix.Notify.info(
          '"Too many matches found. Please enter a more specific name."'
        );
        return;
      } else if (data.length < 2) {
        cleanHTML();
        addCountry(data);
      } else {
        cleanHTML();
        addListCountry(data);
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(err);
    });
}

function languages(languages) {
  const langArray = Object.values(languages);
  return langArray.join(', ');
}

function addCountry(data) {
  for (const country of data) {
    countryInfo.innerHTML = `
    <div class='contry_info-head'>
<img src='${country.flags.svg}' alt='${
      country.flags.alt
    }' class='flag' width='50'/>
<h2>${country.name.common}</h2>
</div>

<ul class='list-country'>
<li>
  <p>
    <span class='parameter'>Capital:</span>
    ${country.capital}</p>
</li>
<li>
  <p>
    <span class='parameter'>Population:</span>
    ${country.population}
  </p>
</li>
<li>
  <p>
    <span class='parameter'>Languages:</span>
    ${languages(country.languages)}</p>
</li>
<li></li>
</ul>
    `;
  }
}

function addListCountry(data) {
  const array = [];
  for (let country of data) {
    const item = document.createElement('li');
    item.setAttribute('class', 'list-item');

    item.innerHTML = `    
    <img src="${country.flags.svg}" alt="${country.flags.alt}" width = '30'>
    ${country.name.common}  
    `;
    array.push(item);
  }
  countryList.append(...array);
}

function cleanHTML() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
