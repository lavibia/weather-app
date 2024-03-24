import './style.css';
console.log('im here');

const KEY='f852f0db70844505a91155804242103';
fetch('https://api.weatherapi.com/v1/current.json?key=f852f0db70844505a91155804242103&q=london', {mode: 'cors'})
.then(function(response) {
  return response.json();
})
.then(function(response) {
  console.log(response);
});