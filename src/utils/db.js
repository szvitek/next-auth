import mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connections[0]?.readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo Connection successfully estabilished.');
  } catch (error) {
    throw new Error('Error connection to MongoDB');
  }
};
export default connect;
