import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import Post from './entities/post.entity';
import UpdatePostDto from './dto/updatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class PostsService {
  private lastPostId = 0;

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: string) {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });
      if (post) {
        return post;
      }
      throw new HttpException(
        `Post not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updatePost(id: string, updateBody: UpdatePostDto) {
    try {
      await this.getPostById(id);
      return this.postsRepository.save({ id, ...updateBody });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createPost(createPostBody: CreatePostDto) {
    try {
      const newPost = this.postsRepository.create(createPostBody);
      await this.postsRepository.save(newPost);
      return newPost;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deletePost(id: string) {
    try {
      await this.getPostById(id);
      await this.postsRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
