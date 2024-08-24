

import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from './../common/adapter/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>,
    private readonly Http: AxiosAdapter
  ){}
  


  
  async executeSeed(){

    await this.PokemonModel.deleteMany()

    const res = await this.Http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemonInsert : {name: string,id_pokemon: number}[] = []

    res.results.map(({name,url}) => {
      const id_pokemon:number = +url.split('/')[6]
      // await this.PokemonModel.create({name,id_pokemon}) Es una opcion
      pokemonInsert.push({name,id_pokemon})
    })

    // * La opcion mas eficaz

    await this.PokemonModel.insertMany(pokemonInsert)
    
    return 'Seed executed'
    
  }
}
