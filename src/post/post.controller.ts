import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';
import { PostService } from './post.service';
import { Post as PostClass } from './post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postService.create(createPostDto);
  }

  @Get()
  async findAll(): Promise<PostClass[]> {
    return this.postService.findAll();
  }
}
