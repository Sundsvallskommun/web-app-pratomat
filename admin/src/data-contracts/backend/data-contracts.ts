/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ClientUser {
  name: string;
  username: string;
}

export interface ClientUserApiResponse {
  data: ClientUser;
  message: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  givenName: string;
  surname: string;
  userId: string;
}

export interface UserApiResponse {
  data: User;
  message: string;
}

export interface UsersApiResponse {
  data: User[];
  message: string;
}

export interface FinalAnswer {
  value: string;
  output: string;
}

export interface CreateFinalAnswer {
  value: string;
  output: string;
}

export interface UpdateFinalAnswer {
  id?: number;
  questionId?: number;
  value: string;
  output: string;
}

export interface FinalQuestion {
  question: string;
  answers?: FinalAnswer[];
}

export interface UpdateFinalQuestion {
  id?: number;
  assistantId?: number;
  question: string;
  answers?: UpdateFinalAnswer[];
}

export interface CreateFinalQuestion {
  question: string;
  answers: CreateFinalAnswer[];
}

export interface Assistant {
  id: number;
  name: string;
  app: string;
  assistantId: string;
  question: string;
  startText: string;
  submitText: string;
  published: boolean;
  finalQuestions?: FinalQuestion[];
  updatedAt: string;
  createdAt: string;
}

export interface PublicAssistant {
  app: string;
  assistantId: string;
  question: string;
  startText: string;
  submitText: string;
  finalQuestions: FinalQuestion[];
  hash: string;
}

export interface PublicAssistantSummary {
  app: string;
  name: string;
  question: string;
}

export interface CreateAssistant {
  name: string;
  app: string;
  assistantId: string;
  question: string;
  startText: string;
  submitText: string;
  published?: boolean;
  finalQuestions: CreateFinalQuestion[];
  backgroundColor: 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
}

export interface UpdateAssistant {
  name?: string;
  app?: string;
  assistantId?: string;
  question?: string;
  startText?: string;
  submitText?: string;
  published?: boolean;
  finalQuestions?: UpdateFinalQuestion[];
  backgroundColor?: 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
}

export interface PublicAssistantApiResponse {
  data: PublicAssistant;
  message: string;
}

export interface PublicAssistantsApiResponse {
  data: PublicAssistantSummary[];
  message: string;
}

export interface AssistantApiResponse {
  data: Assistant;
  message: string;
}

export interface AssistantsApiResponse {
  data: Assistant[];
  message: string;
}
