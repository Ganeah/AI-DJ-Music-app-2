music = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0; 
function preload(){
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('poses',gotPoses);
}



function modelLoaded(){
    console.log("PoseNet is intialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Score left wrist = "+scoreleftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+leftWristX+"Left wrist y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+rightWristX+"Right wrist y = "+rightWristY);
    }
}

function draw(){
    image(video,0,0,500,400);

    fill("red");
    stroke("red");
    scoreleftWrist = music.isPlaying();
    scorerightWrist = music2.isPlaying();
    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        music2.stop();
    }
    if(scoreleftWrist == false){
        music.setVolume(1);
        music.rate(1);
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        music.stop();
    }
    if(scorerightWrist == false){
        music2.play();
        music2.setVolume(1);
        music2.rate(1);
    }
}