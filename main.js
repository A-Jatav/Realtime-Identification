//var img = "";
var status_cocoSSD = "";
var objects = [];
function preload() {
    //    img = loadImage("dog_cat.jpg");
};

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    document.getElementById("status").innerHTML = "Detecting Objects";
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
};

function modelLoaded() {
    console.log("ml5 Version: " + ml5.version + ", Coco SSD has been initalized successfully!");
    status_cocoSSD = true;
    //    object_detector.detect(img, gotResults);
    //    object_detector.detect(video, gotResults);
};

function draw() {
    //    image(img, 0, 0, 640, 420);
    image(video, 0, 0, 380, 380);
    if (status_cocoSSD != "") {
        object_detector.detect(video, gotResults);
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected: "+objects.length;
        r = random(255);
        g = random(255);
        b = random(255);
        for (var i = 0; i < objects.length; i++) {
            fill(r, g, b);
            var percent = 0;
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x - 20, objects[i].y - 20, objects[i].width, objects[i].height);
        };
    };
};

function gotResults(error, results) {
    if (error) {
        window.alert("ERROR: COCOSSD MODEL HAS NOT BEEN EXECUTED CORRECTLY.");
    }
    else {
        console.log(results);
        objects = results;
    };
};