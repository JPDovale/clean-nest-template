import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '@infra/app.module'
import { PrismaService } from '@infra/database/prisma/index.service'

describe('Create real (E2E)', () => {
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

  test('[POST] /real', async () => {
    const response = await request(app.getHttpServer()).post('/real').send({
      name: 'Real information',
      true: 'this is an real information',
    })

    expect(response.statusCode).toEqual(201)

    const realOnDatabase = await prisma.information.findUnique({
      where: {
        name: 'Real information',
      },
    })

    expect(realOnDatabase).toBeTruthy()
  })
})
