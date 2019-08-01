import { Accelerometer } from "accelerometer";
import { HeartRateSensor } from "heart-rate";
import { Gyroscope } from "gyroscope";
import * as messaging from "messaging";
import { OrientationSensor } from "orientation";

if (Accelerometer) {
    const accelerometer = new Accelerometer({ frequency: 1});
    
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


if (HeartRateSensor) {
   console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor({ frequency: 1 });
   hrm.addEventListener("reading", () => {
     // console.log(`Current heart rate: ${hrm.heartRate}`);
      sendMessageheart(hrm.timestamp,hrm.heartRate)
        messaging.peerSocket.onopen = function() {
            
            
              messaging.peerSocket.onerror = function(err) {
                console.log("Connection error: " + err.code + " - " + err.message);
            }     
        }
   });
   hrm.start();
} else {
   console.log("This device does NOT have a HeartRateSensor!");
}

function sendMessageheart(t,x) {
    var data = {
      head: 'heart',
      time: `${t}`,
      x: `${x}`
    }  
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    }
}



if (OrientationSensor) {
   console.log("This device has an OrientationSensor!");
   const orientation = new OrientationSensor({ frequency: 1 });
   orientation.addEventListener("reading", () => {
     // console.log(
     //  `Orientation Reading: \
     //    timestamp=${orientation.timestamp}, \
     //    [${orientation.quaternion[0]}, \
     //    ${orientation.quaternion[1]}, \
     //    ${orientation.quaternion[2]}, \
     //    ${orientation.quaternion[3]}]`
     // );
   sendMessageori(orientation.timestamp, orientation.quaternion[0], orientation.quaternion[1],orientation.quaternion[2],orientation.quaternion[3])
        messaging.peerSocket.onopen = function() {
            
            
            messaging.peerSocket.onerror = function(err) {
                console.log("Connection error: " + err.code + " - " + err.message);
            }     
        }
   
   });
   orientation.start();
} else {
   console.log("This device does NOT have an OrientationSensor!");
}

function sendMessageori(t,q,x,y,z) {
    var data = {
      head: 'ori',
      time: `${t}`,
      q: `${q}`,
      x: `${x}`,
      y: `${y}`,
      z: `${z}`
    }  
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    }
}