import { ConfigModule, ConfigService } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { EnviromentsConfig } from './common/config/app.config';
import { JoiValidationSchema } from './common/config/joi.validation';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnviromentsConfig],
      validationSchema: JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    PokemonModule,
    MongooseModule.forRoot(process.env.MONGO_DB,{dbName:'Pokemons'}),
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  constructor(
    private readonly configService:ConfigService
  ){}
}
