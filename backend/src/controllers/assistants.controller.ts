import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import authMiddleware from '../middlewares/auth.middleware';
import {
  AssistantApiResponse,
  AssistantsApiResponse,
  CreateAssistant,
  PublicAssistantApiResponse,
  PublicAssistantsApiResponse,
  UpdateAssistant,
} from '../responses/assistant.response';
import { generateHash } from '@/utils/create-hash';

@Controller()
export class AssistantsController {
  @Get('/assistants/public/all')
  @OpenAPI({
    summary: 'Get a list of public assistants',
  })
  @ResponseSchema(PublicAssistantsApiResponse)
  async getPublicAssistants(@Res() response: Response<PublicAssistantsApiResponse>): Promise<Response<PublicAssistantsApiResponse>> {
    try {
      const assistants = await prisma.assistant.findMany({
        where: { published: true },
        select: {
          name: true,
          app: true,
          question: true,
        },
      });

      return response.send({ data: assistants, message: 'success' });
    } catch {
      throw new HttpException(404, 'Not found');
    }
  }

  @Get('/assistants/public/:app')
  @OpenAPI({
    summary: 'Get a public assistant',
  })
  @ResponseSchema(PublicAssistantApiResponse)
  async getPublicAssistant(
    @Param('app') app: string,
    @Res() response: Response<PublicAssistantApiResponse>,
  ): Promise<Response<PublicAssistantApiResponse>> {
    try {
      const assistant = await prisma.assistant.findFirst({
        where: { app, published: true },
        select: {
          app: true,
          assistantId: true,
          question: true,
          startText: true,
          submitText: true,
          backgroundColor: true,
          finalQuestions: {
            select: { id: true, question: true, answers: { select: { value: true, output: true, id: true } } },
          },
        },
      });
      const hash = generateHash('', assistant.assistantId, assistant.app);

      return response.send({ data: { ...assistant, hash }, message: 'success' });
    } catch {
      throw new HttpException(404, 'Not found');
    }
  }

  @Get('/assistants')
  @OpenAPI({
    summary: 'Get all assistants',
  })
  @ResponseSchema(AssistantsApiResponse)
  @UseBefore(authMiddleware)
  async getMany(@Req() req: RequestWithUser, @Res() response: Response<AssistantsApiResponse>): Promise<Response<AssistantsApiResponse>> {
    const { name } = req.user;
    if (!name) {
      throw new HttpException(400, 'Bad Request');
    }
    try {
      const assistants = await prisma.assistant.findMany({
        include: {
          finalQuestions: { select: { question: true, id: true } },
        },
        orderBy: { id: 'desc' },
      });

      return response.send({ data: assistants, message: 'success' });
    } catch (err) {
      console.log(err);
      return response.send({ data: [], message: 'not found' });
    }
  }

  @Get('/assistants/:id')
  @OpenAPI({
    summary: 'Get a single assistant',
  })
  @ResponseSchema(AssistantApiResponse)
  @UseBefore(authMiddleware)
  async getOne(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<AssistantApiResponse>,
  ): Promise<Response<AssistantApiResponse>> {
    const { name } = req.user;
    if (!name) {
      throw new HttpException(400, 'Bad Request');
    }

    const assistant = await prisma.assistant.findFirst({
      where: { id },
      include: {
        finalQuestions: {
          select: { id: true, question: true, answers: { select: { value: true, output: true, id: true } } },
        },
      },
    });

    return response.send({ data: assistant, message: 'success' });
  }

  @Post('/assistants')
  @OpenAPI({
    summary: 'Creates a new assistant',
  })
  @ResponseSchema(AssistantApiResponse)
  @UseBefore(authMiddleware)
  async create(
    @Req() req: RequestWithUser,
    @Body() body: CreateAssistant,
    @Res() response: Response<AssistantApiResponse>,
  ): Promise<Response<AssistantApiResponse>> {
    const { name } = req.user;

    if (!name || !body) {
      throw new HttpException(400, 'Bad Request');
    }

    const assistant = await prisma.assistant.create({
      data: {
        ...body,
        finalQuestions: {
          create: body.finalQuestions.map(finalQuestion => ({
            question: finalQuestion.question,
            answers: {
              create: finalQuestion.answers.map(answer => ({
                value: answer.value,
                output: answer.output,
              })),
            },
          })),
        },
      },
      include: {
        finalQuestions: {
          select: { id: true, question: true, answers: { select: { id: true, value: true, output: true } } },
        },
      },
    });

    return response.send({ data: assistant, message: 'success' });
  }

  @Patch('/assistants/:id')
  @OpenAPI({
    summary: 'Updates an assistant',
  })
  @ResponseSchema(AssistantApiResponse)
  @UseBefore(authMiddleware)
  async update(
    @Req() req: RequestWithUser,
    @Body() body: UpdateAssistant,
    @Param('id') id: number,
    @Res() response: Response<AssistantApiResponse>,
  ): Promise<Response<AssistantApiResponse>> {
    const { name } = req.user;

    if (!name || !body) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const finalQuestions = await prisma.finalQuestion.findMany({ where: { assistantId: id }, include: { answers: true } });
      const oldFinalQuestionsId = finalQuestions.map(quest => quest.id);

      await prisma.finalQuestion.deleteMany({
        where: {
          id: {
            in: oldFinalQuestionsId,
          },
        },
      });

      const assistant = await prisma.assistant.update({
        where: { id },
        data: {
          ...body,
          updatedAt: new Date(),
          finalQuestions: body.finalQuestions
            ? {
                create: body.finalQuestions.map(finalQuestion => ({
                  question: finalQuestion.question,
                  answers: {
                    create: finalQuestion?.answers
                      ? finalQuestion.answers?.map(answer => ({
                          value: answer.value,
                          output: answer.output,
                        }))
                      : undefined,
                  },
                })),
              }
            : undefined,
        },
        include: {
          finalQuestions: {
            select: { id: true, question: true, answers: { select: { id: true, value: true, output: true } } },
          },
        },
      });

      return response.send({ data: assistant, message: 'success' });
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  @Delete('/assistants/:id')
  @OpenAPI({
    summary: 'Deletes an assistant',
  })
  @UseBefore(authMiddleware)
  async delete(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<boolean>>,
  ): Promise<Response<ApiResponse<boolean>>> {
    const { name } = req.user;

    if (!name || !id) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      await prisma.assistant.delete({
        where: { id },
        include: {
          finalQuestions: {
            include: { answers: true },
          },
        },
      });

      return response.send({ message: 'deleted', data: true });
    } catch (err) {
      throw err;
    }
  }
}
