
import app from "./app.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;


connectDB()
connectCloudinary()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });
