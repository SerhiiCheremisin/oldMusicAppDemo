import React from "react";
import LibrarySong from "./library-song";

const Library = ({songs, setCurrentSong, audioRef,isPlaying,setSongs,libraryStatus}) => {
 return(
   <div className={`library ${libraryStatus ? 'active-library': ''}`}>
       <h2>Library</h2>
 <div className="library-songs">
     {songs.map((song) => ( <LibrarySong
         audioRef = {audioRef}
         key = {song.id}
         id = {song.id}
         songs = {songs}
         setCurrentSong = {setCurrentSong}
         song = {song}
         isPlaying = {isPlaying}
         setSongs = {setSongs}
         />)
     )}
 </div>
   </div>

 )
}

export default Library;