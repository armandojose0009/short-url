import { IsUrl, IsOptional, Matches } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @Matches(/^[a-zA-Z0-9_-]+$/)
  slug?: string;
}
