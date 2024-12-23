import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return await this.prisma.user.create({
      data,
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
    return await this.prisma.user
      .delete({
        where: {
          id,
        },
      })
      .then((res) => {
        return {
          status: 200,
          message: 'User Deleted Successfully',
          data: res,
        };
      })
      .catch((error: any) => {
        console.log('ERROR --->', error);
        return {
          status: 404,
          message: 'User not found',
        };
      });
  }
}
