import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Schema()
export class Cart {
  @Prop()
  id: number;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  rating: number;
  @Prop()
  stock: number;
  @Prop()
  category: string;
  @Prop()
  thumbnail: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
