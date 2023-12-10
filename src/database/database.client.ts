import { Prisma, PrismaClient } from "@prisma/client";
import { extension } from "prisma-paginate";
import * as bcrypt from "bcrypt";
import { UnauthorizedException } from "@nestjs/common";

// export const prismaClient = new PrismaClient()export type DatabaseClient = typeof prismaClient;
