import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient({ log: ["query"] });

const users = () => {
	const fakeUsers: Prisma.StudentsCreateInput[] = [];
	for (let i = 0; i < 40; i++) {
		fakeUsers.push({
			email: faker.internet.email({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
			}),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			users: {
				create: {
					password: faker.internet.password(),
					username: faker.internet.email({
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
					}),
					userType: "STUDENT",
					levels: {
						connectOrCreate: {
							where: {
								levelID: 1,
							},
							create: {
								levelName: "Level 1A",
							},
						},
					},
				},
			},
		});
	}
	return fakeUsers;
};
async function main() {
	const data = users();
	for (let index = 0; index < data.length; index++) {
		await prisma.students.create({ data: data[index] });
	}
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
