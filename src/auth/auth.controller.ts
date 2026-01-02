import { Controller, Post,Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController{
    constructor(private authService:AuthService){}
    @Post("signup")
    signup(@Body() dto:AuthDto){
        return this.authService.signUp(dto);
    }
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto:AuthDto){
        return this.authService.signIn(dto);
    }
}