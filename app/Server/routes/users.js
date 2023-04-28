import express from "express";
import {deleteUser, disLike, getUser, like, subscribe, unSubscribe, update,viewed} from "../controllers/user.js";
import {verifyToken} from "../verifyToken.js";

const router = express.Router()

router.put("/:id",verifyToken, update)
router.delete("/:id",verifyToken, deleteUser)
router.get("/find/:id",getUser)
router.put("/sub/:id",verifyToken,subscribe)
router.put("/unsub/:id",verifyToken,unSubscribe)
router.put("/like/:videoId",verifyToken,like)
router.put("/dislike/:videoId",verifyToken,disLike)
router.put("/viewed/:videoId",verifyToken,viewed)

export default router