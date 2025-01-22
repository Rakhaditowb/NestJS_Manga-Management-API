import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ChapterResponse,
  CreateChapterRequest,
  GetChapterRequest,
  RemoveChapterRequest,
  UpdateChapterRequest,
} from '../model/chapter.model';
import { WebResponse } from '../model/web.model';
import { ChapterService } from './chapter.service';
import { Auth } from '../common/auth.decorator';
import { User } from '.prisma/client';

@Controller('/api/manga/:mangaId/chapters')
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Param('mangaId', ParseIntPipe) mangaId: number,
    @Body() request: CreateChapterRequest
  ): Promise<WebResponse<ChapterResponse>> {
    request.manga_id = mangaId;
    const result = await this.chapterService.create(user, request);
    return {
      Data: result,
    };
  }

  @Get('/:chapterId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('mangaId', ParseIntPipe) mangaId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number
  ): Promise<WebResponse<ChapterResponse>> {
    const request: GetChapterRequest = {
      manga_id: mangaId,
      chapter_id: chapterId,
    };
    const result = await this.chapterService.get(user, request);
    return {
      Data: result,
    };
  }

  @Put('/:chapterId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('mangaId', ParseIntPipe) mangaId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Body() request: UpdateChapterRequest
  ): Promise<WebResponse<ChapterResponse>> {
    request.manga_id = mangaId;
    request.id = chapterId;
    const result = await this.chapterService.update(user, request);
    return {
      Data: result,
    };
  }

  @Delete('/:chapterId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('mangaId', ParseIntPipe) mangaId: number,
    @Param('chapterId', ParseIntPipe) chapterId: number
  ): Promise<WebResponse<boolean>> {
    const request: RemoveChapterRequest = {
      manga_id: mangaId,
      chapter_id: chapterId,
    };
    await this.chapterService.remove(user, request);
    return {
      Data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async list(
    @Auth() user: User,
    @Param('mangaId', ParseIntPipe) mangaId: number
  ): Promise<WebResponse<ChapterResponse[]>> {
    const result = await this.chapterService.list(user, mangaId);
    return {
      Data: result,
    };
  }
}
