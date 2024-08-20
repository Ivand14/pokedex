import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {
    
    @IsPositive()
    @IsInt()
    @Min(1)
    id_pokemon:number

    
    @MinLength(1)
    @IsString()
    name:string

    
}
