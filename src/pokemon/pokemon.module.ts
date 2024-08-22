import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { SeedModule } from './seed/seed.module';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Pokemon.name,
        schema: PokemonSchema
      }
    ]),
    SeedModule
  ]
})
export class PokemonModule {}
