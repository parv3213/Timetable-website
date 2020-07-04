const mongoose = require("mongoose");

const url = "mongodb+srv://User:3axg96GLRJ!_2Eh@cluster0.uj2h1.mongodb.net/timetable?retryWrites=true&w=majority";

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
