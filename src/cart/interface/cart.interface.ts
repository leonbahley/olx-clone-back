import { Document } from 'mongoose';
export interface ICart extends Document {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly rating: number;
  readonly stock: number;
  readonly category: string;
  readonly thumbnail: string;
}
