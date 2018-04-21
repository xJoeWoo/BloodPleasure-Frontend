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
    return JSON.parse(json)
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