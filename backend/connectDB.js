const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.8pj7n.mongodb.net:27017,cluster0-shard-00-01.8pj7n.mongodb.net:27017,cluster0-shard-00-02.8pj7n.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-wp6xlu-shard-0&authSource=admin&retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
      }
    );
    console.log(`Mongo connected ${connect.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
