// Find the city container
let city = document.querySelector(".city");

// Pastel colors for the buildings
let colors = [
    "#f7f4bd", "#f8cb79", "#d5d5d5",
    "#ffe6b8", "#f47f83", "#e5c4c8",
    "#dff2d5", "#429de6", "#ded0f4",
    "#f2c8b1"
];

// Different final heights for 24 buildings
let heights = [
    135, 285, 195, 340, 165, 255,
    120, 310, 225, 370, 145, 280,
    185, 330, 155, 245, 365, 210,
    295, 130, 350, 175, 265, 320
];

// Create 24 buildings
for (let i = 0; i < 24; i++) {

    let building = document.createElement("div");
    building.classList.add("building");

    building.style.backgroundColor = colors[i % 10];

    // Create 12 windows for each building
    for (let j = 0; j < 12; j++) {

        let windowBox = document.createElement("div");
        windowBox.classList.add("window");

        // Two columns, six rows, fixed spacing
        windowBox.style.left = (20 + (j % 2) * 40) + "%";
        windowBox.style.bottom =
        (15 + Math.floor(j / 2) * ((heights[i] - 45) / 5)) + "px";


        building.appendChild(windowBox);
    }

    city.appendChild(building);
}

// Find all buildings
let buildings = document.querySelectorAll(".building");

// Update the clock
function updateClock() {

    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // One window lights up every 5 seconds
    let lightsOn = Math.floor(seconds / 5);

    for (let i = 0; i < 24; i++) {

        let building = buildings[i];
        let windows = building.querySelectorAll(".window");

        if (i < hours) {

            // Completed buildings stay visible
            building.style.opacity = "1";
            building.style.height = heights[i] + "px";

            // All windows stay lit
            for (let j = 0; j < 12; j++) {
                windows[j].style.backgroundColor = "#fff4a3";
            }

        } else if (i === hours) {

            // Current building grows during the hour
            building.style.opacity = "1";

            let newHeight = 40 + minutes / 60 * (heights[i] - 40);
            building.style.height = newHeight + "px";

            // Windows light up every 5 seconds
            for (let j = 0; j < 12; j++) {

                if (j < lightsOn) {
                    windows[j].style.backgroundColor = "#fff4a3";
                } else {
                    windows[j].style.backgroundColor = "#53505b";
                }
            }

        } else {

            // Future buildings are hidden
            building.style.opacity = "0";
            building.style.height = "0px";
        }
    }

    console.log("Hours:", hours);
    console.log("Minutes:", minutes);
    console.log("Seconds:", seconds);
}

// Run immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);
