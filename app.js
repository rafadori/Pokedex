const page = document.querySelector('#pokedex-page')

const colorTypes = {
    normal: 'light',
    fairy: 'light',
    fire: 'danger',
    grass: 'success',
    electric: 'warning',
    psychic: 'dark',
    ground: 'dark',
    rock: 'dark',
    ghost: 'dark',
    fighting: 'dark',
    water: 'primary',
    ice: 'primary',
    dragon: 'secondary',
    bug: 'success',
    poison: 'sucess'
}
fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // endpoint que irá nos retornar apenas os pokémons de primeira geração
    .then(response => {
        return response.json()
    })
    .then(async data => {
        const box = document.querySelector('#pokemon-box')
        page.innerHTML = ''
        for(let i = 0; i < data.results.length; i++) { // fazendo um 'for' para percorrer cada resultado obtido pelo fetch
            box.querySelector('#pokemon-name').innerHTML = data.results[i].name
            box.querySelector('#pokemon-name').style.textTransform = "capitalize"
            const pokemonType = await fetch('https://pokeapi.co/api/v2/pokemon/' + data.results[i].name)
            const type = await pokemonType.json()
            box.querySelector('#pokemon-type').innerHTML = type.types[0].type.name
            box.querySelector('#pokemon-type').style.textTransform = "capitalize"
            const boxType = box.querySelector('#pokemon-type')
            boxType.classList = `btn btn-${colorTypes[type.types[0].type.name]}`
            const pokemonImage = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + data.results[i].name)
            const image = await pokemonImage.json()
            //box.querySelector('#pokemon-type').innerHTML = data.results[i].name
            box.querySelector('#pokemon-img').src = image.sprites.front_default
            page.innerHTML += box.outerHTML
        }
    })