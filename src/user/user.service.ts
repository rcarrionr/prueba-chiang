import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getFollowers(username: string): Promise<UserDocument> {
    return this.userModel
      .findOne({ username: username }, { username: 1, followers: 1, _id: 0 })
      .populate('followers', '-_id username');
  }

  async getFollowing(username: string): Promise<UserDocument> {
    return this.userModel
      .findOne({ username: username }, { username: 1, following: 1, _id: 0 })
      .populate('following', '-_id username');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async follow(username: string, userFollow: string) {
    const follower = await this.userModel.findOne({ username: username });
    const following = await this.userModel.findOne({ username: userFollow });

    follower.following.push(following);
    following.followers.push(follower);

    await following.save();
    await follower.save();

    return { successful: true };
  }

  async getDistance(userSource: string, userDestination: string) {
    const source = await this.userModel
      .findOne({ username: userSource })
      .populate('following', '-_id username');

    const step = [];

    await this.calculateDestination(source, userDestination, step);

    return { distance: step.length };
  }

  async calculateDestination(source, destination, step = []) {
    const following = source.get('following.username');
    if (!following.includes(destination)) {
      for (const username of following) {
        step.push(username);
        source = await this.userModel
          .findOne({ username: username })
          .populate('following', '-_id username');

        step = await this.calculateDestination(source, destination, step);
        if (step.includes(destination)) break;
      }
    } else {
      step.push(destination);
    }
    return step;
  }
}

interface c {
  step: number;
  uniqueVerification: string[];
}
