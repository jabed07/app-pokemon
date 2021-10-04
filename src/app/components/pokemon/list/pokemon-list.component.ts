/**
 * Created By : Jabed Al Hassan 
 */

import { Component, OnInit } from '@angular/core';

// Services
import { PokemonService } from '../../../services/pokemon/pokemon.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class PokemonListComponent implements OnInit {
	paginationList: any = [10, 20, 50];
	sortList: any = [{ name: "Name", value: "name" }, { name: "Height", value: "height" }, { name: "Weight", value: "weight" }];
	limitIndex: number = 20;
	offsetValue: number = 0;
	pokemonListData: any;
	pokemonList: any = [];
	constructor(private pokemonService: PokemonService) { }
	// Call pokemon list function on page load 
	ngOnInit() {
		this.getAllPokemon();
	}


	public getAllPokemon() {
		this.pokemonList = [];
		this.pokemonService.getAllPokemonList(this.limitIndex, this.offsetValue).subscribe((data: any) => {
			if (data.results.length > 0) {
				const pokemonIDS = data.results;
				pokemonIDS.forEach((pokemon: any) => {
					this.getPokemonById(pokemon.url);
				})
			}

		});
	}
	public getPokemonById(pokemonUrl: any) {
		this.pokemonService.getAllPokemonByIds(pokemonUrl).subscribe((data: any) => {
			this.pokemonList.push(data);
		});
	}
	public getIncrementedData(value) {
		this.limitIndex = value;
		this.getAllPokemon();
	}
	public getPreviousData() {
		if (this.limitIndex > 10) {
			this.limitIndex = this.limitIndex - 10;
			this.offsetValue = this.offsetValue > 10 ? this.offsetValue - 10 : 0;
		} else {
			this.limitIndex = 10;
			this.offsetValue = 10;
		}
		this.getAllPokemon();
	}
	public getNextData() {
		if (this.limitIndex > 10) {
			this.limitIndex = this.limitIndex + 10;
			this.offsetValue = this.offsetValue + 10;
		} else {
			this.limitIndex = 10;
		}
		this.getAllPokemon();
	}

	public isActive(item) {
		return this.limitIndex === item;
	};
	public sortPokeMonBy(value) {
		if (value === "name") {
			this.pokemonList = this.pokemonList.sort((a, b) => a.name.localeCompare(b.name))
		} else if (value === "height") {
			this.pokemonList = this.pokemonList.sort((a, b) => {
				return a.height - b.height;
			});
		} else {
			this.pokemonList = this.pokemonList.sort((a, b) => {
				return a.weight - b.weight;
			});
		}
	}

}
/**
 * Created By : Jabed Al Hassan
 */
