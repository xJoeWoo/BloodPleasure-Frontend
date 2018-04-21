mqttClient = null;

function connectMqtt() {
    mqttClient = new Paho.MQTT.Client(getMqttUrl(), Number(9003), "webpage_" + parseInt(Math.random() * 100, 10));
    mqttClient.onConnectionLost = onMqttLost;
    mqttClient.onMessageArrived = onMqttReceived;
    mqttClient.connect({userName: getMqttUser(), password: getMqttPassword(), onSuccess: onMqttConnect});
}

function hasAccountId() {
    return localStorage.getItem("accountId") != null && localStorage.getItem("accountId") >= 0
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function requestHardwareId(accountId) {
    return $.get(getApiRootUrl() + "/hardware", {accountId: accountId})
}

function onMqttReceived(message) {
    console.log("onMqttReceived:" + message.payloadString);
    if (!isHardwareProvider()) {
        showMonitorData(parseMessage(message.payloadString).hardwareValue.payload.data.value)
    }
}

function hardwareValue(result, androidId) {

    let message = makeMessage(result, androidId);

    let value = message.hardwareValue.payload.data.value;

    showMonitorData(value);

    console.log(message);

    let monitorCircular = getMonitorCircular();

    publishMqttMessage(makeMqttMessage(message))

}


function showMonitorData(value) {
    getMonitorData().innerText = value;
}

function parseHardwareResult(json) {
    return JSON.parse(json)
}

function parseMessage(message) {
    return JSON.parse(message);
}

function makeMessage(result, androidId) {
    return {hardwareValue: parseHardwareResult(result), androidId: androidId};
}

function makeMqttMessage(value) {
    let mqttMessage = new Paho.MQTT.Message(JSON.stringify(value));
    mqttMessage.destinationName = getTopic();
    return mqttMessage;
}

function publishMqttMessage(value) {
    if (mqttClient != null && mqttClient.isConnected()) {
        mqttClient.send(value);
    }
}

function getMonitorData() {
    return document.getElementById("monitor-data");
}

function getMonitorCircular() {
    return document.getElementById("monitor-circular");
}

function onMqttConnect() {
    console.log("onMqttConnect");
    if (!isHardwareProvider()) {
        mqttClient.subscribe(getTopic());
    }
}

function onMqttLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onMqttLost:" + responseObject.errorMessage);
    }
}

function isHardwareProvider() {
    try {
        return !!BloodPleasure.isHardwareProvider()
    } catch (e) {
        return false
    }
}