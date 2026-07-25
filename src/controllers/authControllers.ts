import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../db/prisma.js";

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "Name, Email and Password can't be empty",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User created",
      user: {
        name: name,
        email: email,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({
      message: "Enter email and password",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.json({
        message: "Invalid credentials",
      });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        name: user.name,
        email: email,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

export { registerController, loginController };
