import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '@infra/app.module'
import { PrismaService } from '@infra/database/prisma/index.service'

describe('Create table (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /table', async () => {
    const response = await request(app.getHttpServer()).post('/table').send({
      name: 'Table information',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)

    const tableOnDatabase = await prisma.information.findUnique({
      where: {
        name: 'Table information',
      },
    })

    expect(tableOnDatabase).toBeTruthy()
  })
})
