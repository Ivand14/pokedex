import axios, { AxiosInstance } from 'axios';

import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>
  ){}
  

  private readonly axios: AxiosInstance = axios

  
  async executeSeed(){

    await this.PokemonModel.deleteMany()

    const res = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemonInsert : {name: string,id_pokemon: number}[] = []

    res.data.results.map(({name,url}) => {
      const id_pokemon:number = +url.split('/')[6]
      // await this.PokemonModel.create({name,id_pokemon}) Es una opcion
      pokemonInsert.push({name,id_pokemon})
    })

    // * La opcion mas eficaz

    await this.PokemonModel.insertMany(pokemonInsert)
    
    return 'Seed executed'
    
  }
}
