import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Track } from '../model/track.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient:HttpClient) { }

  public search(text: string): Observable<Track[]>{

    const token = environment.token
    const endpoint = `${environment.searchEndpointStart}${text}${environment.searchEndpointFinal}`
    const url = `${environment.spotifyUrl}${endpoint}`

    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get(`${url}`, { headers: headers}).pipe(
      map((data: any) => this.mapResponse(data))
    )
  }

  private mapResponse(data:any):Track[]{
    return data.tracks.items.map((element:any) => {
      const name = element.name
      const artists = element.artists.map((singer: any) => singer.name)
      const image = element.album.images[1].url
      const link = element.external_urls.spotify
      return new Track(name, artists, image, link)

    })
  }
}