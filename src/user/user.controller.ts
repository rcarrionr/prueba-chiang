import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreatePostDto } from '../post/create-post.dto';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('/:username/followers')
  async getFollowers(@Param('username') username: string) {
    return await this.usersService.getFollowers(username);
  }

  @Get('/:username/following')
  async getFollowing(@Param('username') username: string) {
    return await this.usersService.getFollowing(username);
  }

  @Get(':userSource/distance/:userDestination')
  async getDistance(
    @Param('userSource') userSource: string,
    @Param('userDestination') userDestination: string,
  ) {
    return await this.usersService.getDistance(userSource, userDestination);
  }

  @Post('/:username/follow/:userFollow')
  async followingUser(
    @Param('username') username: string,
    @Param('userFollow') userFollow: string,
  ) {
    return await this.usersService.follow(username, userFollow);
  }
}
