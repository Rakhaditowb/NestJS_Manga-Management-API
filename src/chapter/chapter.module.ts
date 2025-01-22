import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { MangaModule } from '../manga/manga.module';

@Module({
  imports: [MangaModule],
  providers: [ChapterService],
  controllers: [ChapterController],
})
export class ChapterModule {}
