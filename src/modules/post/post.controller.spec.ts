import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MockPostRepository } from '../../shared/mocks/test-mock';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  let postEntityRepository: EntityRepository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule],
      controllers: [PostController],
      providers: [PostService, MockPostRepository],
    }).compile();

    controller = module.get<PostController>(PostController);
    postEntityRepository = module.get(getRepositoryToken(PostEntity));
  });

  it('should be defined', () => {
    jest.spyOn(postEntityRepository, 'create').mockResolvedValue({} as never);
    expect(controller).toBeDefined();
  });
});
