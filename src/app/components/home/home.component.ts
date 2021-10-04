/**
 * Created By : Jabed Al Hassan 
 */

 import { Component, OnInit } from '@angular/core';
 import { RouterModule, Routes ,Router} from '@angular/router';

 // Components
 import { PokemonListComponent } from '../pokemon/list/pokemon-list.component';
 import { PokemonDetailsComponent } from '../pokemon/details/pokemon-details.component';

 // Services
 import { routerTransition } from '../../services/config/config.service';

 @Component({
 	selector: 'app-home',
 	templateUrl: './home.component.html',
 	styleUrls: ['./home.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })


 export class HomeComponent implements OnInit {
 	active: string;
 	constructor(private router: Router) {
 		this.router.events.subscribe((val) => {
 			this.routeChanged(val);
 		});
 	}

 	ngOnInit() {
 	}

 	// Detect route changes for active sidebar menu
 	routeChanged(val) {
 		this.active = val.url;
 	}

 	
 }


 // Define and export child routes of HomeComponent
 export const homeChildRoutes : Routes = [
 {
 	path: '',
 	component: PokemonListComponent
 },
 {
 	path: 'detail/:id',
 	component: PokemonDetailsComponent
 }
 ];

/**
 * Created By : Jabed Al Hassan 
 */
