import { EntityRepository, Repository } from 'typeorm';
import Photo from '../models/Photo';

@EntityRepository(Photo)
class PhotoRepository extends Repository<Photo> {}

export default PhotoRepository;
