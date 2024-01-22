import { Router } from "express";

import Waiter from "../models/waiter";

const waiterRouter = Router();

waiterRouter.post("/", (req, res) => {
  try {
    const { name, age, phone, address } = req.body;
    if (!name || !age || !phone || !address) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    const newWaiter = new Waiter({
      name,
      age,
      phone,
      address,
    });

    const savedWaiter = newWaiter.save();
    res.json(savedWaiter);
  } catch (err) {
    res.status(500);
  }
});

waiterRouter.get("/", (req, res) => {
  // get all waiters
  Waiter.find()
    .then((waiters) => res.json(waiters))
    .catch((err) => res.status(400).json("Error: " + err));
});

export default waiterRouter;
