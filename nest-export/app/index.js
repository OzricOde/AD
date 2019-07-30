import { Accelerometer } from "accelerometer";
import { HeartRateSensor } from "heart-rate";
import { Gyroscope } from "gyroscope";
import * as messaging from "messaging";

if (Accelerometer) {
    const accelerometer = new Accelerometer({ frequency: 1 });
    
    accelerometer.addEventListener("reading", () => {
         // console.log(accelerometer.x, accelerometer.y, accelerometer.z)
        sendMessageacc(accelerometer.x, accelerometer.y, accelerometer.z,accelerometer.timestamp)
        messaging.peerSocket.onopen = function() {
            
            
            messaging.peerSocket.onerror = function(err) {
                console.log("Connection error: " + err.code + " - " + err.message);
            }     
        }
    })
  accelerometer.start();
} else {
   console.log("This device does NOT have an Accelerometer!");
}
  
function sendMessageacc(x, y, z,t) {
    var data = {
      head: 'acc',
      time: `${t}`,
      x: `${x}`,
      y: `${y}`,
      z: `${z}`
    }  
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
      //console.log(JSON.stringify(data));
    }
}

      
     
if (Gyroscope) {
   // console.log("This device has a Gyroscope!");
   const gyroscope = new Gyroscope({ frequency: 1 });
   gyroscope.addEventListener("reading", () => {
     // console.log(gyroscope.x, gyroscope.y, gyroscope.z,gyroscope.timestamp)
     sendMessagegy(gyroscope.x, gyroscope.y, gyroscope.z,gyroscope.timestamp)
        messaging.peerSocket.onopen = function() {
            
            
            messaging.peerSocket.onerror = function(err) {
                console.log("Connection error: " + err.code + " - " + err.message);
            }     
        }
     
   });
   gyroscope.start();
} else {
   console.log("This device does NOT have a Gyroscope!");
}

      
function sendMessagegy(x, y, z,t) {
    var data = {
      head: 'gy',
      time: `${t}`,
      x: `${x}`,
      y: `${y}`,
      z: `${z}`
    }  
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    }
}

  

   