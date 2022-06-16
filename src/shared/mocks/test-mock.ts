import { EntityManager } from "@mikro-orm/core";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { PostEntity } from "../../modules/post/entities/post.entity";

export const RepoFactory = jest.fn(() => ({
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    findAndCount: jest.fn(),
    flush: jest.fn(),
    persist: jest.fn(),
    persistAndFlush: jest.fn(),
    count: jest.fn(),
  }));
  
  export function getMockEntityManager(mockRawResult?: any): any {
    return {
      provide: EntityManager,
      useFactory: jest.fn(() => ({
        flush: jest.fn(),
        transactional: jest.fn(),
        getConnection: jest.fn(() => ({
          execute: jest.fn(() => mockRawResult),
        })),
      })),
    };
  }
  
  export const MockPostRepository = { provide: getRepositoryToken(PostEntity), useFactory: RepoFactory };