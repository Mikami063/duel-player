// Get references to the video elements and the lock/sync button
const mainVideo = document.getElementById('main-video');
const extraVideo = document.getElementById('extra-video');
const lockSyncButton = document.getElementById('lock-sync-button');

const mainFileInput = document.getElementById('main-video-file-input');
const extraFileInput = document.getElementById('extra-video-file-input');
const loadMainVideosButton = document.getElementById('load-main-video-button');
const loadExtraVideosButton = document.getElementById('load-extra-video-button');

let isSynced = false

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
  const timeDifference = extraVideo.currentTime - mainVideo.currentTime;

  // Add an event listener to the timeupdate event of the main video
  mainVideo.addEventListener('timeupdate', () => {
    // Update the time of the extra video to keep them in sync
    if(mainVideo.paused)
      extraVideo.currentTime = mainVideo.currentTime + timeDifference;
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


