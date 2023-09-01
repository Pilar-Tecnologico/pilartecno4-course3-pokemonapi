import express from 'express'
import pokemonData from './pokemon.json' assert { type: 'json' };

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    const { query } = req
    res.status(200).json({
        message: `Hola mundo ${query.name}`,
        query: query
    })
})

app.get('/name', (req, res) => {
    const { name } = req.query
    res.json({
        message: `Hola ${name} ¿Cómo te va?`,
    })
})

app.get('/pokemons', (req, res) => {
    const {type} = req.query
    let pokemons = pokemonData
    if(type){
        pokemons = pokemonData.filter((pokemon) => pokemon.type.includes(type))
    }
    res.status(200).json(pokemons)
})

app.get('/pokemons/:name', (req, res) => {
    const name = req.params.name
    const pokemon = pokemonData.find((pokemon) => pokemon.name === name)
    if(!pokemon) {
        res.status(404).json({
            error: 'POKEMON_NOT_FOUND',
            message: `Pokemon ${name} not found in the database`
        })
    }
    res.status(200).json(pokemon)
})

app.post('/pokemons', (req, res) => {
    const { id, name, type, base_experience } = req.body
    if(!id || !name || !type || !base_experience){
        res.status(400).json({
            error: 'BAD_REQUEST',
            message: `There are missing params for this request`
        })
    }
    res.status(200).json({
        status: 'OK'
    })
})

app.listen(PORT, () => {
    console.log('Servidor express iniciado en', PORT)
})