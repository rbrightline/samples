import {
  Column,
  DataSource,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Role {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'text' }) name: string;
}

@Entity()
class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'text' }) username: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];
}

const datasource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [User, Role],
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
