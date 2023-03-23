import { debounce } from 'debounce';
import Notiflix from 'notiflix';

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
    return;
  }
  console.log(countryName);
  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          '"Too many matches found. Please enter a more specific name."'
        );
      } else if (data.length < 2) {
        console.log('ура только одна', data);
      } else {
        console.log(data);
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
