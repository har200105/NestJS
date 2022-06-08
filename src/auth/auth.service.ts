import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { User } from './schema/user.schema';
import bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import ApiFeatures from 'src/utils/apiFeatures';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectModel(User.name) private userModal: Model<User>,
        private jwtService:JwtService
    ) { }

    async signUp(signupDto: SignupDto): Promise<User> {
        try {
            const { name, email, password } = signupDto;
            const hashedPassword = await bcryptjs.hash(password, 10);
            const user = await this.userModal.create({
                name, email, password: hashedPassword
            });
            return user;
        } catch (e) {
            if (e.code === 11000) {
                throw new ConflictException('Email already exists , Please try with an new email');
            }
            console.log(e);
        }
    }

    async login(loginDto: LoginDto): Promise<User>{
        
        const { email, password } = loginDto;
        const user = await this.userModal.findOne({ email });
        
        if (!user) {
            throw new UnauthorizedException('User with this email doesn\'t exist');
        }

        const isPasswordRight = await bcryptjs.compare(password, user.password);

        if (!isPasswordRight) {
            throw new UnauthorizedException('Invalid Email or Password');
        }

        const token = await ApiFeatures.assignJwtToken(user._id.toString(), this.jwtService);

        return user;

    }


}
