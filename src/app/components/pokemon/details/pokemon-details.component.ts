/**
 * Created By : Jabed Al Hassan 
 */
 import { Component, OnInit } from '@angular/core';
 import { Router,ActivatedRoute} from '@angular/router';

 // Services
 import { PokemonService } from '../../../services/pokemon/pokemon.service';
 import { routerTransition } from '../../../services/config/config.service';

 @Component({
 	selector: 'app-pokemon-details',
 	templateUrl: './pokemon-details.component.html',
 	styleUrls: ['./pokemon-details.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })

 export class PokemonDetailsComponent implements OnInit {
 	index: any;
	isAbilities: boolean = false;
	isMove: boolean = false;
	isType: boolean = false;
	isGames: boolean = false;
	isBasic: boolean = true;
 	pokemonDetails: any;
	abilityDetails: any = [];
	typeDetails: any = [];
	gameDetails: any = [];
	abilityList: any;
	movesList: any;
	typesList: any;
 	constructor(private router: Router, private route: ActivatedRoute, private pokemonService:PokemonService) { 
 		// Get user detail index number sent in params
 		this.route.params.subscribe(params => {
 			this.index = params['id'];
 			if (this.index && this.index != null && this.index !== undefined) {
				 this.getPokemonDetails(this.index);
 			}
 		});
 	}

 	ngOnInit() {
 	}

 	// Get pokemon details 
	 getPokemonDetails(index:number){
	this.pokemonService.getPokemonDetailsById(index).subscribe((data: any) => {
		if(data){
			this.pokemonDetails = data;
		}
	} );
	}
	public getAbilities(abilities){
		this.abilityList = abilities;
		this.isMove = false;
		this.isType = false;
		this.isGames = false;
		this.isBasic = false;
		this.isAbilities = true;
		abilities.forEach((ability)=>{
			this.pokemonService.getAllSubData(ability.ability.url).subscribe((abilityData: any) =>{
				if(abilityData){
					this.abilityDetails.push(abilityData);
				}
			} );
		});
	}
	public getMoves(movesData){
		this.isAbilities =false;
		this.isMove = true;
		this.isType = false;
		this.isGames = false;
		this.isBasic = false;
		this.movesList = movesData;
	}
	public getTypes(typesData){
		this.isAbilities =false;
		this.isMove = false;
		this.isType = true;
		this.isGames = false;
		this.isBasic = false;
		this.typesList = typesData;
		typesData.forEach((typeData)=>{
			this.pokemonService.getAllSubData(typeData.type.url).subscribe((typeData: any) =>{
				if (typeData) {
					this.typeDetails.push(typeData);
				}
			} );
		});
	}
	public getBasicDetails(){
		this.isAbilities =false;
		this.isMove = false;
		this.isType = false;
		this.isGames = false;
		this.isBasic = true;
	}
	public getGames(gamesData){
		this.isAbilities =false;
		this.isMove = false;
		this.isType = false;
		this.isGames = true;
		this.isBasic = false;
		gamesData.forEach((gameData)=>{
			this.pokemonService.getAllSubData(gameData.version.url).subscribe((typeData: any) =>{
				if(typeData){
					this.gameDetails.push(typeData);
				}
			} );
		});
	}

 }

/**
 * Created By : Jabed Al Hassan 
 */