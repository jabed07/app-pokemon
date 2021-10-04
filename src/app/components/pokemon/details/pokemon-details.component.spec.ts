/**
 * Created By : Jabed Al Hassan
 */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { ConfigService, routerTransition } from '../../../services/config/config.service';
import { PokemonService } from '../../../services/pokemon/pokemon.service';

import { PokemonDetailsComponent } from './pokemon-details.component';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let mockPokemonService: PokemonService;
  const mockpokemonDetails = [{name: "cat", height: 2, weight: 4 }, {name: "dog", height: 8, weight: 43}];
  const mockPokemonResponse = of(mockpokemonDetails);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonDetailsComponent ],
      imports: [HttpClientModule, FormsModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([{ path: "", component: PokemonDetailsComponent }])],
      providers: [PokemonService, ConfigService, BrowserAnimationsModule, routerTransition]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    mockPokemonService = fixture.debugElement.injector.get(PokemonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getPokemonDetails with id', () => {
    spyOn(mockPokemonService, "getPokemonDetailsById").and.returnValue(mockPokemonResponse);
    component.getPokemonDetails(12);
    expect(component.pokemonDetails).toBeDefined();
  });


});
/**
 * Created By : Jabed Al Hassan
 */
