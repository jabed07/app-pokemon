/**
 * Created By : Jabed Al Hassan
 */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import { of } from 'rxjs/observable/of';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { ConfigService, routerTransition } from '../../../services/config/config.service';
import { PokemonService } from '../../../services/pokemon/pokemon.service';

import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockPokemonService: PokemonService;
  const mockPokemonList = [{name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/"}, {name: "cata",
  url: "https://pokeapi.co/api/v2/pokemon/2/"}];
  const mockPokemonObj = {results: mockPokemonList};
  const mockpokemonDetails = [{name: "cat", height: 2, weight: 4 }, {name: "dog", height: 8, weight: 43}];
  const mockPokemonResponse = of(mockPokemonObj);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonListComponent, FilterPipe],
      imports: [HttpClientModule, FormsModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{ path: "", component: PokemonListComponent }])],
      providers: [PokemonService, ConfigService, BrowserAnimationsModule, routerTransition]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    mockPokemonService = fixture.debugElement.injector.get(PokemonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    spyOn(mockPokemonService, "getAllPokemonList").and.returnValue(mockPokemonResponse);
    component.pokemonList = mockpokemonDetails;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should call sortPokeMonBy name', () => {
    spyOn(mockPokemonService, "getAllPokemonList").and.returnValue(mockPokemonResponse);
    component.pokemonList = mockpokemonDetails;
    component.sortPokeMonBy("name");
    expect(component.pokemonList.length).toBeGreaterThanOrEqual(1);
  });
  it('should call sortPokeMonBy height', () => {
    spyOn(mockPokemonService, "getAllPokemonList").and.returnValue(mockPokemonResponse);
    component.pokemonList = mockpokemonDetails;
    component.sortPokeMonBy("height");
    expect(component.pokemonList.length).toBeGreaterThanOrEqual(1);
  });
  it('should call sortPokeMonBy weight', () => {
    spyOn(mockPokemonService, "getAllPokemonList").and.returnValue(mockPokemonResponse);
    component.pokemonList = mockpokemonDetails;
    component.sortPokeMonBy("weight");
    expect(component.pokemonList.length).toBeGreaterThanOrEqual(1);
  });

  it('should call getNextData when limit is greater than 10', () => {
    component.limitIndex = 50;
    component.getNextData();
    expect(component.limitIndex).toBe(60);
  });

  it('should call getPreviousData when limit is greater than 10', () => {
    component.limitIndex = 50;
    component.getPreviousData();
    expect(component.limitIndex).toBe(40);
  });
});
/**
 * Created By : Jabed Al Hassan
 */
