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
import { MangaService } from './manga.service';
import { Auth } from '../common/auth.decorator';
import { WebResponse } from '../model/web.model';
import { User } from '@prisma/client';
import {
  CreateMangaRequest,
  MangaResponse,
  UpdateMangaRequest,
} from '../model/manga.model';
@Controller('/api/manga')
export class MangaController {
  constructor(private mangaService: MangaService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateMangaRequest
  ): Promise<WebResponse<MangaResponse>> {
    const result = await this.mangaService.create(user, request);
    return {
      Data: result,
    };
  }

  @Get('/:mangaId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('mangaId', ParseIntPipe) mangaId: number
  ): Promise<WebResponse<MangaResponse>> {
    const result = await this.mangaService.get(user, mangaId);
    return {
      Data: result,
    };
  }

  @Put('/:mangaId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('mangaId', ParseIntPipe) mangaId: number,
    @Body() request: UpdateMangaRequest
  ): Promise<WebResponse<MangaResponse>> {
    request.id = mangaId;
    const result = await this.mangaService.update(user, request);
    return {
      Data: result,
    };
  }

  @Delete('/:mangaId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('mangaId', ParseIntPipe) mangaId: number
  ): Promise<WebResponse<boolean>> {
    await this.mangaService.remove(user, mangaId);
    return {
      Data: true,
    };
  }
}
