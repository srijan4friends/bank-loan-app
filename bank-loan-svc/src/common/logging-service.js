//Bringing Winston in
const winston = require("winston");
//require('dotenv').config()

//Simple function to return the current date and time
timeStamp = () => {
  return new Date(Date.now()).toUTCString();
};


//Here we create our Custom Logger class
class CustomLogger {

 

  //We want to attach the service route to each instance, so when we call it from our services it gets attached to the message
  constructor(service) {

    this.log_data = null;
    this.service = service;

    const logger = winston.createLogger({
      transports: [
        //Here we declare the winston transport, and assign it to our file: allLogs.log
        new winston.transports.File({
          filename: `./logs/allLogs.log`,
          metaKey:'meta'
        }),
      ],

      format: winston.format.printf((info) => {
        //Here is our custom message
        let message = `${timeStamp()} | ${info.level} | From: ${service} | ${info.message}`;

        if (info.obj !== undefined) { //THIS LINE
            message = `${timeStamp()} | ${info.level} | From: ${service} | ${info.message} | ${JSON.stringify(info.obj)}`; //THIS LINE
            } //THIS LINE
        return message;
      }),
    });

    this.logger = logger;
  }

  setLogData(log_data) {
    this.log_data = log_data;
  }

  async info(message) {
    this.logger.log("info", message);
  }

  async info(message, obj) {
    this.logger.log("info", message, {
      obj,
    });
  }

  async debug(message) {
    this.logger.log("debug", message);
  }

  async debug(message, obj) {
    this.logger.log("debug", message, {
      obj,
    });
  }

  async error(message) {
    this.logger.log("error", message);
  }

  async error(message, obj) {
    this.logger.log("error", message, {
      obj,
    });
  }
}

module.exports = CustomLogger;