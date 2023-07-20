
// Get references to the video elements and the lock/sync button
const mainVideo = document.getElementById('main-video');
const youtubeMainVideo = document.getElementById('youtube-main-video');
const extraVideo = document.getElementById('extra-video');
const lockSyncButton = document.getElementById('lock-sync-button');
const toggleVideosButton = document.getElementById('toggle-videos-button');

const youtubeUrlInput = document.getElementById('youtube-url-input');
const changeYoutubeUrlButton = document.getElementById('change-youtube-url-button');


const mainVideoDiv= document.getElementById('main-video-div');
const youtubeMainVideoDiv= document.getElementById('youtube-main-video-div');

const mainFileInput = document.getElementById('main-video-file-input');
const extraFileInput = document.getElementById('extra-video-file-input');
const loadMainVideosButton = document.getElementById('load-main-video-button');
const loadExtraVideosButton = document.getElementById('load-extra-video-button');

let isSynced = false
let mainV=mainVideo

// Initially hide the YouTube video
youtubeMainVideoDiv.style.display = 'none';

// Add an event listener to the toggle button
toggleVideosButton.addEventListener('click', () => {
  // Check the current visibility of the main video
  const isMainVideoVisible = mainVideoDiv.style.display !== 'none';

  // Toggle the visibility of the videos
  if (isMainVideoVisible) {
    mainVideoDiv.style.display = 'none';
    youtubeMainVideoDiv.style.display = 'block';
    mainV=youtubeMainVideo;
    toggleVideosButton.textContent = 'Show Local Video';
  } else {
    mainVideoDiv.style.display = 'block';
    youtubeMainVideoDiv.style.display = 'none';
    mainV=mainVideo;
    toggleVideosButton.textContent = 'Show Youtube Video';
  }
});




// Add an event listener to the lock/sync button
lockSyncButton.addEventListener('click', () => {
  // Toggle the sync state when the button is clicked
  isSynced = !isSynced;
  showSyncState();

  // If the sync state is enabled, synchronize the videos
  if (isSynced) {
    synchronizeVideos();
  }
});

// Function to synchronize the videos
function synchronizeVideos() {
  // Get the time difference between the main and extra video
  const timeDifference = extraVideo.currentTime - mainV.currentTime;

  // Add an event listener to the timeupdate event of the main video
  mainV.addEventListener('timeupdate', () => {
    // Update the time of the extra video to keep them in sync
    if(mainV.paused && isSynced)
      extraVideo.currentTime = mainV.currentTime + timeDifference;
  });
}

// Add event listeners to handle play and pause actions for both videos
mainVideo.addEventListener('play', () => {
  if (isSynced) {
    extraVideo.play();
  }
});

mainVideo.addEventListener('pause', () => {
  if (isSynced) {
    extraVideo.pause();
  }
});


// Add event listeners to handle play and pause actions for both videos
youtubeMainVideo.addEventListener('play', () => {
  if (isSynced) {
    extraVideo.play();
  }
});

youtubeMainVideo.addEventListener('pause', () => {
  if (isSynced) {
    extraVideo.pause();
  }
});




function showSyncState() {
  const syncStatus = document.getElementById('sync-status');
  syncStatus.textContent = isSynced ? 'In Sync' : 'Not Synced';
}



// Add an event listener to the load videos button
loadMainVideosButton.addEventListener('click', () => {
  // Trigger the file input click to select videos
  mainFileInput.click();
});

loadExtraVideosButton.addEventListener('click', () => {
  extraFileInput.click();
});

// Add an event listener to the file input change event
mainFileInput.addEventListener('change', (event) => handleVideoSelection(event, "mainVideo"));
extraFileInput.addEventListener('change', (event) => handleVideoSelection(event, "extraVideo"));
// Function to handle video selection and loading
function handleVideoSelection(event,videoType) {
  const files = event.target.files;

  const VideoFile = files[0];

  // Set the video sources and load the videos
  if(videoType=="mainVideo")
    mainVideo.src = URL.createObjectURL(VideoFile);
  else{
    extraVideo.src = URL.createObjectURL(VideoFile);
  }

  // Reset the sync state
  isSynced = false;
  showSyncState();//may need change for better notify way
}

changeYoutubeUrlButton.addEventListener('click', () => {
  const newYouTubeUrl = youtubeUrlInput.value.trim();
  youtubeMainVideo.setAttribute("data-yt2html5",newYouTubeUrl);
  new YouTubeToHtml5({
    withAudio: true // Filter streams to those with audio channels
  });
});