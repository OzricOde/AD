// Import the messaging module
import * as messaging from "messaging";


const host = "http://10.254.219.85:8000";
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');



//myHeaders.append('data',JSON.stringify(evt.data))
    //Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log("Data received: " + JSON.stringify(evt.data)); 
  if(evt.data.head=='acc'){
    myHeaders.set('acc',JSON.stringify(evt.data));
    //myHeaders.set('acc',"test");
  }
  if(evt.data.head=='gy'){
  myHeaders.set('gy',JSON.stringify(evt.data))
    }
  
  if(evt.data.head=='heart'){
  myHeaders.set('heart',JSON.stringify(evt.data))
    }
  
  if(evt.data.head=='ori'){
    myHeaders.set('ori',JSON.stringify(evt.data))
  }
  // console.log(JSON.stringify(myHeaders)) 
  // if(evt.data.head=='gy'){
  //   myHeaders.append('gy',JSON.stringify(evt.data))
  // }
  
  //myHeaders.append('gy',JSON.stringify(evt.data))
  var url = host + "/live";
  fetch(url, {
      method : "POST",
      headers : myHeaders,
      body: 'abc'}) // Build the request
    .then(function(response){
      return response.json();}) //Extract JSON from the response
    .then(function(data) {             
      console.log("Got response from server:", JSON.stringify(data)); // Log ig
      messaging.peerSocket.send(JSON.stringify(data)); }) // Send it to the watch as a JSON string
    .catch(function(error) {
      console.log(error);}); // Log any errors with Fetch

  
}

