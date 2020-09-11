
var httpRequest
httpRequest = new XMLHttpRequest();
if (!httpRequest){
  alert('cannot create an XMLHTTP instance');
}
httpRequest.onreadystatechange = getRegionData;
httpRequest.open('GET', 'http://localhost:8000/api/regionData');
httpRequest.send();

function getRegionData(){
  if (httpRequest.readyState === XMLHttpRequest.DONE){
    if (httpRequest.status === 200){
      const response = JSON.parse(httpRequest.response);
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart(){
        var data = new google.visualization.DataTable();
        data.addColumn('string','Region Name');
        data.addColumn('number', 'Users');
        data.addRows(response)

        var options = { 'title' : 'Users of each region',
          'width':1000,
          'height':600
        }
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    }else {
      alert('There was a problem with the request')
    }


  }
}
