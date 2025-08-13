import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlsService {
  constructor(@InjectRepository(Url) private repo: Repository<Url>) {}

  async create({ originalUrl, slug }: CreateUrlDto) {
    if (!slug) slug = nanoid(6);
    const exists = await this.repo.findOne({ where: { slug } });
    if (exists) throw new ConflictException('Slug already taken');
    const url = this.repo.create({ originalUrl, slug });
    return this.repo.save(url);
  }

  async findBySlug(slug: string) {
    const url = await this.repo.findOne({ where: { slug } });
    if (!url) throw new NotFoundException();
    url.visits++;
    await this.repo.save(url);
    return url;
  }

  async findAll() {
    return this.repo.find();
  }
}
