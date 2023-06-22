import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import * as csv from 'fast-csv';

const prisma = new PrismaClient()

async function main() {
    console.log("Top Popularity: ");
    const findPop = await prisma.movie.findMany({
        take: 3,
        include: {
            production_companies: {
              where: {
                name: {
                    in: ['Walt Disney Pictures', 'Marvel Studios']
                }
              },
            },
        },
        orderBy: {
            popularity : 'desc'
        }
    });

    console.log("Top Revenue: ");
    console.dir(findPop);
    for(var result of findPop){
      console.log(JSON.stringify(result.production_companies));
    }
    const findRev = await prisma.movie.findMany({
        take: 5,
        include: {
            genres: {
              where: {
                name: {
                    in: ['Science Fiction']
                }
              },
            },
        },
        orderBy: {
            budget : 'desc'
        }
    });
    console.dir(findRev);
    console.log("Done");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })