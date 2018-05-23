/**
 * MQTT 服务器地址
 * @returns {string}
 */
function getMqttUrl() {
    return "";
}

/**
 * MQTT 服务器端口
 * @returns {number}
 */
function getMqttPort() {
    return Number(-1);
}

/**
 * MQTT 订阅者前缀，订阅时会组合成「{前缀}{随机数字}」的订阅者 ID
 * @returns {string}
 */
function getMqttClientPrefix() {
    return "";
}

/**
 * MQTT 用户名
 * @returns {string}
 */
function getMqttUser() {
    return "";
}

/**
 * MQTT 用户密码
 * @returns {string}
 */
function getMqttPassword() {
    return "";
}

/**
 * MQTT Topic
 * @returns {string}
 */
function getTopic() {
    return "";
}

/**
 * 后端服务器 API 根地址，即 BloodPleasure-Server 项目监听的地址
 * @returns {string}
 */
function getApiRootUrl() {
    return getRootUrl() + ""
}

/**
 * 后端服务器根地址，通常为本前端项目响应的域名或 IP 地址
 * @returns {string}
 */
function getRootUrl() {
    return ""
}
