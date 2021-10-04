/**
 * Created By : Jabed Al Hassan
 */

 import { Injectable } from '@angular/core';
 import { HttpClient } from "@angular/common/http";

 @Injectable()
 export class PokemonService {

   constructor(private httpClient: HttpClient,) { }

   getPokemonDetailsById(index:number){
    return this.httpClient.get("https://pokeapi.co/api/v2/pokemon/"+ index).pipe(data => data);
   }

   getAllPokemonList(limitValue,offsetValue){
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon?limit=`+limitValue+`&offset=`+offsetValue).pipe(data => data);
   }
   getAllPokemonByIds(pokemonUrl){
    return this.httpClient.get(pokemonUrl).pipe(data => data);
   }
   getAllSubData(url){
    return this.httpClient.get(url).pipe(data => data);
   }


 }
/**
 * Created By : Jabed Al Hassan
 */
