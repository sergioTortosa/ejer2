import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = '3zkh6RjTtJjSIRfSG2GG7iGBr0hItTmD';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    if (
      localStorage.getItem('historial') &&
      localStorage.getItem('resultados')
    ) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

const params = new HttpParams().set('api_key', this.apiKey)
                                .set('limit', '10')
                                .set('q', query);


    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=3zkh6RjTtJjSIRfSG2GG7iGBr0hItTmD&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
