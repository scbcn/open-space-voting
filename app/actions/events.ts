"use server";

import { connectDB } from "@/lib/mongoose";
import Event, { IOpenSpaceEvent } from "@/models/Event";
import mongoose from "mongoose";

type EventInput = Omit<IOpenSpaceEvent, '_id' | 'createdAt' | 'updatedAt'>;
type EventWithId = IOpenSpaceEvent & { _id: mongoose.Types.ObjectId };

export async function getEvents() {
  console.log("getEvents");
  await connectDB();
  const events = (await Event.find().sort({ date: 1 }).lean()) as unknown as EventWithId[];
  
  return events.map(event => ({
    ...event,
    _id: event._id.toString()
  }));
}

export async function getEventByCode(code: string){
  await connectDB();

  console.log("getEventByCode", code);
  const event = (await Event.findOne({ code }).lean()) as unknown as EventWithId;
  if (!event) return null;
  return {
    ...event,
    _id: event._id.toString()
  };
}



export async function getEventById(id: string) {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const event = (await Event.findById(id).lean()) as unknown as EventWithId;
  if (!event) return null;
  
  return {
    ...event,
    _id: event._id.toString()
  };
}

export async function createEvent(data: EventInput) {
  await connectDB();
  const newEvent = new Event({
    ...data,
    status: "draft",
    allowProposals: true,
    allowVoting: true,
  });
  await newEvent.save();
  return newEvent;
}
