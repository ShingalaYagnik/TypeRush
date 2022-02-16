const { response } = require("express");
const express = require("express");
const request = require("request");
const URL_QUOTE = "http://api.quotable.io/random";

// const bodyParser = require('body-parser');
// var URL ='http://api.quotable.io/random';

const app = express();
app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
var quote;
app.get("/", (req, res) => {
	request(URL_QUOTE, function (err, response, body) {
		if (!err && response.statusCode == 200) {
			var data = JSON.parse(body);
			quote = data.content;
			res.render("index", { quote: quote });
		}
	});

	// res.render("index",{quote:quote});

	// console.log(quote);
	// res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
	console.log("Server online at port 3000");
});
