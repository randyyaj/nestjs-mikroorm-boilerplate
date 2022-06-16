import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: EntityRepository<PostEntity>,
  ) {}

  async create(data: CreatePostDto): Promise<PostEntity> {
    try {
      const post = this.postRepository.create({
        title: data.title,
        desc: data.desc,
      });
      await this.postRepository.persistAndFlush(post);
      return post;
    } catch (e: Error | any) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(): Promise<PostEntity[]> {
    try {
      return await this.postRepository.findAll();
    } catch (e: Error | any) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: number): Promise<PostEntity>  {
    return await this.postRepository.findOneOrFail(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const existingPost = await this.postRepository.findOne(id);
    return this.postRepository.assign(existingPost, updatePostDto);
  }

  async remove(id: number, withFlush = true): Promise<void>  {
    try {
      const post = await this.findOne(id);
      this.postRepository.remove(post);

      if (withFlush) {
        return this.postRepository.flush();
      }
    } catch (e: Error | any) {
      throw new BadRequestException(e.message);
    }
  }

  async getDeletedPosts(): Promise<PostEntity[]> {
    try {
      return await this.postRepository.find({ deletedAt: { $ne: null } });
    } catch (e: Error | any) {
      throw new BadRequestException(e.message);
    }
  }

  async restorePost(id: number): Promise<PostEntity>  {
    const existingPost = await this.findOne(id);
    existingPost.deletedAt = null;
    await this.postRepository.persistAndFlush(existingPost);
    return existingPost;
  }

  async softDeletePost(id: number): Promise<PostEntity> {
    const existingPost = await this.findOne(id);
    existingPost.deletedAt = new Date();
    await this.postRepository.persistAndFlush(existingPost);
    return existingPost;
  }
}
