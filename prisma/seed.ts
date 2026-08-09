import "dotenv/config";
import slugify from "slugify";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const COLLECTIONS = [
  "Frontend",
  "Backend",
  "Databases",
  "DevOps",
  "Artificial Intelligence",
  "Mobile Development",
  "Desktop Development",
  "Game Development",
  "Programming Languages",
  "Security",
  "Testing",
  "Git & Collaboration",
  "Software Architecture",
  "UI / UX",
  "Tools",
  "Career",
  "Algorithms & Computer Science",
  "Networking",
  "Operating Systems",
];

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  for (const name of COLLECTIONS) {
    await prisma.collection.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
        slug: slugify(name, {
          lower: true,
          strict: true,
        }),
      },
    });
  }

  console.log("Collections seeded successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();
    await pool.end();

    process.exit(1);
  });
