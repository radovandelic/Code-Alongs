var mongoose = require("mongoose");
var keys = require("./keys");

module.exports = {
    database: `mongodb://${keys.username}:${keys.password}@ds121965.mlab.com:21965/student_crud`,
    startDB: function () {
        //to get rid of annoying promise/deprecated warnings
        mongoose.Promise = global.Promise;
        mongoose.connect(this.database, { useMongoClient: true });
        db = mongoose.connection;

        db.once("open", () => {
            console.log("Connected to mongodb");
        });

        db.on("error", (error) => {
            console.log(error);
        });
    }
}