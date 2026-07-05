const apiResponse = (success, message, data = null) => ({
success,
message,
data,
});

module.exports = apiResponse;