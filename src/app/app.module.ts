import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';

//Modules
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { PokemonService } from './services/pokemon/pokemon.service';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';

// Components
import { AppComponent } from './components/index/app.component';
import { PokemonListComponent } from './components/pokemon/list/pokemon-list.component';
import { PokemonDetailsComponent } from './components/pokemon/details/pokemon-details.component';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';



// Parent Routes
const routes : Routes = [
{
	path: '',
	component: HomeComponent,
	children :homeChildRoutes,
	canActivate : []
},
{
	path: '**',
	redirectTo: ''
}
];

@NgModule({
	declarations: [
	AppComponent,
	PokemonListComponent,
	PokemonDetailsComponent,
	HomeComponent,
	FilterPipe,
	],
	imports: [
	BrowserModule,
	RouterModule,
	RouterModule.forRoot(routes),
	FormsModule,
	ReactiveFormsModule,
	BrowserAnimationsModule,
	HttpClientModule,
	],
	providers: [PokemonService, HttpClient],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

// enableProdMode();

export class AppModule { }
