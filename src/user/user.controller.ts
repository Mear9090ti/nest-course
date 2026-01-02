import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import type { User } from 'src/generated/prisma/client';




@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    
    @Get("profile")
    getProfile(@GetUser() user:User){

        return this.userService.getProfile(user)

    }
}
