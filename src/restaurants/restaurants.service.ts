import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { Restaurant } from './restaurant.schema';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurant.name) private restaurantModel : mongoose.Model<Restaurant>
    ) {
        
    }

    async findAll(query: Query): Promise<Restaurant[]>{

        const resPerPage = 5;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage-1);
        
        const keyword = query?.keyword ? {
            name: {
                $regex: query.keyword,
                $options: "i"
            }
        } : {};

        const restaurants = await this.restaurantModel.find({ ...keyword })
            .limit(resPerPage)
            .skip(skip);
        
        return restaurants;
    }

    async create(restaurant: Restaurant): Promise<Restaurant>{
        const response = await this.restaurantModel.create(restaurant);
        return response;
    }

    async findById(id: String): Promise<Restaurant>{
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new BadRequestException('Invalid Id')
        }
        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new NotFoundException('Restaurant Not Found')
        }
        return restaurant;
    }


    async updateById(id: string, restaurant: Restaurant): Promise<Restaurant>{
        return await this.restaurantModel.findByIdAndUpdate(id, restaurant,{
            new: true,
            runValidators: true
        });
    }

}
