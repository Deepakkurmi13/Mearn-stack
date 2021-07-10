const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require("express");
const app = express();
const helmet = require("helmet");
const cookiesParser = require("cookie-parser");
require("./db/conn");

const PORT = process.env.PORT || 8080;

//routing
app.use(express.json());
app.use(cookiesParser());
app.use(helmet());

// expess Router
app.use(require("./router/userrouter"));

if(process.env.NODE_ENV == "production"){
 
  app.use(express.static("client/build"));
  const path  =  require("path");
  app.get("*" , (req , res) => {
    res.sendFile(path.resolve(__dirname , "client" , "build" , "index.html" ));
  });
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});