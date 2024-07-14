console.log("Welcome to Spotify")

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let timeDuration = document.getElementById('timeDuration');

// updating time on seek bar

const formatTime = (seconds) =>{
    // if (isNaN(seconds) || seconds < 0) {
    //     return "00:00";
    // }

    let minutes = 0;
    let secs = 0;
    
    minutes = Math.floor(seconds/60);
    secs = Math.floor(seconds%60);
    return `${minutes.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;

}

const updateTime = () => {
    let currentTime = formatTime(audioElement.currentTime);
    let timeduration = formatTime(audioElement.duration);
    if(isNaN(audioElement.duration)){
        timeduration = "00:00";
    }
    timeDuration.innerText = `${currentTime}/${timeduration}`;
}

const MakeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
    

let songs = [
    {songName : "Hare-Krishna", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName : "Jai Radha Madhav", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName : "Jai Radhe Jai Krishna", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName : "Samsara Davanala", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName : "Hari Haraye Namah", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName : "Vibhavari sesa", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName : "Govind Jaya Jaya", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName : "Bhajahu Re Mana", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName : "Yasomati-Nandan", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},]

    songItems.forEach((element,i) =>{
        //console.log(element,i);
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

    })


    // audioElement.play();

    // Handle play/pause click

    masterPlay.addEventListener('click', ()=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            document.getElementById(songIndex).classList.remove('fa-circle-play');
            document.getElementById(songIndex).classList.add('fa-circle-pause');

            gif.style.opacity = 1;
        }

        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            document.getElementById(songIndex).classList.remove('fa-circle-pause');
            document.getElementById(songIndex).classList.add('fa-circle-play');

            gif.style.opacity = 0;
        }
        masterSongName.innerText = songs[songIndex].songName;

    })

    // update seekbar as song duration increasing with time
    audioElement.addEventListener('timeupdate', ()=>{
        //console.log('timeupdate');
        progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        //console.log(progress);
        myProgressBar.value = progress;
    })

    // Contrloning the song with help of progress bar
    myProgressBar.addEventListener('change', ()=>{
        audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
    })

    // Playing aur Pausing a song by clicking on it
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.addEventListener('click',(e)=>{
            
            songIndex = parseInt(e.target.id);
            let newAudio = new Audio(songs[songIndex].filePath);
            // audioElement.src = songs[e.target.id].filePath;

            masterSongName.innerText = songs[songIndex].songName;
            if(audioElement.src==newAudio.src){
                if(audioElement.paused){

                    audioElement.play();
                    e.target.classList.remove('fa-circle-play');
                    e.target.classList.add('fa-circle-pause');
                    masterPlay.classList.remove('fa-circle-play');
                    masterPlay.classList.add('fa-circle-pause');
                    gif.style.opacity = 1;
                }
                else{
                    audioElement.pause();
                    e.target.classList.remove('fa-circle-pause');
                    e.target.classList.add('fa-circle-play');
                    masterPlay.classList.remove('fa-circle-pause');
                    masterPlay.classList.add('fa-circle-play');
                    gif.style.opacity = 0;
                }   
            } 
            
            else{
                    
                // console.log(e.target);
                MakeAllPlays();
                // songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                // audioElement.src = `songs/${songIndex}.mp3`;
                audioElement.src = songs[songIndex].filePath;
                // audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            }
                // }
                // else{
            //     audioElement.pause();
            //     audioElement.src = songs[e.target.id].filePath;
            //     MakeAllPlays();
            //     e.target.classList.remove('fa-circle-play');
            //     e.target.classList.add('fa-circle-pause');
            //     masterPlay.classList.remove('fa-circle-pause');
            //     masterPlay.classList.add('fa-circle-play');
            // }
        

        })
    })

    // Playing next song by clicking on next arrow
    document.getElementById('next').addEventListener('click', ()=>{
        //alert("Hare Krishna");
        console.log("Previous Song:");
        console.log(audioElement.src);
        console.log(formatTime(audioElement.duration));
        if(songIndex>=8)
        {
            document.getElementById(songIndex).classList.remove('fa-circle-pause');
            document.getElementById(songIndex).classList.add('fa-circle-play');
            songIndex = 0;
            masterSongName.innerText = songs[songIndex].songName;
        }
        else
        {
            songIndex += 1;
        }
        audioElement.src = "songs"+songIndex+".mp3";
        audioElement.src = songs[songIndex].filePath;
        var nextSong = new Audio(songs[(songIndex+1)%9].filePath);
        if(isNaN(audioElement.duration))
        {
            timeDuration.innerText = `00:00/${nex}`
        }
        // nextSong.play();
        // setTimeout(()=>{
        //     var nextSongTime = formatTime(nextSong.duration);
        // },"1000");

        audioElement.currentTime = 0;
        audioElement.play();
        console.log("Current Song:");
        console.log(audioElement.src);
        //setTimeout(formatTime(audioElement.duration), 3000);
        //timeDuration.innerText = "00:00/loading"
        //console.log(timeDuration.innerText);
        // setTimeout(() => {
        //     timeDuration.innerText = "00:00/"+formatTime(audioElement.duration);
        //     console.log("time is"+timeDuration.innerText);
        // }, "1000");
        
        gif.style.opacity = 1;
        //let duration = audioElement.duration;
        //console.log(songs[songIndex].filePath);
        //timeDuration.innerText = `00:00/${duration}`;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
        document.getElementById(songIndex-1).classList.remove('fa-circle-pause');
        document.getElementById(songIndex-1).classList.add('fa-circle-play');
       
    })

    // playing previous song by clicking on previous arrow
    document.getElementById('previous').addEventListener('click', ()=>{
        if(songIndex<=0)
        {
            document.getElementById(songIndex).classList.remove('fa-circle-pause');
            document.getElementById(songIndex).classList.add('fa-circle-play');
        
            songIndex = 8;
        }
        else
        {
            songIndex -= 1;
        }
        // audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        timeDuration.innerText = `00:00/${audioElement.duration}`
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
        document.getElementById(songIndex+1).classList.remove('fa-circle-pause');
        document.getElementById(songIndex+1).classList.add('fa-circle-play');
        
    })
                
    // updateTime();

    // audioElement.addEventListener('loadedmetadata',updateDuration);
    audioElement.addEventListener('timeupdate',updateTime);

  




