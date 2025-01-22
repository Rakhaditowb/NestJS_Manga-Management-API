import { PrismaService } from '../src/common/prisma.service';
import { Injectable } from '@nestjs/common';
import { User, Manga, Chapter } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }
  async deleteManga() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async getUser(): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        username: 'test',
      },
    });
  }
  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'test',
        password: await bcrypt.hash('test', 10),
        token: 'test',
      },
    });
  }

  async getManga(): Promise<Manga> {
    return this.prismaService.manga.findFirst({
      where: {
        username: 'test',
      },
    });
  }

  async createManga() {
    await this.prismaService.manga.create({
      data: {
        title: 'test',
        author: 'test',
        status: 'test',
        release_date: new Date('2025-01-01'),
        username: 'test',
      },
    });
  }

  async deleteChapter() {
    await this.prismaService.chapter.deleteMany({
      where: {
        manga: {
          username: 'test',
        },
      },
    });
  }

  async createChapter() {
    const manga = await this.getManga();
    await this.prismaService.chapter.create({
      data: {
        manga_id: manga.id,
        chapter_number: '1',
        chapter_title: 'test',
        release_date: new Date('2025-01-01'),
        page_count: '1',
      },
    });
  }

  async getChapter(): Promise<Chapter> {
    return this.prismaService.chapter.findFirst({
      where: {
        manga: {
          username: 'test',
        },
      },
    });
  }
}
