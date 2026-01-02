import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }
    async signIn(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!user) { throw new ForbiddenException("Wrong Email or Password") }
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches) { throw new ForbiddenException("Wrong Email or Password") }
        return  this.signToken(user.id,user.email);;



    }
    async signUp(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            })

            return this.signToken(user.id,user.email);

        }
        catch (err) {
            if (err.code === "P2002") {
                throw new ConflictException("Email already registered")
            }
            else {
                throw err;
            }
        }

    }

    signToken(userId:number,email:string):Promise<string>{
        const payload={
            sub:userId,
            email
        }
        return this.jwt.signAsync(payload,{
            expiresIn:"15m",
            secret:process.env.JWT_SECRET
        })

    }



}