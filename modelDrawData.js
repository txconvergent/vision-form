var COLOR = Object.freeze({"BLUE":1, "GREEN":2, "YELLOW":3, "RED":4});

// A function to draw ellipses over the detected keypoints
function drawKeypoints(Color) {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than the minimum confidence
      if (keypoint.score > minConfidence) {

        if      (Color = COLOR.BLUE)   { fill(0, 0, 255);  }
        else if (Color = COLOR.GREEN)  { fill(0, 255, 0);  }
        else if (Color = COLOR.YELLOW) { fill(255, 255, 0);  }
        else if (Color = COLOR.RED)    { fill(255, 0, 00); }
        
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton(Color) {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      
      if      (Color = COLOR.BLUE)   { fill(0, 0, 255);  }
      else if (Color = COLOR.GREEN)  { fill(0, 255, 0);  }
      else if (Color = COLOR.YELLOW) { fill(255, 255, 0);  }
      else if (Color = COLOR.RED)    { fill(255, 0, 00); }
    
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
