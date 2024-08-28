import { Controller, Get, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { MyJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(MyJwtGuard) // Can also make your own "decorator"
  @Get('me')
  // me(@Req() request: Request) {
  me(@GetUser() user: User) {
    // console.log(request.user);
    return user;
    // Now we create a "custom" guard
  }
}
