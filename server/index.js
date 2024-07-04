import app from "./app.js";
import mongoConnection from "./db/user.db.js";
import "dotenv/config";

mongoConnection()
    .then(
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    ).catch((err) => {
        console.log(err.message);
    })
