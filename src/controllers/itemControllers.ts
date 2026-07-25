import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../db/prisma.js";

const getAllItemsController = async (req, res) => {
  const userId = req.userId;

  try {
    const items = await prisma.item.findMany({
      where: {
        ownerId: parseInt(userId),
      },
    });

    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const createItemController = async (req, res) => {
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

const updateItemController = async (req, res) => {
  const itemId = req.params.id;
  const { title, content, type } = req.body;

  const updateItemData: Prisma.ItemUpdateInput = {};

  if (title !== undefined) {
    updateItemData.title = title;
  }
  if (content !== undefined) {
    updateItemData.content = content;
  }
  if (type !== undefined) {
    updateItemData.type = type;
  }

  try {
    await prisma.item.update({
      where: {
        id: parseInt(itemId),
      },
      data: updateItemData,
    });

    return res.status(200).json({
      message: "Item updated successfully",
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteItemController = async (req, res) => {
  const itemId = req.params.id;

  try {
    await prisma.item.delete({
      where: {
        id: parseInt(itemId),
      },
    });

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {
  getAllItemsController,
  createItemController,
  updateItemController,
  deleteItemController,
};
