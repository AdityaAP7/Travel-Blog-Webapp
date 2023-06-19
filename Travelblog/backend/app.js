import express from 'express';
import mongoose from 'mongoose';
import router from "./routes/user-routes.js"
import blogRouter from './routes/blog-routes.js';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json())
const PORT = 5000;

app.use("/api/user",router)
app.use("/api/blog",blogRouter)





mongoose
  .connect("mongodb+srv://admin:admin123@cluster0.aeyyxap.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connected to database and listening on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));

// app.use("/api", routes);

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
