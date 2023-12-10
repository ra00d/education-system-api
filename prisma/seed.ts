import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient({ log: ["query"] });

const users = () => {
	const fakeUsers: Prisma.userCreateInput[] = [];
	for (let i = 0; i < 40; i++) {
		fakeUsers.push({
			email: faker.internet.email({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
			}),
			username: faker.internet.email({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
			}),
			role: {
				connect: {
					id: 1,
				},
			},
			password_hash: faker.internet.password(),

			student: {
				create: {
					conected: false,
					level: {
						connectOrCreate: {
							where: {
								id: 2,
							},
							create: {
								name: "Second",
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
	const allStudent = users();

	Promise.allSettled(
		allStudent.map(async (user) => await prisma.user.create({ data: user })),
	).then((res) => {
		for (const result of res) {
			console.log(result);
		}
	});
	// await prisma.user.createMany({
	// 	skipDuplicates: true,
	// 	data: allStudent,
	// });
	// console.log(roles);
	// console.log(students);
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
