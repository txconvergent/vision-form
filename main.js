
let video;
let poseNet;
let poses = [];
let skeletons = [];
let minConfidence = 0.75;

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
   drawKeypoints();
  // drawSkeleton();
  // printKeypoints();
   // console.log(model_getPoseData());
   // console.log(determineMovement());
   // console.log(model_getPartCoordinate("nose", minConfidence));
   if (bodyPosIsValid()) {
     determineMovement();
   }
}



