/**
 * Function to Build Gauge Chart for Washing Frequency
 */
function buildWashingFreqGauge(wfreq) {
  // Validate input
  if (typeof wfreq !== 'number' || isNaN(wfreq)) {
    console.error('Invalid washing frequency');
    return;
  }

  // Calculate gauge level and pointer position
  let gaugeLevel = wfreq * 20;
  let angle = 180 - gaugeLevel;
  let radians = (angle * Math.PI) / 180;
  let x = 0.5 * Math.cos(radians);
  let y = 0.5 * Math.sin(radians);

  // Define pointer path
  let path = `M -0.0 -0.05 L 0.0 0.05 L ${x} ${y} Z`;

  // Create gauge data
  let gaugeData = [{
    type: 'scatter',
    x: [0], y: [0],
    marker: { size: 14, color: '850000' },
    showlegend: false,
    name: 'Frequency',
    text: wfreq,
    hoverinfo: 'text+name'
  }, {
    values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition: 'inside',
    marker: {
        colors: [
            'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
            'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
            'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
            'rgba(240, 230, 215, .5)', 'rgba(248, 243, 236, .5)',
            'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)'
        ]
    },
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  // Define gauge layout
  let gaugeLayout = {
    shapes: [{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
          color: '850000'
      }
    }],
    title: 'Belly Button Washing Frequency',
    height: 500,
    width: 500,
    xaxis: {
      zeroline: false, 
      showticklabels: false,
      showgrid: false, 
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false, 
      showticklabels: false,
      showgrid: false, 
      range: [-1, 1]
    }
  };

  // Plot Gauge Chart
  Plotly.newPlot('gauge', gaugeData, gaugeLayout);
}
