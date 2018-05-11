mqttClient = null;

function hasAccountId() {
    return getAccountId() != null && getAccountId() > 0
}

function clearAccountId() {
    localStorage.removeItem("accountId");
}

function setAccountId(value) {
    localStorage.setItem("accountId", value);
}

function getAccountId() {
    return localStorage.getItem("accountId")
}

function jump(url) {
    window.location.replace(url)
}

function jumpIndex() {
    jump("index.html")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function parseHardwareResult(json) {
    let data = JSON.parse(json);
    if (data.payload.data != null) {
        data.payload.data.value = parseValue(data.payload.data.value, data.payload.data.unit) * 10;
    }
    return data;
}

function parseValue(value, unit = null) {
    if (unit == null) {
        value = 0;
    }
    if (unit === "FAHRENHEIT") {
        return Math.round(((value / 10 - 32) * 5 / 9) * 10) / 10;
    }
    return value / 10;
}

function parseDisplayValue(value) {
    if (value == null) {
        return 0;
    }
    return value / 10;
}

let colors = ["#767676", "#2185d0", "#6435c9", "#a333c8", "#e03997", "#f2711c", "#db2828"];

function muteHardware() {
    try {
        BloodPleasure.mute();
    } catch (e) {
    }
}

function parseMessage(message) {
    return JSON.parse(message);
}

function makeMessage(result, androidId) {
    return {hardwareValue: parseHardwareResult(result), hardwareId: androidId};
}

function getHardwareId() {
    try {
        return BloodPleasure.hardwareId()
    } catch (e) {
        return ""
    }
}

function isHardwareProvider() {
    return getHardwareId().length > 0
}