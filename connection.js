//connect to the database
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);//this will make sure that if we try to query a field that is not defined in the schema, it will throw an error
async function connectToMongoDB(url) {
    return mongoose.connect(url);
    }
module.exports = {
    connectToMongoDB,
};
 