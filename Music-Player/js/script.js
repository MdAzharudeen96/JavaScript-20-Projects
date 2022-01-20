const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const playPauseBtn = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const mainAudio = wrapper.querySelector("#main-audio");
const progressArea = wrapper.querySelector(".progress-area");
const progressBar = wrapper.querySelector(".progress-bar");
const musicList = wrapper.querySelector(".music-list");
const moreMusicBtn = wrapper.querySelector("#more-music");
const closemoreMusic = wrapper.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length)+1);
// console.log(musicIndex);
let isMusicPaused = true;

//Instantiation Music
window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

//Musisc get load
function loadMusic(indexNum){
    musicName.innerText = allMusic[indexNum -1].name;
    musicArtist.innerText = allMusic[indexNum -1].artist;
    musicImg.src = `images/${allMusic[indexNum -1].src}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNum -1].src}.mp3`;
    console.log( musicName.innerText);
};

//Music Play function
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
};

//Music Pause function
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
};

//Music Preview function
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex; //lastmusic play
    loadMusic(musicIndex);
    playMusic();
    playingSong();
};

//Music Next function
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex; //First music play
    loadMusic(musicIndex);
    playMusic();
    playingSong();
};

//Play or Pause Event
playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");

    //if isMusicPlay true -> pauseMusic; else -> playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

//Previous button Event
prevBtn.addEventListener("click", () => {
    prevMusic();
});

//Nex button Event
nextBtn.addEventListener("click", () => {
    nextMusic();
});

//Update Song Duration & time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(currentTime,duration);

    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width = `${progressWidth}%`;
    // console.log(progressWidth);

    let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuartion = wrapper.querySelector(".max-duration");

    //Update Song duration
    mainAudio.addEventListener("loadeddata", () => {
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration/60);
        let totalSec = Math.floor(mainAdDuration%60);
        // console.log(mainAdDuration, totalMin, totalSec);
        if(totalSec<10){
            totalSec = `0${totalSec}`; //add 0 before it
        }

        musicDuartion.innerHTML = `${totalMin}:${totalSec}`;
    });

    //Update playing song current time
    let currentMin = Math.floor(currentTime/60);
    let currentSec = Math.floor(currentTime%60);
    if(currentSec<10){
        currentSec = `0${currentSec}`;
    }

    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//Load or Dragg song
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; //Width of progress bar
    let clickedOffsetX = e.offsetX; //Offset X value
    let songDuration = mainAudio.duration;
    // console.log(progressWidth, clickedOffsetX, songDuration);

    mainAudio.currentTime = (clickedOffsetX / progressWidth)*songDuration;
    // console.log(mainAudio.currentTime);
    playMusic();
    playingSong();
});

//If music end Calling nextMusic
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    console.log(getText);

    switch(getText){
        case "repeat":
            nextMusic(); //Move to next song
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) +1);
            // console.log(randIndex)
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) +1);
                // console.log(randIndex);
            }while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;                            
    }
});

//Change loop, shuffle & repeat icon
const repeatBtn = wrapper.querySelector('#repeat-plist');

repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    // console.log(getText);
    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title","Song Looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title","Playback Shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title","Playlist looped");
            break;
    }
});

//Music List - More music
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

//Music List - Closing
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});

//Add Musics into More music
const ulTag = wrapper.querySelector("ul");
for (let i=0; i<allMusic.length; i++){
    let liTag = `
        <li li-index="${i + 1}">
            <div class="row">
                <span>${allMusic[i].name}</span>
                <p>${allMusic[i].artist}</p>
            </div>
            <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
            <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
        </li>
    `;
    
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration/60);
        let totalSec = Math.floor(duration%60);
        if (totalSec<10){
            totalSec = `0${totalSec}`;
        }

        liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
        liAudioDurationTag.setAttribute("t-duration",`${totalMin}:${totalSec}`);
    });
}

function playingSong(){
    const allLiTag = ulTag.querySelectorAll("li");

    for(let j=0; j<allLiTag.length; j++){
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing");

            let addDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = addDuration;
            // console.log(addDuration);
        }
        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }

        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}