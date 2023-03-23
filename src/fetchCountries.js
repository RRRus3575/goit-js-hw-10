function fetchCountries(countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,capital,population,languages`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}

export { fetchCountries };
