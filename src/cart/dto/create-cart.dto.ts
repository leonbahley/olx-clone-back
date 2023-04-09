import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/auth/schema/user.schema';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;

  @IsEmpty()
  readonly user: User;
}
