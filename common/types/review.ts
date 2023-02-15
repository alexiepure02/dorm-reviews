import { Dayjs } from "dayjs";

export type Review = {
  id: string;
  userId: string;
  likes: number;
  room: number;
  bathroom: number;
  kitchen: number;
  location: number;
  overall: number;
  comment: string;
  createdAt: Dayjs;
};
