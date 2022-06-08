import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto {
    
    @IsNotEmpty()
    @IsString()    
    readonly name: string;


    @IsNotEmpty()
    @IsEmail({}, { message: 'Please Enter valid Email' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: "Password Length should be greater than 8" })
    readonly password: string;
    
}