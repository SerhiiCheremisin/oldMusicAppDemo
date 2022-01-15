import React from 'react';


const LibrarySong = ({song,songs, setCurrentSong, id, audioRef,isPlaying,setSongs}) =>{
  const songSelectHandler = async () =>{
      const selectSong = songs.filter((state) => state.id === id)
     await setCurrentSong(selectSong[0]);
//Add active state for markup
     const newSongs = songs.map((song) => {
        if (song.id === id){
            return{
           ...song,active:true
            }
        }else{
            return {
                ...song, active: false
            }
        }
     })
setSongs(newSongs)
      if(isPlaying) audioRef.current.play()

   //the song is playing?

  }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected": "" }`}>
            <img alt={song.name} src={song.cover}></img>
          <div className="song-description">
              <h3>{song.name}</h3>
              <h4>{song.artist}</h4>
          </div>

        </div>

    )
}
export default LibrarySong;