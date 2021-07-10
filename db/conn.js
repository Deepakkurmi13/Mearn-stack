const mongoose = require('mongoose');

//connection of db
mongoose.connect(process.env.DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
})