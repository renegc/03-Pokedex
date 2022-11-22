import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  private defaultLimit :number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService
  ) {
   
this.defaultLimit = configService.get('defaultLimit')


  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toUpperCase();

try {
  const pokemon = await this.pokemonModel.create(createPokemonDto)

  return pokemon;
  
} catch (error) {
  this.handleExceptions(error)
 
}
   
  }

  async findAll(paginationDto: PaginationDto) {

    const {limit = this.defaultLimit, offset=0} = paginationDto

    return await this.pokemonModel.find().limit(limit).skip(offset).sort({
      no: 1
    })
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({no: term })
      
    }

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({no: term })
      
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
      
    }

    if (!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toUpperCase().trim() })
    }

    if (!pokemon) throw new NotFoundException  (`Pokemon con el id, name o el id "${term}`)


    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term)

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toUpperCase()
      
    }

   


    try {
      const updatedPokemon = await pokemon.updateOne(updatePokemonDto)
    
      return {...pokemon.toJSON(), ...updatePokemonDto};
      
    } catch (error) {
     this.handleExceptions(error)
     
    }

   
  }

async  remove(id: string) {
   /*  const pokemon = await this.findOne(id)

    await pokemon.deleteOne(); */

    //const pokemon = await this.pokemonModel.findByIdAndDelete(id)

    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id} )

    if (deletedCount ===0) {
      throw new BadRequestException(`El Pokemon con el id ${id} no ha sido encontrado`)
      
    }



    return ;
  }

  private handleExceptions(error: any) {

    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
      
    }
    console.log(error)
    throw new InternalServerErrorException(`no se peude crear el pokemon xd`)

  }


}



