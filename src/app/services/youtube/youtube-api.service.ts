import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeAPIService {

  videoID: any;
  apiKey : string = 'AIzaSyCBz1lmOBdfF1Ia9ByyMYYBPPIVHtDKxr8';

  constructor(public http : HttpClient) { }

 /*====================================  Getting listOfVideos from a specific channel ===============================*/
  getVideosForChanel(channel:string, maxResults:number): Observable<any> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet&type=video,id&maxResults=' + maxResults
    return this.http.get(url).pipe(map((res) => {
      return res;
    }));
  }
  
  /*====================================  Getting details of a specific video ===============================*/
  getSpecificVideo(vID: string): Observable<any>{
    let URL= 'https://www.googleapis.com/youtube/v3/videos?id=' + vID + '&key=' + this.apiKey + '&part=snippet,contentDetails,statistics,status'
    return this.http.get(URL).pipe((res)=>{
       return res;
    });
  }

}
