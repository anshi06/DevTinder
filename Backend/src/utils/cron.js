const cron = require("node-cron");

//Job is running every second.
// cron.schedule("* * * * * *", () => {
//     console.log("TIME ", + new Date());
// })

//Job will run every minute
cron.schedule("* * * * *", () => {
    console.log("TIME ", + new Date());
})