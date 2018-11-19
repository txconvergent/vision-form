// A function to print the keypoints to console
function printKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than the minimum confidence
      if (keypoint.score > minConfidence) {
        console.log(keypoint, keypoint.position.x, keypoint.position.y);
      }
    }
  }
}

//function to get model data
function model_getPoseData() {
  return poses;
}

//function to get a particular part's coordinate
//returns an array of[x, y] if the detection was above 
//minConfidence
function model_getPartCoordinate(bodyPartName, minConfidence) {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = poses[i].pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than the minimum confidence
            if (keypoint.score > minConfidence && keypoint.part == bodyPartName) {
               //get the element in the array for a chosen body part
               return keypoint.position;
            }          
       }
  }
}