class Zone {
    constructor(name, hours, minutes, updated) {
        this.name = name;
        this.hours = hours;
        this.minutes = minutes;
        this.updated = updated || new Date();
    }
}

function toUnix(date) {
    // Convert to milliseconds and divide by 1000 to get seconds
    return Math.floor(date.getTime() / 1000);
}

function calculateCloseTime(date, hours, minutes) {
    let closeTime = new Date(date);
    hours = hours || 0
    minutes = minutes || 0
    let _hours = closeTime.getHours() + parseInt(hours);
    let _minutes = closeTime.getMinutes() + parseInt(minutes);

    closeTime.setHours(_hours);
    closeTime.setMinutes(_minutes);
    return toUnix(closeTime);
}

function getEarliestTime(times) {
    return Math.min(...times);
}

function selectIcon() {
    const icons = new Map([
        ["Black Zone", ":blackzone:"],
        ["Red Zone", ":redzone:"],
        ["Yellow Zone", ":yellowzone:"],
        ["Blue Zone", ":bluezone:"]
    ]);
    let zonetypeSelect = document.getElementById("zonetype").value;
    if (document.getElementById("zonetype").value == "" || null) {
        return "";
    } else {
        return icons.get(zonetypeSelect);
    }
}

function constructString(zones, earliestTime) {
    let string = "";
    for (let i = 1; i < zones.length; i++) {
        string += zones[i].name;
        if (i < zones.length - 1) {
            string += " <> ";
        }
    }
    string += " <> " + selectIcon() + document.getElementById("finalzone").value + " (" +
        document.getElementById("city").value + ")" + " <t:" + earliestTime + ":R>";
    return string;
}

function Run() {

    let times = [];
    for (let i = 1; i < count + 1; i++) {
        times.push(zones[i].closing)
    }
    document.getElementById("result").value = constructString(zones, getEarliestTime(times)); //constructString


}
