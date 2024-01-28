const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 7000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));


const { url } = require("./Routes/tbl_urls")
app.use("/", url);


app.listen(port, () => {
    console.log(`server is running on ${port}`);
});

