import dotenv from 'dotenv';
import mongoose from 'mongoose';
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