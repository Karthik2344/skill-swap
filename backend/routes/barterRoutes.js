  import express from "express";
  import {
    cancelBarterRequest,
    createBarterRequest,
    getBarterHistory,
    getBarterSent,
    getRequestsForUser,
    respondToBarterRequest,
  } from "../controllers/Barter.js";
  import protect from "../middleware/auth.js";

  const barterRouter = express.Router();

  barterRouter.post("/create", protect, createBarterRequest);
  barterRouter.get("/requests", protect, getRequestsForUser);
  barterRouter.put("/:id/respond", protect, respondToBarterRequest);
  barterRouter.get("/history", protect, getBarterHistory);
  barterRouter.get("/sent", protect, getBarterSent);
  barterRouter.delete("/:id/cancel", protect, cancelBarterRequest);

  export default barterRouter;
