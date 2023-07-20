// JavaScript Logic
let syncInterval;
let isSynced = false;

// Function to synchronize the videos
function synchronizeVideos() {
  const mainDuration = mainVideo.duration;
  const extraDuration = extraVideo.duration;
  const timeDifference = extraVideo.currentTime - mainVideo.currentTime;

  // Clear any existing sync intervals
  clearInterval(syncInterval);

  // Check if the main video has reached its end
  mainVideo.addEventListener('ended', () => {
    clearInterval(syncInterval);
    isSynced = false;
    extraVideo.pause(); // Pause the extra video when the main video ends
  });

  // Function to update the extra video time
  function updateExtraTime() {
    extraVideo.currentTime = mainVideo.currentTime + timeDifference;
  }

  // Function to update the main video time
  function updateMainTime() {
    mainVideo.currentTime = extraVideo.currentTime - timeDifference;
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

  extraVideo.addEventListener('play', () => {
    if (isSynced) {
      mainVideo.play();
    }
  });

  extraVideo.addEventListener('pause', () => {
    if (isSynced) {
      mainVideo.pause();
    }
  });

  // Synchronize the videos every 100 milliseconds
  syncInterval = setInterval(() => {
    // Check if both videos are paused and synced
    if (mainVideo.paused && extraVideo.paused && isSynced) {
      clearInterval(syncInterval);
      isSynced = false;
      return;
    }

    // Check if both videos are playing and not synced
    if (!mainVideo.paused && !extraVideo.paused && !isSynced) {
      isSynced = true;
    }

    // If the videos are synced, update the extra video time
    if (isSynced) {
      updateExtraTime();
    }
  }, 100);
}

// Add an event listener to the lock/sync button
lockSyncButton.addEventListener('click', () => {
  // Toggle the sync state when the button is clicked
  mainVideo.syncState = !mainVideo.syncState;

  // If the sync state is enabled, synchronize the videos
  if (mainVideo.syncState) {
    synchronizeVideos();
  } else {
    // If sync is disabled, clear the sync interval and reset the sync state
    clearInterval(syncInterval);
    isSynced = false;
  }
});
