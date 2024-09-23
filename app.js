// Get elements from DOM
const audio = document.getElementById('audio');
const musicName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const seekBar = document.querySelector('.seek-bar');
const currentTimeElem = document.querySelector('.current-time');
const songDurationElem = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const backwardBtn = document.querySelector('.backward-btn');
const forwardBtn = document.querySelector('.forward-btn');

// Initialize song index
let currentSongIndex = 0;
let isPlaying = false;

// Load the initial song
function loadSong(songIndex) {
    const song = songs[songIndex];
    audio.src = song.path;
    musicName.textContent = song.name;
    artistName.textContent = song.artist;
    disk.style.backgroundImage = `url(${song.cover})`;

    // Set seekBar to zero
    seekBar.value = 0;
    currentTimeElem.textContent = '00:00';

    // Update duration after metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        const duration = formatTime(audio.duration);
        songDurationElem.textContent = duration;
        seekBar.max = audio.duration;
    });
}

// Play or Pause the song
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playBtn.classList.add('pause');
        disk.classList.remove('play');
    } else {
        audio.play();
        isPlaying = true;
        playBtn.classList.remove('pause');
        disk.classList.add('play');
    }
}

// Format time in mm:ss format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update seekBar and current time during song playback
audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
    currentTimeElem.textContent = formatTime(audio.currentTime);
});

// Seek to the selected time in the song
seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
});

// Play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
}

// Play the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
}

// Event listeners for controls
playBtn.addEventListener('click', togglePlayPause);
forwardBtn.addEventListener('click', nextSong);
backwardBtn.addEventListener('click', prevSong);

// Auto-play the next song when the current one ends
audio.addEventListener('ended', nextSong);

// Load the first song initially
loadSong(currentSongIndex);
