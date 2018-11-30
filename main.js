
let video;
let poseNet;
let poses = [];
let skeletons = [];
let frames = 0;
let myMovement = 0;
let myOrientation = 0;
let calibrationTime = 300;
let totalTime = 1000; //totalTime = exerciseTime - calibrationTime
var numReps = 0;
let idx = 0;
var listOfRepInfo = [];


//vars for determining form
var numRedFrames = 0;
var repRedCounts = [];
var redCountsIdx = 0;
//array of Booleans for each frame in report

//store the formdata
var FinalSetFormData = [];

var COLOR = Object.freeze({"BLUE":1, "GREEN":2, "YELLOW":3, "RED":4});
let currentColor = COLOR.BLUE;

function setup() {
  var cnv = createCanvas(640, 480);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);




  // We can call both functions to draw all keypoints and the skeletons
  // printKeypoints();
  // console.log(model_getPoseData());
  // console.log(determineMovement());
  // console.log(model_getPartCoordinate("nose", minConfidence));

  drawKeypoints(currentColor);
  drawSkeleton(currentColor);


  if (frames < calibrationTime) {
    //initial calibration
    if (bodyPosIsValid()) {
      //determine the movement & orientation
      if (determineMovement() != undefined && determineOrientation() != undefined) {
        myMovement = myMovement + determineMovement();
        myOrientation = myOrientation + determineOrientation();
        frames++;
      }
    }
  } else if (frames == calibrationTime) {
    //determine exercise and orientation
    myMovement = Math.round(0.0 + myMovement / calibrationTime);
    myOrientation = Math.round(0.0 + myOrientation / calibrationTime);
    changeTextLive(myMovement);
    frames++;
  } else if (frames < totalTime) {
    //analyze exercise for (totalTime - calibrationTime) microseconds
    let formQuality = getFormQuality(myMovement, myOrientation, 260, 35);


    if (formQuality != null) {
      listOfRepInfo[idx] = formQuality;
      currentColor = formQuality[1];

      //if red, increment the reds
      if (currentColor == COLOR.RED) {
        numRedFrames++;
      }

      // console.log(" COLOR" + currentColor)
      // console.log(" listOfRepInfo[idx - 2] " + currentColor)

      if(currentColor == COLOR.BLUE && idx > 1 && listOfRepInfo[idx - 2][1] != COLOR.BLUE){
          repRedCounts[redCountsIdx] = numRedFrames;
          redCountsIdx++;
          numReps++;
          console.log("Reps you've done: " + numReps);
          console.log("idx" + idx);

          numRedFrames = 0;
      }
      


      //
      // if (idx > 0 && currentColor == COLOR.BLUE && listOfRepInfo[idx - 1][1] != COLOR.BLUE){
      //   console.log("REPPPPP!PPPPP!P!PP!P!P!P!P!");
      //   numReps++;
      // }





      idx++;
      frames++;
    }
  } else {
    currentColor = COLOR.BLUE;

    
    window.open('results.html')
  }






}
