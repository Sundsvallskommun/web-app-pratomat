import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import ApiResponse from '../interfaces/api-service.interface';
import type {
  Assistant as AssistantType,
  PublicAssistant as PublicAssistantType,
  PublicAssistantSummary as PublicAssistantSummaryType,
  FinalAnswer as FinalAnswerType,
  FinalQuestion as FinalQuestionType,
} from '../interfaces/assistant.interface';
import { BackgroundColor } from '../interfaces/assistant.interface';

export class FinalAnswer implements FinalAnswerType {
  @IsString()
  value: string;
  @IsString()
  output: string;
}

export class CreateFinalAnswer implements Omit<FinalAnswerType, 'id' | 'questionId'> {
  @IsString()
  value: string;
  @IsString()
  output: string;
}

export class UpdateFinalAnswer implements FinalAnswerType {
  @IsInt()
  @IsOptional()
  id: number;
  @IsInt()
  @IsOptional()
  questionId: number;
  @IsString()
  value: string;
  @IsString()
  output: string;
}

export class FinalQuestion implements FinalQuestionType {
  @IsString()
  question: string;
  @ValidateNested({ each: true })
  @Type(() => FinalAnswer)
  @IsOptional()
  answers?: FinalAnswer[];
}

export class UpdateFinalQuestion implements FinalQuestionType {
  @IsInt()
  @IsOptional()
  id: number;
  @IsInt()
  @IsOptional()
  assistantId: number;
  @IsString()
  question: string;
  @ValidateNested({ each: true })
  @Type(() => UpdateFinalAnswer)
  @IsOptional()
  answers?: UpdateFinalAnswer[];
}

export class CreateFinalQuestion implements Omit<FinalQuestionType, 'id' | 'assistantId'> {
  @IsString()
  question: string;
  @ValidateNested({ each: true })
  @Type(() => CreateFinalAnswer)
  answers: CreateFinalAnswer[];
}

export class Assistant implements AssistantType {
  @IsInt()
  id: number;
  @IsString()
  name: string;
  @IsString()
  app: string;
  @IsString()
  assistantId: string;
  @IsString()
  question: string;
  @IsString()
  startText: string;
  @IsString()
  submitText: string;
  @IsBoolean()
  published: boolean;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FinalQuestion)
  finalQuestions?: FinalQuestion[];
  @IsString()
  updatedAt: Date;
  @IsString()
  createdAt: Date;
}

export class PublicAssistant implements PublicAssistantType {
  @IsString()
  app: string;
  @IsString()
  assistantId: string;
  @IsString()
  question: string;
  @IsString()
  startText: string;
  @IsString()
  submitText: string;
  @ValidateNested({ each: true })
  @Type(() => FinalQuestion)
  finalQuestions: FinalQuestion[];
  @IsString()
  hash: string;
}
export class PublicAssistantSummary implements PublicAssistantSummaryType {
  @IsString()
  app: string;
  @IsString()
  name: string;
  @IsString()
  question: string;
}

export class CreateAssistant implements Omit<AssistantType, 'id' | 'createdAt' | 'updatedAt'> {
  @IsString()
  name: string;
  @IsString()
  app: string;
  @IsString()
  assistantId: string;
  @IsString()
  question: string;
  @IsString()
  startText: string;
  @IsString()
  submitText: string;
  @IsBoolean()
  @IsOptional()
  published: boolean;
  @ValidateNested({ each: true })
  @Type(() => CreateFinalQuestion)
  finalQuestions: CreateFinalQuestion[];

  @IsEnum(BackgroundColor)
  backgroundColor: BackgroundColor;
}

export class UpdateAssistant implements Partial<Omit<AssistantType, 'updatedAt' | 'createdAt'>> {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  app: string;
  @IsString()
  @IsOptional()
  assistantId: string;
  @IsString()
  @IsOptional()
  question: string;
  @IsString()
  @IsOptional()
  startText: string;
  @IsString()
  @IsOptional()
  submitText: string;
  @IsBoolean()
  @IsOptional()
  published: boolean;
  @ValidateNested({ each: true })
  @Type(() => UpdateFinalQuestion)
  @IsOptional()
  finalQuestions?: UpdateFinalQuestion[];

  @IsEnum(BackgroundColor)
  @IsOptional()
  backgroundColor?: BackgroundColor;
}

export class PublicAssistantApiResponse implements ApiResponse<PublicAssistant> {
  @ValidateNested()
  @Type(() => PublicAssistant)
  data: PublicAssistant;
  @IsString()
  message: string;
}

export class PublicAssistantsApiResponse implements ApiResponse<PublicAssistantSummary[]> {
  @ValidateNested({ each: true })
  @Type(() => PublicAssistantSummary)
  data: PublicAssistantSummary[];
  @IsString()
  message: string;
}

export class AssistantApiResponse implements ApiResponse<Assistant> {
  @ValidateNested()
  @Type(() => Assistant)
  data: Assistant;
  @IsString()
  message: string;
}

export class AssistantsApiResponse implements ApiResponse<Assistant[]> {
  @ValidateNested({ each: true })
  @Type(() => Assistant)
  data: Assistant[];
  @IsString()
  message: string;
}
