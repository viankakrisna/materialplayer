window.MP = window.MP || {};
MP.visualizer = function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
    var audioElement = document.getElementById('player');
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    // Bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    var frequencyData = new Uint8Array(96);

    var parent = '#vis';

    var svgHeight = $(parent).parent().height();
    var svgWidth = $(parent).parent().width();
    var barPadding = '1';

    function createSvg(parent, width, height) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    var svg = createSvg(parent, svgWidth, svgHeight);

    // Create our initial D3 chart.
    svg.selectAll('rect')
        .data(frequencyData)
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
            return i * (svgWidth / frequencyData.length);
        })
        .attr('width', svgWidth / frequencyData.length - barPadding);

    // Continuously loop and update chart with frequency data.
    function renderChart() {
        requestAnimationFrame(renderChart);

        // Copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);

        // Update d3 chart with new data.
        svg.selectAll('rect')
            .data(frequencyData)
            .attr('y', function(d) {
                return svgHeight - d;
            })
            .attr('height', function(d) {
                return d;
            })
            .attr('fill', function(d) {
                return 'rgb(0, 0, ' + d + ')';
            });
    }

    // Run the loop
    renderChart();

};
// MP.visualizer();
