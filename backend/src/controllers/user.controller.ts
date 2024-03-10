import express, { Request, Response } from "express";
import User from "../models/user.model";
import Role from "../models/Role.model";

export async function postUser(req: Request, res: Response) {
  try {
    let { username, password, roleId } = req.body;
    let validUser = username.toLowerCase();

    // check if username exist
    const isUsernameExist = await User.findOne({ username: validUser });
    if (isUsernameExist) {
      return res.status(400).send("Username Already Exist");
    }

    // check if role exist
    const isRoleExist = await Role.findById(roleId);
    if (!isRoleExist) {
      return res.status(400).send("Role not found");
    }

    const user = await User.create({
      username: validUser,
      password: password,
      role: roleId,
    });

    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Faild in validation" });
  }
}

export async function getUser(req: Request, res: Response) {}

export async function deleteUser(req: Request, res: Response) {}

export async function updateUser(req: Request, res: Response) {}
