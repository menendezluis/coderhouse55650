import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("chat", { title: "Chat", style: "../css/style.css" });
});

export default router;
