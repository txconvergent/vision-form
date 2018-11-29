var movement = Object.freeze({"BENCH":1, "SQUAT":2, "DEAD":3});
var orientation = Object.freeze({"LEFT":1, "RIGHT":2});
var COLOR = Object.freeze({"BLUE":1, "GREEN":2, "YELLOW":3, "RED":4});
let minConfidence = 0.8;


function getFormQuality(exercise, direction) { //returns [boolean howGoodFormIs, boolean zone]
  if (exercise == movement.SQUAT) {
    //SQUAT
    return getSquatQuality(direction);
  }
  else if (exercise == movement.DEAD) {
    //DEADLIFT
    return getDeadQuality(direction);
  }
  else {
    //BENCH
    return getBenchQuality(direction);
  }
}

function getSquatQuality(direction, allowedLowestY, repStartY) {
  //gets squat data
  let data = getSquatData(direction);
  //store the current formquality given this frame
  let goodForm = false;

  //if we have all our data
  if (data != null) {
    //store the current color of the skeleton
    let skeletonColor = 0;
    //get the head's y position in the frame
    headY = data[0][0][1];

    //check if the current headY is in blue zone (repStartY +- 10)
    if (headY < repStartY + 10){
      skeletonColor = COLOR.BLUE;
      //rep not started (or rep has ended), change goodForm
      goodForm = true;
    }

    //check if we're in the yellow zone (allowedLowestY +- 10)
    else if (headY >= allowedLowestY - 10 && headY <= allowedLowestY + 10){
      //set the color
      skeletonColor = COLOR.YELLOW;
      goodForm = true;
    }

    //check if we're in the red zone ( > allowedLowestY + 10)
    else if (headY > allowedLowestY + 10){
      //set the color
      skeletonColor = COLOR.RED;
      goodForm = false;
    }

    return [goodForm, skeletonColor];
  }

  return null;
}

function getSquatData(direction) {
  let head = model_getPartCoordinate("nose", minConfidence);
  let hip = model_getPartCoordinate("rightHip", minConfidence);
  let knee = model_getPartCoordinate("rightKnee", minConfidence);

  if (head != undefined && hip != undefined && knee != undefined) {
    return [head, hip, knee];
  }
  else {
    return null;
  }
}

function changeTextLive(exercise) {
  if (exercise == movement.SQUAT) {
    document.getElementById("feedback").innerHTML = "Squat Detected!";
  } else if (exercise == movement.DEAD) {
    document.getElementById("feedback").innerHTML = "Deadlift Detected!";
  } else {
    document.getElementById("feedback").innerHTML = "Bench Press Detected!";
  }
}
