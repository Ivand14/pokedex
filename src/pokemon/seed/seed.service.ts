import axios, { AxiosInstance } from 'axios';

import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios

  
  async executeSeed(){
    const res = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=5')

    res.data.results.map(({name,url}) => {
      const id_pokemon:number = +url.split('/')[6]
    })
    
    return res.data.results
  }
}
