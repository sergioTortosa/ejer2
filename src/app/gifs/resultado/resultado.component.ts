import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styles: [],
})
export class ResultadoComponent {
  get resultados() {
    return this.GifsService.resultados;
  }

  constructor(private GifsService: GifsService) {}
}
