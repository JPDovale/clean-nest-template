import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '@infra/app.module'
import { PrismaService } from '@infra/database/prisma/index.service'

describe('Create faker (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /faker', async () => {
    const response = await request(app.getHttpServer()).post('/faker').send({
      name: 'Faker information',
      lie: 'this is an faker information',
    })

    expect(response.statusCode).toEqual(201)

    const fakerOnDatabase = await prisma.information.findUnique({
      where: {
        name: 'Faker information',
      },
    })

    expect(fakerOnDatabase).toBeTruthy()
  })
})
