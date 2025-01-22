import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { MangaModule } from './manga/manga.module';

@Module({
  imports: [CommonModule, UserModule, MangaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
