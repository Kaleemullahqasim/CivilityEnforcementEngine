document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    var ctx = document.getElementById('myChart').getContext('2d');
    var thresholds = {};
    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: [],
            datasets: [{
                label: 'Toxicity Levels',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateChartColors() {
        myChart.data.datasets.forEach((dataset) => {
            dataset.backgroundColor = dataset.data.map((v, i) => v > thresholds[myChart.data.labels[i]] ? 'rgba(244, 67, 54, 0.7)' : 'rgba(33, 150, 243, 0.7)');
            dataset.borderColor = dataset.data.map((v, i) => v > thresholds[myChart.data.labels[i]] ? 'rgba(244, 67, 54, 1)' : 'rgba(33, 150, 243, 1)');
        });
        myChart.update();
    }

    // Function to tokenize the text
    function tokenizeText(text) {
        return text.split(/\s+/);
    }

    socket.on('connect', () => {
        document.querySelector('#text-input').oninput = () => {
            const text = document.querySelector('#text-input').value;
            if (!text) {
                myChart.data.labels = [];
                myChart.data.datasets.forEach((dataset) => {
                    dataset.data = [];
                });
                myChart.update();
                document.querySelector('#text-display').innerHTML = ''; // Reset text content
            } else {
                socket.emit('message', {
                    'text': text
                });
            }
        };

        document.querySelector('#fileInput').onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                socket.emit('message', {
                    'text': text
                });
            };
            reader.readAsText(file);
        };
    });

    socket.on('response', data => {
        const response = data.data;
        if (Object.keys(thresholds).length === 0) {
            // Initialize thresholds and sliders
            for (const key in response) {
                thresholds[key] = 0.5; // Default threshold
                const container = document.createElement('div');
                container.className = 'slider-container';
                container.innerHTML = `
                    <div class="threshold-label">${key}<span id="${key}-value">0.5</span></div>
                    <input type="range" id="${key}-slider" min="0" max="1" step="0.01" value="0.5" oninput="updateThreshold('${key}', this.value)">
                `;
                document.getElementById('sliders').appendChild(container);
            }
        }
        myChart.data.labels = Object.keys(response);
        myChart.data.datasets.forEach((dataset) => {
            dataset.data = Object.values(response).map(v => parseFloat(v.toFixed(4)));
        });
        updateChartColors();

        // Apply styling to displayed text based on toxicity scores
        const textInput = document.getElementById('text-input').value;
        const words = tokenizeText(textInput);
        let highlightedText = '';

        for (const word of words) {
            let isToxic = false;
            for (const key in response) {
                if (response[key] > thresholds[key]) {
                    isToxic = true;
                    break;
                }
            }
            if (isToxic) {
                highlightedText += `<span class="toxic">${word}</span> `;
            } else {
                highlightedText += `<span class="safe">${word}</span> `;
            }
        }
        document.getElementById('text-display').innerHTML = highlightedText; // Update the displayed text with styled content
    });

    window.updateThreshold = function(key, value) {
        thresholds[key] = parseFloat(value);
        document.getElementById(`${key}-value`).innerText = value;
        updateChartColors();

        // Re-apply styling after threshold change
        const textInput = document.getElementById('text-input').value;
        const words = tokenizeText(textInput);
        let highlightedText = '';

        for (const word of words) {
            let isToxic = false;
            for (const key in myChart.data.labels) {
                if (myChart.data.datasets[0].data[key] > thresholds[myChart.data.labels[key]]) {
                    isToxic = true;
                    break;
                }
            }
            if (isToxic) {
                highlightedText += `<span class="toxic">${word}</span> `;
            } else {
                highlightedText += `<span class="safe">${word}</span> `;
            }
        }
        document.getElementById('text-display').innerHTML = highlightedText; // Update the displayed text with styled content
    };
});