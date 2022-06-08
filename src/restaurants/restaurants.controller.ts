import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant-dto';
import { Restaurant } from './restaurant.schema';
import { RestaurantsService } from './restaurants.service';
import { Query as ExpressQuery } from 'express-serve-static-core';  
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/user';
import { User } from 'src/auth/schema/user.schema';
@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantService: RestaurantsService) {

    }

    @Get('all')
            async getAllRestaurants(@Res() res:Response,@Query() query : ExpressQuery ):Promise<Restaurant[]> {
            return this.restaurantService.findAll(query);
        // return res.status(HttpStatus.CREATED)     
    }
    
    @Post('add')
    @UseGuards(AuthGuard())
        // @UsePipes(ValidationPipe)
    async createRestaurant(@Body() restaurant: CreateRestaurantDto,
    @CurrentUser() user:User
    ): Promise<Restaurant>{
              return this.restaurantService.create(restaurant);
    }

    @Get(':id')
    async getRestaurant(@Param('id') id:string): Promise<Restaurant>{
        return this.restaurantService.findById(id);
    }

    @Put('id')
    async updateRestaurant(@Param('id') id: string, @Body() restaurant): Promise<Restaurant> {
        await this.restaurantService.findById(id);
        return this.restaurantService.updateById(id, restaurant);
    }

} 
