import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { MockPostRepository } from '../../shared/mocks/test-mock';
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let postEntityRepository: EntityRepository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule],
      providers: [PostService, MockPostRepository],
    }).compile();

    service = module.get<PostService>(PostService);
    postEntityRepository = module.get(getRepositoryToken(PostEntity));
  });

  it('should be defined', () => {
    jest.spyOn(postEntityRepository, 'create').mockResolvedValue({} as never);
    expect(service).toBeDefined();
  });
});
