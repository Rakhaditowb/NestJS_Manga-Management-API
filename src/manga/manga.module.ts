import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';

@Module({
  providers: [MangaService],
  controllers: [MangaController],
  exports: [MangaService],
})
export class MangaModule {}
