const mongoose = require('mongoose');

// Connect to the Users table
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/Brackets',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}
);

module.exports = { mongoose };
