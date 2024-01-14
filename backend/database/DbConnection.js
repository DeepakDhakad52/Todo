import mongoose from "mongoose";

const DbConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('DB connected...'))
        .catch(() => console.log('DB Error'));
}

export default  DbConnection;