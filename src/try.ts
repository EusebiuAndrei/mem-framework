import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Photo from './models/Photo';

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'seb9913',
  database: 'projecto',
  entities: [Photo],
  synchronize: true,
  logging: false,
})
  .then(async (connection) => {
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    await connection.manager.save(photo);
    const photoRepository = connection.getRepository(Photo);
    const a = photoRepository.find();
    console.log('Photo has been saved');
  })
  .catch((error) => console.log(error));
