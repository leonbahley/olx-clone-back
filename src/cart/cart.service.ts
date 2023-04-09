import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICart } from './interface/cart.interface';
import { CreateCartDto } from './dto/create-cart.dto';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<ICart>) {}

  async addItem(createCartDto: CreateCartDto, user: User): Promise<ICart> {
    const data = Object.assign(createCartDto, { user: user._id });
    const addedItem = await new this.cartModel(data);
    return addedItem.save();
  }

  async getAllItems(user: User): Promise<ICart[]> {
    const cartData = await this.cartModel.find({ user: user._id });
    return cartData;
  }

  async deleteItem(itemId: number): Promise<ICart> {
    const deletedItem = await this.cartModel.findOneAndRemove({ id: itemId });

    if (!deletedItem) {
      throw new NotFoundException(`Item #${itemId} not found`);
    }
    return deletedItem;
  }
}
