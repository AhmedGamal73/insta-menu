import mongoose, { Connection } from "mongoose";
import Tenant from "../models/tenant.model"; // Ensure this path is correct

mongoose.Promise = global.Promise;

export interface ClinetOption {
  socketTimeoutMS: number;
  // keepAlive: boolean;
  // poolSize: number;
  // useNewUrlParser: boolean;
  // useUnifiedTopology: boolean;
}

const clientOption: ClinetOption = {
  socketTimeoutMS: 30000,
  // keepAlive: true,
  // poolSize: 5,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

// CONNECTION EVENTS
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open");
});

mongoose.connection.on("error", (err: Error) => {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close()
    .then(() => {
      console.log("Mongoose default connection disconnected through app termination");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error while closing the Mongoose connection:", err);
      process.exit(1);
    });
});

const initAdminDbConnection = (DB_URL: string): Connection | undefined => {
  try {
    console.log("the uri at inti admin connect", DB_URL)
    const db: Connection = mongoose.createConnection(DB_URL, clientOption);
    db.model("Tenant", Tenant.schema);
    db.on("error", console.error.bind(console, "initAdminDbConnection MongoDB Connection Error>> : "));
    db.once("open", () => {
      console.log("initAdminDbConnection client MongoDB Connection ok!");
    });

    // Ensure the Tenant model is registered
    // This is not necessary if you are using the model directly in your services
    // require("../models/tenant.model"); 

    return db;
  } catch (error) {
    console.log("initAdminDbConnection error", error);
  }
};

export { initAdminDbConnection };