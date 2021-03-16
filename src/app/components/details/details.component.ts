import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeAPIService } from 'src/app/services/youtube/youtube-api.service';
import {Location} from '@angular/common'
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  //for retrieving video data
  video:any;
  vidID:any;
  duration:any;

  //for the rating
  starRating = 0; 

  //for getting favoriteList
  favorites:any;
  getFavorites:any;

  firestoreFav:any[]=[];
  
  constructor(
    private youtubeService: YoutubeAPIService,
    private favService: FavoritesService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getVideo();
  }

 /*==================================== Getting the details of a specific video. ===============================*/
  getVideo(){
    //Capturing the id of the video from navigating
    this.activatedRoute.paramMap.subscribe((params)=>{
      let videoID:any = params.get('videoID');
      this.vidID = videoID;
      this.youtubeService.getSpecificVideo(this.vidID).subscribe(
      ((item)=>{
        this.video = item["items"][0];
        console.log(this.video);
      })
      )
      
    })
    
  }

 /*========================== this both adds the favorite list to the local storage and to the firestore. ================*/
  setFavorites(){
    this.favService.addToFavorites(this.video, this.starRating);
  }

  /*==================================== Getting the favorite list from the local storage. ===============================*/
  showFav(){
    this.getFavorites = localStorage.getItem('favorites');
    this.favorites = JSON.parse(this.getFavorites)
    console.log(this.favorites) ;
  }

  /*==================================== Getting the favorite list from firestore ===============================*/
  getFavList(){
      this.favService.retrieveFav().subscribe(
        (res) =>{
          console.log(res);
          res.forEach((element)=>{
            //console.log(element.payload.doc.data());
            this.firestoreFav.push(element.payload.doc.data())
          })
        },
        (err)=>{
          console.log(err);
        }
      )

    }
  goBack(){
    this.location.back();
  }
  
  /*==================================== Displaying duration in a more readable manner. ===============================*/
  displayDuration(duration:string){
    duration = duration.substring(2);
    const replaceH = /H/gi;
    const replaceM = /M/gi;
    const replaceS = /S/gi;
  
    var result = duration.replace(replaceM, ":");
    var finalResult = result.replace(replaceS, ' ');
    return finalResult;
  }

  
}
