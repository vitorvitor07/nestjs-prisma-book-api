import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrisService';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) throw new Error('Book already existis');

    const book = this.prisma.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) throw new Error('Book does not exist');

    return this.prisma.book.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) throw new Error('Book does not exist');

    return this.prisma.book.delete({ where: { id } });
  }
}
