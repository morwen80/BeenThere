const container = document.querySelector('.country-container')
const countryForm = document.querySelector('#addCountry')
const ulList = document.querySelector('#list')
const access_key = '563492ad6f91700001000001a182fc7bff5344259025118fe8a0db7a'
const getData = async (url, key = null) => {
  const header = key ? { headers: {Authorization: key}} : null;
  return fetch(url, header)
  .then(res => res.json())
}

const getRandom = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
}

const addACountry = async (event) => {
  event.preventDefault();

  const inputEl = event.target.querySelector('#countryName')
  const inputValue = inputEl.value
  const countries = await getData(`https://restcountries.eu/rest/v2/name/${inputValue}`)
  // const myCountry = countries.find(country => country.name === inputValue)
  const myCountry = countries.find(country => country.name.includes(inputValue))
  const group = document.querySelector(`.${myCountry.region.toLowerCase()}`)
  let myEl = document.createElement('li')
  myEl.innerText = myCountry.name
  group.appendChild(myEl)
  group.querySelector('.counter').innerText = `(${group.querySelectorAll('li').length})`
  inputEl.value = ""

  addAPicture(myCountry);

  myEl.addEventListener('click', () => {
  myEl.remove()
})
}

countryForm.addEventListener('submit', addACountry)



const addAPicture = async (country) => {
  const picDiv = document.querySelector('#showPicture')

  const countryPhotoAPI = await getData(`https://api.pexels.com/v1/search/?page=${getRandom(1, 20)}&per_page=1&query=${country.name}`, access_key)
  const imgUrl = countryPhotoAPI.photos[0].src.large;

  picDiv.innerHTML = `<img src=${imgUrl}>`
}
