import express from "express";
import {
  createItemController,
  deleteItemController,
  getAllItemsController,
  updateItemController,
} from "../controllers/itemControllers.js";

const router = express.Router();

router.get("/", getAllItemsController);

router.post("/", createItemController);

router.put("/:id", updateItemController);

router.delete("/:id", deleteItemController);

export default router;
