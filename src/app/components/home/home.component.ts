import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeAPIService } from 'src/app/services/youtube/youtube-api.service';
import { startWith } from 'rxjs/operators';
const CACHE_KEY = 'listOfVideos' ;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   //For getting the list of videos
   listOfVideos: any[]=[];
  
   channelID = 'UCWOA1ZGywLbqmigxE4Qlvuw';
   maxLength = 50 ;
 
   //For the search
   title:string = '';
   
   //For the pagination
   totalLength:any;
   page:number=1;

   //For the favorites
   favorites:any;
   getFavorites:any ;

  constructor(
    private youTubeService: YoutubeAPIService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVideos(); 
    this.cacheVideos();
  }

/*====================================  Getting videos from given youtube channel ===============================*/
getVideos()
{
  this.youTubeService.getVideosForChanel(this.channelID,this.maxLength)
  .subscribe((list)=>{
    this.totalLength = list.length;
    for(let element of list["items"])
    {
      this.listOfVideos.push(element);
    }
    console.log(this.listOfVideos);
  })
}

/*====================================  Caching videos to local storage ===============================*/
cacheVideos()
{
  this.youTubeService.getVideosForChanel(this.channelID,this.maxLength)
  .subscribe(next => {
    localStorage[CACHE_KEY] = JSON.stringify(next);
  })
  this.youTubeService.getVideosForChanel(this.channelID,this.maxLength)
  .pipe(startWith(JSON.parse(localStorage[CACHE_KEY] || '[]')));  
}

/*====================================  Sending video details to details page ===============================*/
viewDetails(videoID:any)
{
  this.router.navigate(['/Details',videoID]);
}

/*====================================  Search Function ===============================*/
Search()
{
    if(this.title!=""){
      this.listOfVideos=this.listOfVideos.filter(res=>{
        return res.snippet.title.toLowerCase().match(this.title.toLowerCase());
      })
    }
    else if (this.title == "")
    {
      this.ngOnInit();
    }
  }

 /*====================================  Getting favorites list from local Storage ===============================*/
  showFav(){
   this.getFavorites = localStorage.getItem('favorites');
   this.favorites = JSON.parse(this.getFavorites)
   console.log(this.favorites) ;
  }
}
