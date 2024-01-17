// Function to Fetch Data and Create Plots
function fetchDataAndCreatePlots(selectedId) {
    // Fetch data from the JSON file
    d3.json("samples.json").then(data => {
        let selectedSample = data.samples.filter(sample => String(sample.id) === String(selectedId))[0];

        // Data for Bar Chart
        let barChartData = [{
            x: selectedSample.sample_values.slice(0, 10).reverse(),
            y: selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: selectedSample.otu_labels.slice(0, 10).reverse(),
            marker: { color: 'blue' },
            type: "bar",
            orientation: "h"
        }];
        let barChartLayout = {
            title: "Top 10 OTUs",
            margin: { l: 100, r: 100, t: 100, b: 30 },
            yaxis: { tickmode: "linear" }
        };

        // Plot Bar Chart
        Plotly.newPlot("bar", barChartData, barChartLayout);

        // Data for Bubble Chart
        let bubbleChartData = [{
            x: selectedSample.otu_ids,
            y: selectedSample.sample_values,
            mode: "markers",
            marker: {
                size: selectedSample.sample_values,
                color: selectedSample.otu_ids
            },
            text: selectedSample.otu_labels
        }];
        let bubbleChartLayout = {
            title: 'Bacteria Cultures Per Sample',
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };

        // Plot Bubble Chart
        Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);
    });
}

// Function to Display Demographic Info
function showDemographicInfo(selectedId) {
    d3.json("samples.json").then(data => {
        let selectedMetadata = data.metadata.filter(item => String(item.id) === String(selectedId))[0];
        let infoPanel = d3.select("#sample-metadata");
        infoPanel.html("");

        Object.entries(selectedMetadata).forEach(([key, value]) => {
            infoPanel.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

// Event Handler for Dropdown Selection
function onDropdownChange(selectedId) {
    fetchDataAndCreatePlots(selectedId);
    showDemographicInfo(selectedId);
}

// Initialize Dashboard
function initDashboard() {
    let dropdown = d3.select("#selDataset");

    d3.json("samples.json").then(data => {
        data.names.forEach(name => {
            dropdown.append("option").text(name).property("value", name);
        });

        // Default visualizations
        fetchDataAndCreatePlots(data.names[0]);
        showDemographicInfo(data.names[0]);
    });
}

// Start the Dashboard
initDashboard();

