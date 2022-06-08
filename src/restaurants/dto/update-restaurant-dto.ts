import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../restaurant.schema";

export class UpdateRestaurantDto {
   @IsString()
   @IsOptional()
   readonly name: string;
   @IsString()
   @IsEmail()
   @IsOptional()
   readonly email: string;
   @IsString()
   @IsOptional()
   readonly description: string;  
   @IsPhoneNumber('IN')
   @IsOptional()
   readonly phoneNo: number;
   @IsString()
   @IsOptional()
   readonly address: string;
   @IsEnum(Category, { message: "Please enter a valid category" })
   @IsOptional()
   readonly category: Category;
}