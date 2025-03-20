import { Api } from '@data-contracts/backend/Api';
import { Assistant, CreateAssistant, UpdateAssistant } from '@data-contracts/backend/data-contracts';
import { Resource } from '@interfaces/resource';

const apiService = new Api({ baseURL: process.env.NEXT_PUBLIC_API_URL, withCredentials: true });

const assistants: Resource<Assistant, CreateAssistant, UpdateAssistant> = {
  name: 'assistants',
  getOne: apiService.assistantsControllerGetOne,
  getMany: apiService.assistantsControllerGetMany,
  create: apiService.assistantsControllerCreate,
  update: apiService.assistantsControllerUpdate,
  remove: apiService.assistantsControllerDelete,
  defaultValues: {
    name: '',
    app: '',
    assistantId: '',
    question: '',
    startText: '',
    submitText: '',
    backgroundColor: '',
    published: false,
    finalQuestions: [{ question: '', answers: [{ value: '', output: '' }] }],
  },
  requiredFields: [
    'name',
    'app',
    'assistantId',
    'published',
    'question',
    'startText',
    'submitText',
    'finalQuestions',
    'finalQuestions.0.question',
    'finalQuestions.0.answers',
    'finalQuestions.0.answers.0.value',
    'finalQuestions.0.answers.0.output',
  ],
};

const resources = { assistants };

export default resources;
