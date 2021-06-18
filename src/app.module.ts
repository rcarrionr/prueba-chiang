import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService, UsersService],
})
export class AppModule {}
