
import { BadRequestException,  Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import {isValidObjectId, Model} from 'mongoose'
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { pokemonDto } from 'src/common/dto/pokemon-paginate.dto';


@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>
  ){}
  
  async create(createPokemonDto: CreatePokemonDto) {

    try {
      
      createPokemonDto.name = createPokemonDto.name.toLowerCase()
  
      const newPokemon = await this.PokemonModel.create( createPokemonDto )
  
      return newPokemon

    } catch (error) {
      this.handleExpeptions(error)
    }


  }

  findAll(pokemonDto:pokemonDto) {

    const {limit = 10,offset = 0} = pokemonDto

    console.log(limit,offset)

    return  this.PokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      id_pokemon:1
    })

  }

  async findOne(term: string) {

    let pokemon = Pokemon

    if(!isNaN(+term)){
      pokemon = await this.PokemonModel.findOne({id_pokemon : term})
    }

    //MongoId
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.PokemonModel.findById(term)
    }

    //Name
    if (!pokemon) {
      pokemon = await this.PokemonModel.findOne({ name: term.toLowerCase().trim() });
  }


    if(!pokemon) throw new BadRequestException(`Pokemon whit id ${term} not found`)

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {

      if(updatePokemonDto.name){
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
      }
  
      await this.PokemonModel.updateOne({_id:term},updatePokemonDto)
  
      const updatePokemon = await this.findOne(term)
  
      return updatePokemon

    } catch (error) {
      this.handleExpeptions(error)
    }

  }

  async remove(id: string) {
    try {
      
      const {deletedCount} = await this.PokemonModel.deleteOne({_id:id})

      if(deletedCount === 0) throw new BadRequestException(`Pokemon whit "${id}" not found`)
      
      return 

    } catch (error) {
      this.handleExpeptions(error)
    }
  }

  private handleExpeptions(error:any){
    if(error.code === 11000){
      throw new BadRequestException(`This pokemon already exist ${JSON.stringify(error.keyValue)}`)
    }

    throw new InternalServerErrorException('Error in the server-check logs')
  }

}
