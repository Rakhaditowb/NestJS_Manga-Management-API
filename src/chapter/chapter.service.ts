import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Chapter, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  CreateChapterRequest,
  ChapterResponse,
  GetChapterRequest,
  UpdateChapterRequest,
  RemoveChapterRequest,
} from '../model/chapter.model';
import { ChapterValidation } from './chapter.validation';
import { MangaService } from '../manga/manga.service';

@Injectable()
export class ChapterService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private mangaService: MangaService
  ) {}

  async create(
    user: User,
    request: CreateChapterRequest
  ): Promise<ChapterResponse> {
    this.logger.debug(
      'ChapterService.create(${JSON.stringify(user)},${JSON.stringify(request)})'
    );
    const createRequest: CreateChapterRequest = this.validationService.validate(
      ChapterValidation.CREATE,
      request
    );

    await this.mangaService.checkMangaMustExist(
      user.username,
      createRequest.manga_id
    );

    const chapter = await this.prismaService.chapter.create({
      data: createRequest,
    });

    return this.toChapterResponse(chapter);
  }

  toChapterResponse(chapter: Chapter): ChapterResponse {
    return {
      id: chapter.id,
      chapter_number: chapter.chapter_number,
      chapter_title: chapter.chapter_title,
      release_date: chapter.release_date,
      page_count: chapter.page_count,
    };
  }

  async CheckChapterMustExist(
    mangaId: number,
    chapterId: number
  ): Promise<Chapter> {
    const chapter = await this.prismaService.chapter.findFirst({
      where: {
        id: chapterId,
        manga_id: mangaId,
      },
    });
    if (!chapter) {
      throw new HttpException('Chapter not found', 404);
    }

    return chapter;
  }

  async get(user: User, request: GetChapterRequest): Promise<ChapterResponse> {
    const getRequest: GetChapterRequest = this.validationService.validate(
      ChapterValidation.GET,
      request
    );
    await this.mangaService.checkMangaMustExist(
      user.username,
      getRequest.manga_id
    );
    const chapter = await this.CheckChapterMustExist(
      getRequest.manga_id,
      getRequest.chapter_id
    );

    return this.toChapterResponse(chapter);
  }

  async update(
    user: User,
    request: UpdateChapterRequest
  ): Promise<ChapterResponse> {
    const updateRequest: UpdateChapterRequest = this.validationService.validate(
      ChapterValidation.UPDATE,
      request
    );

    await this.mangaService.checkMangaMustExist(
      user.username,
      updateRequest.manga_id
    );
    let chapter = await this.CheckChapterMustExist(
      updateRequest.manga_id,
      updateRequest.id
    );

    chapter = await this.prismaService.chapter.update({
      where: {
        id: chapter.id,
        manga_id: chapter.manga_id,
      },
      data: updateRequest,
    });

    return this.toChapterResponse(chapter);
  }

  async remove(
    user: User,
    request: RemoveChapterRequest
  ): Promise<ChapterResponse> {
    const removeRequest: RemoveChapterRequest = this.validationService.validate(
      ChapterValidation.REMOVE,
      request
    );

    await this.mangaService.checkMangaMustExist(
      user.username,
      removeRequest.manga_id
    );
    await this.CheckChapterMustExist(
      removeRequest.manga_id,
      removeRequest.chapter_id
    );

    const chapter = await this.prismaService.chapter.delete({
      where: {
        id: removeRequest.chapter_id,
        manga_id: removeRequest.manga_id,
      },
    });

    return this.toChapterResponse(chapter);
  }

  async list(user: User, mangaId: number): Promise<ChapterResponse[]> {
    await this.mangaService.checkMangaMustExist(user.username, mangaId);
    const chapters = await this.prismaService.chapter.findMany({
      where: {
        manga_id: mangaId,
      },
    });

    return chapters.map((chapter) => this.toChapterResponse(chapter));
  }
}
