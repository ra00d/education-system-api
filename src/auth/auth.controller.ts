import { Body, Controller,  Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService){}

  @Post('sign-up')
  signUp(@Body() user:Prisma.userCreateInput){
    return this.authService.signUp(user);
  }
  @Post('log-in')
  signIn(@Body() login:{email:string; password:string;}){
    return this.authService.signIn(login.email,login.password);
  }
}
