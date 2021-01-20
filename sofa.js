img = "";
status = "";
objects=[];
function preload(){
img=loadImage("download.png")
}

function setup(){
    canvas=createCanvas(330, 300);
    canvas.center(); 
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Detecting objects";
}

function draw(){
    image(img,0,0,300,300);
    if(status != ""){
        for(o=0; o < objects.length; o++){
            document.getElementById("status").innerHTML="Status: objects detected.";
            fill(255, 0, 0);
            stroke(255,0,0);
            percent=floor(objects[o].confidence*100);
            text(objects[o].label+ " "+percent+" %", objects[o].x, objects[o].y-15);
            noFill();
            rect(objects[o].x, objects[o].y, objects[o].width, objects[o].height);
        }
    }
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    objectdetector.detect(img, getResults);
}
function getResults(error, results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        objects=results;
        document.getElementById("numberofobjectsdetected").innerHTML=1;
    }
}