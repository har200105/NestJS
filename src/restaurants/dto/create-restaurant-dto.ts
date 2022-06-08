import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../restaurant.schema";

export class CreateRestaurantDto {
   @IsString()
   @IsNotEmpty()
   readonly name: string;
   @IsString()
   @IsEmail()
   readonly email: string;
   @IsString()
   @IsNotEmpty()
   readonly description: string;
   @IsNotEmpty()  
   @IsPhoneNumber('IN')
   readonly phoneNo: number;
   @IsNotEmpty()
   @IsString()
   readonly address: string;
   @IsNotEmpty()
   @IsEnum(Category,{message:"Please enter a valid category"})
   readonly category: Category;
}