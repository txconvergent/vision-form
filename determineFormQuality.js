var movement = Object.freeze({"BENCH":1, "SQUAT":2, "DEAD":3});
var orientation = Object.freeze({"LEFT":1, "RIGHT":2});
var COLOR = Object.freeze({"BLUE":1, "GREEN":2, "YELLOW":3, "RED":4});
let minConfidence = 0.8;


function getFormQuality(exercise, direction, allowedLowestY, repStartY) { //returns [boolean howGoodFormIs, boolean zone]
    //SQUAT
    return getSquatQuality(direction, allowedLowestY, repStartY);
}

function getSquatQuality(direction, allowedLowestY, repStartY) {
  //gets squat data


  //store the current formquality given this frame
  let goodForm = false;

  //if we have all our data

  if (getHeadY() != undefined) {
    let headY = getHeadY()[0].y;
    console.log(headY);
    //store the current color of the skeleton
    let skeletonColor = COLOR.YELLOW;

    //check if the current headY is in blue zone (repStartY +- 10)
    if (headY < repStartY + 10){
      console.log("BLUE!!");
      skeletonColor = COLOR.BLUE;
      //rep not started (or rep has ended), change goodForm
      goodForm = true;
    }

    //check if we're in the yellow zone (allowedLowestY +- 10)
    else if (headY >= allowedLowestY - 40 && headY <= allowedLowestY + 50){
      console.log("YELLOW!!");
      //set the color
      skeletonColor = COLOR.GREEN;
      goodForm = true;
    }

    //check if we're in the red zone ( > allowedLowestY + 10)
    else if (headY > allowedLowestY + 20){
      console.log("RED!!");
      //set the color
      skeletonColor = COLOR.RED;
      goodForm = false;
    }

    return [goodForm, skeletonColor];
  }

  return null;
}

function getSquatData(direction) {
  let head = getHeadY();
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
    document.getElementById("feedback").innerHTML = "Squat Detected!";
}
