
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

// function abc(){
//   console.log("hey");
// }

// function abc(){
//   $.ajax({
//     type: 'GET',
//     url: '/disp',
//    // data: data,
//     async: false,
//    // dataType: 'json',
//     success: function (responseData) {
//       // alert(responseData);
//       },error: function (err) {
//       //Do stuff with the JSON data
//       alert(err);
//       console.log(err);
//     }
//   });
// }

// console.log(JSON.stringify(d));






  // setInterval(function(){ 
    // $.ajax({
    //     type: 'GET',
    //     url: '/disp',
    //    // data: data,
    //     async: false,
    //    // dataType: 'json',
    //     success: function (responseData) {
    //       // alert(responseData);
          
    //       function drawBasic() {
 
    //         var data = new google.visualization.DataTable();
    //             data.addColumn('number', 'time');
    //             data.addColumn('number', 'x');
    //             data.addColumn('number', 'y');
    //             data.addColumn('number', 'z');
    //             data.addRows([
    //               [0, 0,0,0],   [1, 10,7,5],  [2, 23,98,54],  [3, 17,89,45],  [4, 18,9,65],  [5, 9,78,54],
    //               [6, 11,67,45],  [7, 27,87,3],  [8, 33,8,56],  [9, 40,98,54],  [10, 32,98,54], [11, 35,6,43],
    //               [12, 30,8,54], [13, 40,78,3,], [14, 42,78,4], [15, 47,78,3], [16, 44,78,65], [17, 48,78,65],
    //               [18, 52,9,23], [19, 54,9,6], [20, 42,9,2], [21, 55,65,43], [22, 56,7,55], [23, 09,87,54]
                  
    //             ]);
          
    //             var options = {
    //               hAxis: {
    //                 title: 'Time'
    //               },
    //               vAxis: {
    //                 title: 'm/s'
    //               }
    //             };
          
    //             var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
           
    //             chart.draw(data, options);
    //           }
          
        
        
        
        
        
        
    //     },error: function (err) {
    //       //Do stuff with the JSON data
    //       alert(err);
    //       console.log(err);
    //     }
    //   });
  // console.log("hello")
  // }, 5000);
  
  
   
  
  
  
  
  
  
  //     function drawBasic() {
 
  // var data = new google.visualization.DataTable();
  //     data.addColumn('number', 'time');
  //     data.addColumn('number', 'x');
  //     data.addColumn('number', 'y');
  //     data.addColumn('number', 'z');
  //     data.addRows([
  //       [0, 0,0,0],   [1, 10,7,5],  [2, 23,98,54],  [3, 17,89,45],  [4, 18,9,65],  [5, 9,78,54],
  //       [6, 11,67,45],  [7, 27,87,3],  [8, 33,8,56],  [9, 40,98,54],  [10, 32,98,54], [11, 35,6,43],
  //       [12, 30,8,54], [13, 40,78,3,], [14, 42,78,4], [15, 47,78,3], [16, 44,78,65], [17, 48,78,65],
  //       [18, 52,9,23], [19, 54,9,6], [20, 42,9,2], [21, 55,65,43], [22, 56,7,55], [23, 09,87,54]
        
  //     ]);

  //     var options = {
  //       hAxis: {
  //         title: 'Time'
  //       },
  //       vAxis: {
  //         title: 'm/s'
  //       }
  //     };

  //     var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
 
  //     chart.draw(data, options);
  //   }

var r;
  

function drawBasic() {
  var jsonData = $.ajax({
        type: 'GET',
        url: '/disp',
        async: false,
           success: function (responseData) {
          // alert(responseData);
          },error: function (err) {
          //Do stuff with the JSON data
          alert(err);
          console.log(err);
        }
      }).responseText;
     
      // console.log(JSON.parse(jsonData))
      jsonData=JSON.parse(jsonData);
      console.log(jsonData)
      
  // for (var i = 0; i  < jsonData.length; i++){
  //     console.log("object ", i, jsonData[i].time)
  //   }      
  
  var options = {
    width: 900,
    height: 500,
    vAxis: {minValue:0, maxValue:1},
    animation: {
      duration: 1000,
      easing: 'in'
    }
  }

  var chart = new google.visualization.LineChart(
      document.getElementById('chart_div'));
  var data = new google.visualization.DataTable();
      data.addColumn('number', 'time');
        data.addColumn('number', 'x');
      data.addColumn('number', 'y');   
      data.addColumn('number', 'z');
      data.addRow([0, 0,0,0]);
      // data.addRow([76, 89,09,78])

  
  var button = document.getElementById('b1');
  function drawChart() {
    // Disabling the button while the chart is drawing.
    button.disabled = true;
    google.visualization.events.addListener(chart, 'ready',
        function() {
          button.disabled = false;
        });
    chart.draw(data, options);
  }

  var interval = 0
  var offset = 5
  button.onclick = function() {
    if (data.getNumberOfRows() > 10) {
      data.removeRow(0);
    }
    // Generating a random x, y pair and inserting it so rows are sorted.
    // var where = 0;
    // while (where < data.getNumberOfRows() && parseInt(data.getValue(where, 0)) < x) {
    //   where++;
    // }
    console.log(interval)
    console.log(jsonData[interval].x)
      data.addRow([jsonData[interval].time, jsonData[interval].x, jsonData[interval].y, jsonData[interval].z]);
      offset += 5
      interval += 1

      
    
    // data.addRow([50, 60,70,08]);

    drawChart();
  }




  





drawChart();
}
  