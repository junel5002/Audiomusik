// Initialize variables
let currentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

// Toggle play/pause when play button is clicked
playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
});

// Function to set up and play music
const setMusic = (i) => {
    seekBar.value = 0; // Reset seek bar to 0
    currentMusic = i; // Set current song index
    let song = songs[currentMusic]; // Get song object from songs array

    // Update UI with song details
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00'; // Reset current time display

    // Wait until the metadata is loaded to set the song duration
    music.addEventListener('loadedmetadata', () => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    });
};

// Function to format time (in seconds) to MM:SS format
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    if (min < 10) {
        min = `0${min}`;
    }
    if (sec < 10) {
        sec = `0${sec}`;
    }

    return `${min}:${sec}`;
};

// Update the seek bar and current time during playback
music.addEventListener('timeupdate', () => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
});

// Change the song's current time based on the seek bar input
seekBar.addEventListener('input', () => {
    music.currentTime = seekBar.value;
});

// Play the next song when forward button is clicked
forwardBtn.addEventListener('click', () => {
    if (currentMusic < songs.length - 1) {
        currentMusic++;
    } else {
        currentMusic = 0; // Loop back to the first song
    }
    setMusic(currentMusic);
    music.play();
    playBtn.classList.add('pause');
    disk.classList.add('play');
});

// Play the previous song when backward button is clicked
backwardBtn.addEventListener('click', () => {
    if (currentMusic > 0) {
        currentMusic--;
    } else {
        currentMusic = songs.length - 1; // Loop to the last song
    }
    setMusic(currentMusic);
    music.play();
    playBtn.classList.add('pause');
    disk.classList.add('play');
});

// Initialize the first song on page load
setMusic(0);

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
},
500)


seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
}
)

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})




backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})