import { prisma } from "../db/prisma.js";

const getAllItemsController = async (req, res) => {
  const userId = req.userId;

  try {
    const items = await prisma.item.findMany({
      where: {
        ownerId: parseInt(userId),
      },
    });

    res.json(items);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const createItemController = async (req, res) => {
  console.log(req.body);
  const { title, content, type } = req.body;

  if (!title || !content || !type) {
    res.json({ message: "Invalid Request" });
  }

  try {
    const item = await prisma.item.create({
      data: {
        title,
        type,
        content,
        ownerId: req.userId,
      },
    });

    res.json({ message: "Item created", item });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Error creating item" });
  }
};

const updateItemController = async (req, res) => {};

const deleteItemController = async (req, res) => {};

export {
  getAllItemsController,
  createItemController,
  updateItemController,
  deleteItemController,
};
