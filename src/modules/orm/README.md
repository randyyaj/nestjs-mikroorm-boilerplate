# OrmModule

The OrmModule handle registering all the entities.

```
MikroOrmModule.forFeature([SomeEntity, SomeEntity2])
```

If a repository is needed then we can just import the OrmModule into the module and it will be able to use any Entity Repositories

```
@Module({
  imports: [OrmModule],
  controllers: [XController],
  providers: [XService],
})
export class XModule {}


@Injectable()
export class XService {
    constructor(@InjectRepository(SomeEntity) private readonly someRepository: EntityRepository<SomeEntity>,) {}
}
```