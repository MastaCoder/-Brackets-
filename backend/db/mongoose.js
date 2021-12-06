import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Connect to the Users table
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/Brackets',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}
);

export default mongoose;