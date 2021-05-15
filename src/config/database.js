const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.DB_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = mongoose;