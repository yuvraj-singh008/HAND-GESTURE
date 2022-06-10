prediction1="";
prediction2="";
Webcam.set({
    width:400,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_picture(){
    Webcam.snap(function(data_uri) 
    { document.getElementById("Snapshot").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
 });
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Si5WMoSfC/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function speak(){
     var synth = window.speechSynthesis;
     speak_data_1 = "The first prediction is " + prediction1;
     speak_data_2 = "And the second prediction is " + prediction2;
     var utterThis = new SpeechSynthesisUtterance(speak_data_1); 
     var utterThis1 = new SpeechSynthesisUtterance(speak_data_2); 
     synth.speak(utterThis); 
     synth.speak(utterThis1); 
}

function Check_emotion(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if (results[0].label=="thumbs up"){
            document.getElementById("update_emoji1").innerHTML="&#128077;"
        }
        if (results[0].label=="thumbs down"){
            document.getElementById("update_emoji1").innerHTML="&#128078;"
        }
        if (results[0].label=="namaste"){
            document.getElementById("update_emoji1").innerHTML="&#128591;"
        }
        if (results[0].label=="victory"){
            document.getElementById("update_emoji1").innerHTML="&#9996;"
        }
        if (results[0].label=="fist"){
            document.getElementById("update_emoji1").innerHTML="&#128074;"
        }
        if (results[1].label=="thumbs up"){
            document.getElementById("update_emoji2").innerHTML="&#128077;"
        }
        if (results[1].label=="thumbs down"){
            document.getElementById("update_emoji2").innerHTML="&#128078;"
        }
        if (results[1].label=="namaste"){
            document.getElementById("update_emoji2").innerHTML="&#128591;"
        }
        if (results[1].label=="victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996;"
        }
        if (results[1].label=="fist"){
            document.getElementById("update_emoji2").innerHTML="&#128074;"
        }
        speak();
    }
}


