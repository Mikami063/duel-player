// Get references to the video elements and the lock/sync button
const mainVideo = document.getElementById('main-video');
const extraVideo = document.getElementById('extra-video');
const lockSyncButton = document.getElementById('lock-sync-button');

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
  //mainVideo.addEventListener('timeupdate', () => {
    // Update the time of the extra video to keep them in sync
  //  extraVideo.currentTime = mainVideo.currentTime + timeDifference;
  //});
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
