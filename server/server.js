const app = require('./src/app');
const connectDB = require('./src/utils/config');
const PORT = process.env.PORT || 5000;





connectDB();


app.listen( PORT,"0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
