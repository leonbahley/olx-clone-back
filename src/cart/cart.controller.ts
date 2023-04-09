import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuard())
  async addItem(
    @Res() response,
    @Body() createCartDto: CreateCartDto,
    @Req() req,
  ) {
    try {
      const ItemToAdd = await this.cartService.addItem(createCartDto, req.user);
      return response.status(HttpStatus.CREATED).json({
        ItemToAdd,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Item not added',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllItems(@Res() response, @Req() req) {
    try {
      const cartData = await this.cartService.getAllItems(req.user);
      return response.status(HttpStatus.OK).json({
        cartData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:_id')
  @UseGuards(AuthGuard())
  async deleteStudent(@Res() response, @Param('_id') itemId: number) {
    try {
      await this.cartService.deleteItem(itemId);
      return response.status(HttpStatus.OK).send();
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
