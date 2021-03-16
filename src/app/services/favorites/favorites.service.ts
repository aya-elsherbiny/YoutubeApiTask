import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoriteList: {video:any, rating:number}[]=[];
  constructor(
    private afs: AngularFirestore
  ) { }

  
  /*==================================== Saving the favorite list to the local storage ===============================*/
  addToFavorites(video:any, rating:number)
  {
    this.favoriteList.push({video,rating});
    //sending each object to the firestore collection to store the title, image and rating.
    for(let element of this.favoriteList)
    {
      this.addFav(element)
    }
    localStorage.setItem('favorites',JSON.stringify(this.favoriteList));
    
  }

  /*====================================  Posting the favorites list to firestore ===============================*/
  addFav(favoriteObject: any){
    // this.afs.collection("favorites").add(favoriteObject)
    this.afs.collection("favorites").doc(favoriteObject.video.id).set({
      id: favoriteObject.video.id,
      title: favoriteObject.video.snippet.title,
      image: favoriteObject.video.snippet.thumbnails.medium.url,
      rating: favoriteObject.rating,
    })
  }

  /*====================================  Getting favorites list from firestore ===============================*/
  retrieveFav(){
    return this.afs.collection("favorites").snapshotChanges();
  }

  getFavorites()
  {
    return this.favoriteList ;
  }
}
