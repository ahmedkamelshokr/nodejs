const config = require("config");

//validate primary keys
if (!config.get("jwt")) throw new Error("fatal erroe, jwt is not found");

//function to get key value based on the key name
//to centrlize the config store
function getValue(key) {
  return config.get(key);
}

exports.getValue = getValue;
