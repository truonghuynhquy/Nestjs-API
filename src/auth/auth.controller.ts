import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  // Auth service is automatically created when initializing the controller
  constructor(private authService: AuthService) {}

  @Post('register')
  // register(@Req() request: Request)
  register(@Body() body: AuthDTO) {
    console.log(body);
    return this.authService.register(body);
  }

  //POST: .../auth/login
  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }
}
