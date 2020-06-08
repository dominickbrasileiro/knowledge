import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).catch(() => {
  const msg = 'Error: Unable to connect to MongoDB';

  console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m');
});
