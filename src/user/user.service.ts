import { Injectable } from '@nestjs/common';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class UserService {
    getProfile(user:User){
        return user
    }
}
