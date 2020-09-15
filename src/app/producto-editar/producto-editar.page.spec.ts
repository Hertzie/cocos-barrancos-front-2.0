import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductoEditarPage } from './producto-editar.page';

describe('ProductoEditarPage', () => {
  let component: ProductoEditarPage;
  let fixture: ComponentFixture<ProductoEditarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoEditarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
