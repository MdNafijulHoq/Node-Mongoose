import { Date, Types } from "mongoose";

export interface IBorrow {
    book : Types.ObjectId;
    quantity  : number;
    dueDate  : Date;
}

export interface IBorrowMethods {
  availableCopies(): Promise<void>;
}