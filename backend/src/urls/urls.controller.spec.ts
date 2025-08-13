import { Test, TestingModule } from '@nestjs/testing';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'mockedSlug123'),
}));

describe('UrlsController', () => {
  let controller: UrlsController;
  let service: jest.Mocked<UrlsService>;

  beforeEach(async () => {
    const mockService: jest.Mocked<UrlsService> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findBySlug: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [{ provide: UrlsService, useValue: mockService }],
    }).compile();

    controller = module.get<UrlsController>(UrlsController);
    service = module.get(UrlsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should return created URL', async () => {
    const dto: CreateUrlDto = { originalUrl: 'https://example.com' };
    const result = {
      id: 1,
      originalUrl: dto.originalUrl,
      slug: 'mockedSlug123',
    };

    service.create.mockResolvedValue(result);

    await expect(controller.create(dto)).resolves.toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findAll should return list', async () => {
    const mockList = [{ id: 1, originalUrl: 'https://site.com', slug: 'a1' }];

    service.findAll.mockResolvedValue(mockList);

    await expect(controller.findAll()).resolves.toEqual(mockList);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('redirect should call res.redirect with correct url', async () => {
    const slug = 'abc123';
    const target = { id: 1, originalUrl: 'https://red.com', slug };

    service.findBySlug.mockResolvedValue(target);

    const res = { redirect: jest.fn() };

    await controller.redirect(slug, res as any);

    expect(service.findBySlug).toHaveBeenCalledWith(slug);
    expect(res.redirect).toHaveBeenCalledWith(target.originalUrl);
  });
});
