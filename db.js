const Grid = require('gridfs-stream');
const mongoose = require("mongoose");
var gfs, gridFSBucket;

const db = process.env.DATABASE;

//connecting DATABASE and initialising bucket in mongodb for storing notes
exports.connectdb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
    const connection = mongoose.connection.db;

    gridFSBucket = new mongoose.mongo.GridFSBucket(connection, {
      bucketName: 'files',
    });

    gfs = Grid(connection, mongoose);
    gfs.collection('files');
  } catch (err) {
    console.log(err);
  }
};

exports.getGridFSFiles = async (id) => {
  gfs.collection("files");
  return new Promise((resolve, reject) => {
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, files) => {
      if (err) reject(err);
      // Check if files
      if (!files || files.length === 0) {
        resolve(null);
      } else {
        resolve(files);
      }
    });
  });
};

exports.createGridFSReadStream = (id) => {
  return gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id));
};
