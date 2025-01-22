import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Manga, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  CreateMangaRequest,
  MangaResponse,
  UpdateMangaRequest,
} from '../model/manga.model';
import { MangaValidation } from './manga.validation';

@Injectable()
export class MangaService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService
  ) {}

  async create(
    user: User,
    request: CreateMangaRequest
  ): Promise<MangaResponse> {
    this.logger.debug(
      'MangaService.create(${JSON.stringify(user)},${JSON.stringify(request)})'
    );
    const createRequest: CreateMangaRequest = this.validationService.validate(
      MangaValidation.CREATE,
      request
    );

    const manga = await this.prismaService.manga.create({
      data: { ...createRequest, ...{ username: user.username } },
    });

    return this.toMangaResponse(manga);
  }

  toMangaResponse(manga: Manga): MangaResponse {
    return {
      title: manga.title,
      author: manga.author,
      status: manga.status,
      release_date: manga.release_date,
      id: manga.id,
    };
  }

  async checkMangaMustExist(username: string, mangaId: number) {
    const manga = await this.prismaService.manga.findFirst({
      where: {
        username: username,
        id: mangaId,
      },
    });

    if (!manga) {
      throw new HttpException('Manga not found', 404);
    }

    return manga;
  }

  async get(user: User, mangaId: number): Promise<MangaResponse> {
    const manga = await this.checkMangaMustExist(user.username, mangaId);

    return this.toMangaResponse(manga);
  }

  async update(
    user: User,
    request: UpdateMangaRequest
  ): Promise<MangaResponse> {
    const updateRequest = this.validationService.validate(
      MangaValidation.UPDATE,
      request
    );
    let manga = await this.checkMangaMustExist(user.username, updateRequest.id);

    manga = await this.prismaService.manga.update({
      where: {
        id: manga.id,
        username: manga.username,
      },
      data: updateRequest,
    });
    return this.toMangaResponse(manga);
  }

  async remove(user: User, mangaId: number): Promise<MangaResponse> {
    await this.checkMangaMustExist(user.username, mangaId);

    const manga = await this.prismaService.manga.delete({
      where: {
        id: mangaId,
        username: user.username,
      },
    });
    return this.toMangaResponse(manga);
  }
}
