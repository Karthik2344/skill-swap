import asyncHandler from "express-async-handler";
import BarterRequest from "../models/BarterRequest.js";

export const createBarterRequest = asyncHandler(async (req, res) => {
  const { recieverId, offeredSkill, requestedSkill } = req.body;
  const senderId = req.user._id;

  if (!recieverId || !offeredSkill?.length || !requestedSkill?.length) {
    throw new Error("Please fill all the fields");
  }

  const existingRequest = await BarterRequest.findOne({
    senderId,
    recieverId,
    offeredSkill: { $all: offeredSkill, $size: offeredSkill.length },
    requestedSkill: { $all: requestedSkill, $size: requestedSkill.length },
    status: "pending",
  });

  if (existingRequest) {
    return res.status(400).json({
      success: false,
      message: "You already have a pending request for this barter",
    });
  }
  const barterRequest = await BarterRequest.create({
    senderId,
    recieverId,
    offeredSkill,
    requestedSkill,
  });

  res.status(201).json(barterRequest);
});

export const getRequestsForUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    // res.status(401);
    throw new Error("Not authorized");
  } 

  const { type = "recieved", status, sortBy = "desc" } = req.query;
  const filter = {};
  filter[type === "sent" ? "senderId" : "recieverId"] = userId;
  if (status) {
    filter.status = status;
  }

  const sortOrder = sortBy === "asc" ? 1 : -1;

  const requests = await BarterRequest.find(filter)
    .sort({
      createdAt: sortOrder,
    })
    .populate("senderId", "username email")
    .populate("recieverId", "username email");

  console.log(requests);

  return res.status(200).json({ success: true, data: requests });
});

export const respondToBarterRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.id;
  const userId = req.user._id;
  const { status } = req.body;
  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  const request = await BarterRequest.findById(requestId);
  if (userId.toString() != request.recieverId.toString()) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  if (!request) {
    return res
      .status(404)
      .json({ success: false, message: "Request not found" });
  }
  request.status = status;
  await request.save();
  console.log(request);
  res.json({ success: true, data: request });
});

export const getBarterHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const barterHistory = await BarterRequest.find({
    $or: [{ senderId: userId }, { recieverId: userId }],
    status: { $ne: "pending" },
  })
    .sort({ updatedAt: -1 })
    .populate("senderId", "username email")
    .populate("recieverId", "username email");

  res.status(200).json({ success: true, data: barterHistory });
});

export const getBarterSent = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const requests = await BarterRequest.find({ senderId: userId })
    .populate("recieverId", "username email"); // ✅ populate receiver details
  res.status(200).json({
    success: true,
    data: requests,
  });
});


export const cancelBarterRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.id;
  const userId = req.user._id;

  const request = await BarterRequest.findById(requestId);
  if (!request) {
    return res
      .status(404)
      .json({ success: false, message: "Request not found" });
  }

  if (request.senderId.toString() !== userId.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to cancel this request",
    });
  }

  if (request.status !== "pending") {
    return res.status(400).json({
      success: false,
      message: "Only pending requests can be canceled",
    });
  }

  await BarterRequest.findByIdAndDelete(requestId);
  res
    .status(200)
    .json({ success: true, message: "Request canceled successfully" });
});
