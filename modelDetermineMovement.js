var movement = Object.freeze({"BENCH":1, "SQUAT":2, "DEAD":3});
//This function determines which exercise the user is performing.
function determineMovement() {
  //get head and knee positions
  let move;

  // get head position, knee position, and orientation of the user
  let orientation = determineOrientation();
  let headPos = model_getPartCoordinate("nose", minConfidence);
  let kneePos, wristPos;
  if (orientation == orientation.LEFT) {
    kneePos = model_getPartCoordinate("leftKnee", minConfidence);
    wristPos = model_getPartCoordinate("leftWrist", minConfidence);
  } else {
    kneePos = model_getPartCoordinate("rightKnee", minConfidence);
    wristPos = model_getPartCoordinate("rightWrist", minConfidence);
  }

  //determine exercise
  if (headPos != undefined && kneePos != undefined && wristPos != undefined) { //simple check, fixes the last bug we ran into
    if (headPos[0].y < kneePos[0].y - 50) {
      //movement is either SQUAT or DEAD
      if (wristPos[0].y - headPos[0].y < 70) {
        move = movement.SQUAT;
      } else {
        move = movement.DEAD;
      }
    }
    else {
      //movement is BENCH
      move = movement.BENCH;
    }
     console.log(move);
  }
}

//NOTE: method can almost perfectly read squats and deadlifts (it prints 2
//if it's a squat and 3 if it's a deadlift), but idk how to test bench



function bodyPosIsValid() {
  let leftShoulder = model_getPartCoordinate("leftShoulder", minConfidence);
  let leftAnkle = model_getPartCoordinate("leftAnkle", minConfidence);
  let rightShoulder = model_getPartCoordinate("rightShoulder", minConfidence);
  let rightAnkle = model_getPartCoordinate("rightAnkle", minConfidence);

  if ((leftShoulder != undefined || rightShoulder) && (leftAnkle != undefined || rightAnkle != undefined)) {
    return true;
  }
  return false;
}


var orientation = Object.freeze({"LEFT":1, "RIGHT":2});

//determines which side the user is facing
function determineOrientation() {
  //right side
  let rightShoulderPos = model_getPartCoordinate("rightShoulder", minConfidence);
  let rightWristPos = model_getPartCoordinate("rightWrist", minConfidence);

  //left side
  let leftShoulderPos = model_getPartCoordinate("leftShoulder", minConfidence);
  let leftWristPos = model_getPartCoordinate("leftWrist", minConfidence);

  //determine which side the user is facing
  if (rightShoulderPos == undefined || rightWristPos == undefined) {
      return orientation.LEFT;
    }
  else if (leftShoulderPos == undefined || leftWristPos == undefined) {
    return orientation.RIGHT;
  }
  else {
    //determine orientation manually
    let rightAvg = rightShoulderPos[1] + rightWristPos[1];
    let leftAvg = leftShoulderPos[1] + leftWristPos[1];
    if (rightAvg > leftAvg) {
      return orientation.RIGHT;
    } else if (leftAvg > rightAvg) {
      return orientation.LEFT;
    } else {
      //in the one in a billion chance that the averages are equal
      return undefined;
    }
  }
}
