import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, firstName: string, lastName: string) {
    console.log(email, firstName, lastName);
    return await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async updateUser(
    id: number,
    updatedUser: { email: string; firstName: string; lastName: string },
  ) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
