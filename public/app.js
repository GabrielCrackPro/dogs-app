const dogContainer = document.querySelector('.dog-container')

const randomImageURL = "https://dog.ceo/api/breeds/image/random"

const getData = async (url) => {
let data = await fetch(url).then(response => response.json())
return data
}

const showDogs = async () => {
let data = await getData(randomImageURL)
let dog = {
 image: data.message,
  name: data.message.split("/")[4].split("-").reverse().join(" "),
  random: `https://dog.ceo/api/breed/${data.message.split('/')[4].split("-").reverse().join("-")}/images`
}
let randomBreedImages = await getData(dog.random) 
dogContainer.innerHTML = `
<h3 class="text-capitalize">${dog.name}</h3>
<img src="${dog.image}" alt="dog-img">
<div class="similar">
 <h3 class="text-capitalize text-center">Similar Images</h3>
</div>
<button class="btn btn-sm btn-dark more-btn">Learn More <i class="fas fa-paw"></i></button>
`
const moreBtn = document.querySelector('.more-btn')
const similarDogsContainer = document.querySelector('.similar')

moreBtn.addEventListener('click', () => {
window.open(`http://wikipedia.org/wiki/${data.message.split("/")[4]}`)
})

for(let i = 0; i <= 13; i++){
similarDogsContainer.innerHTML += `
<img src="${randomBreedImages.message[i]}" alt="dog-img">
`
let similarImages = similarDogsContainer.querySelectorAll('img')
similarImages.forEach(image => {
image.addEventListener('mouseenter', () => image.classList.add('hover'))
image.addEventListener('mouseleave', () => image.classList.remove('hover'))
image.addEventListener('click', () => {
window.open(image.src)
})
})
}
}
window.onload = showDogs
