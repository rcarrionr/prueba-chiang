import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createCatDto: CreatePostDto): Promise<Post> {
    const createdCat = new this.postModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find();
  }
}
