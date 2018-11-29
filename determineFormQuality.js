var movement = Object.freeze({"BENCH":1, "SQUAT":2, "DEAD":3});
var orientation = Object.freeze({"LEFT":1, "RIGHT":2});
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

function getSquatQuality(direction) {
  //gets squat data
  let data = getSquatData(direction);

  if (data != null) {

  }
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
