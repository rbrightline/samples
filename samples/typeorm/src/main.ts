import { Column, DataSource, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'text' }) username: string;
}

const datasource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [User],
  synchronize: true,
  dropSchema: true,
});

async function main() {
  const ds = await datasource.initialize();

  const userRepo = ds.getRepository(User);

  const savedUser = await userRepo.save({ username: 'john' });
  console.log('savedUser:', savedUser);
  const users = await userRepo.find();
  console.log('users:', users);
}

main();
