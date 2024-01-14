import { app } from "./app.js";
import DBConnection from './database/DbConnection.js'

DBConnection();

app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
})
