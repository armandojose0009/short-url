import { Controller, Post, Get, Param, Body, Res } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import type { Response } from 'express';

@Controller('urls')
export class UrlsController {
  constructor(private service: UrlsService) {}

  @Post()
  create(@Body() dto: CreateUrlDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const url = await this.service.findBySlug(slug);
    return res.redirect(url.originalUrl);
  }
}
