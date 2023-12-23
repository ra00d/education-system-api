import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient({ log: ["query"] });

const generatePassword = async () => await bcrypt.hash("admin", 10);
const levels: Prisma.LevelCreateInput[] = [
	{
		name: "Level 1",
	},
	{
		name: "Level 2",
	},
	{
		name: "Level 3",
	},
	{
		name: "Level 4",
	},
];

async function main() {
	const password = await generatePassword();
	const admin: Prisma.usersCreateInput = {
		name: "admin",
		email: "admin@email.com",
		password,
		role: "ADMIN",
		phone: "0000000000",
	};

	await prisma.users.create({
		data: admin,
	});
	await prisma.level.createMany({
		data: levels,
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
