import { Router } from "express";
import { generateUser } from "../utils.js";

const router = Router();

router.get("/", (req, res) => {
  const { premium } = req.query;

  let users = [];
  for (let i = 0; i < 10; i++) {
    let tempUser = generateUser();
    if (premium === "true" && tempUser.isPremium) {
      users.push(tempUser);
    } else if (premium === "false" && !tempUser.isPremium) {
      users.push(tempUser);
    } else if (!premium) {
      users.push(tempUser);
    }
  }
  res.json({
    count: users.length,
    data: users,
  });
});

export default router;
