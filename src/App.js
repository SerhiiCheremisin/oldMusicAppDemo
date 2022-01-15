import React, {useState, useRef} from "react"
import Player from "./components/Playes";
import Song from "./components/song";
import "./styles/app.css"
import Music from './util'
import Library from "./components/library";
import Nav from "./components/nav";

function App() {

//States
    const[songs, setSongs] = useState(Music());
const [currentSong, setCurrentSong] = useState(songs[0]);
const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef({});
    const [songInfo, setSongInfo] = useState ({
        currentTime : 0,
        duration: 0,
        animationPercentage: 0,
    });
const [libraryStatus, setLibraryStatus] = useState(false);



 //Functions
    const timeUpdateHandler = (e) =>{
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animationForPercent = Math.round((roundedCurrent / roundedDuration) * 100);
        setSongInfo({...songInfo, currentTime: current, duration: duration,animationPercentage:animationForPercent})
    }
    const songEndHandler = async ()=>{
        let currentIndex = songs.findIndex((song) =>
            song.id === currentSong.id);
            await setCurrentSong (songs[(currentIndex + 1) % songs.length])
            if(isPlaying) audioRef.current.play();
    }


  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
<Nav
    libraryStatus = {libraryStatus}
    setLibraryStatus = {setLibraryStatus}

/>
<Song currentSong = {currentSong}/>
<Player songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef ={audioRef}
        setIsPlaying = {setIsPlaying}
        isPlaying = {isPlaying}
        currentSong = {currentSong}
        songs = {songs}
        setCurrentSong = {setCurrentSong}
        setSongs = {setSongs}
/>
   <Library audioRef = {audioRef}
        setCurrentSong = {setCurrentSong}
        isPlaying = {isPlaying}
        songs = {songs}
        setSongs = {setSongs}
        libraryStatus = {libraryStatus}
   />
        <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
