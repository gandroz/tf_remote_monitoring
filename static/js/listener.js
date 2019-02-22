$(document).ready(function(){
  var monitored = {};
  var source = new EventSource('/subscribe/epoch/end/');
  var chart = null;

  source.addEventListener('message', function(e) {
    console.log(e.data);
    var data = JSON.parse(e.data);
    console.log(data);
    if (chart === null) {
      for (key in data) {
        monitored[key] = [key, data[key]];
      }
      var columns = [];
      for (key in monitored) {
        columns.push(monitored[key]);
      }
      chart = c3.generate({
          bindto:'#visualization',
          data: {
              x: 'epoch',
              columns: columns
          }
      });
    }
    else {
      for (key in data) {
        if (key in monitored) {
          monitored[key].push(data[key]);
        }
        var columns = [];
        for (key in monitored) {
          columns.push(monitored[key]);
        }
        chart.load({
          columns: columns
        });
      }
    }
  }, false);
});
