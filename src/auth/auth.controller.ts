import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('signup')
    signUp(
        @Body() signupDto: SignUpDto
    ): Promise<{ token: string }> {
        return this.authService.signUp(signupDto);
    }

    @Post('login')
    login(
        @Body() loginDto: LoginDto
    ): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(
    ) {
        return { msg: 'Google Authenticated' }
    }

    @Get('google/redirect')
    @UseGuards(GoogleOauthGuard)
    googleAuthRedirect(
    ) {
        return { msg: 'Google Authenticated' }
    }
} 
