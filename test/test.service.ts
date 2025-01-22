import { PrismaService } from '../src/common/prisma.service';
import { Injectable } from '@nestjs/common';
import { User, Manga } from '@prisma/client';
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
}
