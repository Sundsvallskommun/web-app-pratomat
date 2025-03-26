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

import {
  AssistantApiResponse,
  AssistantsApiResponse,
  ClientUserApiResponse,
  CreateAssistant,
  PublicAssistantApiResponse,
  PublicAssistantsApiResponse,
  UpdateAssistant,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Index
   * @name IndexControllerIndex
   * @summary Index
   * @request GET:/api/
   */
  indexControllerIndex = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserControllerGetMe
   * @summary Return current user
   * @request GET:/api/me
   */
  userControllerGetMe = (params: RequestParams = {}) =>
    this.request<ClientUserApiResponse, any>({
      path: `/api/me`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerUp
   * @summary Return health check
   * @request GET:/api/health/up
   */
  healthControllerUp = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/health/up`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistants
   * @name AssistantsControllerGetMany
   * @summary Get all assistants
   * @request GET:/api/assistants
   */
  assistantsControllerGetMany = (params: RequestParams = {}) =>
    this.request<AssistantsApiResponse, any>({
      path: `/api/assistants`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistants
   * @name AssistantsControllerCreate
   * @summary Creates a new assistant
   * @request POST:/api/assistants
   */
  assistantsControllerCreate = (data?: CreateAssistant, params: RequestParams = {}) =>
    this.request<AssistantApiResponse, any>({
      path: `/api/assistants`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistants
   * @name AssistantsControllerGetOne
   * @summary Get a single assistant
   * @request GET:/api/assistants/{id}
   */
  assistantsControllerGetOne = (id: number, params: RequestParams = {}) =>
    this.request<AssistantApiResponse, any>({
      path: `/api/assistants/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistants
   * @name AssistantsControllerUpdate
   * @summary Updates an assistant
   * @request PATCH:/api/assistants/{id}
   */
  assistantsControllerUpdate = (id: number, data?: UpdateAssistant, params: RequestParams = {}) =>
    this.request<AssistantApiResponse, any>({
      path: `/api/assistants/${id}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistants
   * @name AssistantsControllerDelete
   * @summary Deletes an assistant
   * @request DELETE:/api/assistants/{id}
   */
  assistantsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/assistants/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistants
   * @name AssistantsControllerGetPublicAssistants
   * @summary Get a list of public assistants
   * @request GET:/api/assistants/public/all
   */
  assistantsControllerGetPublicAssistants = (params: RequestParams = {}) =>
    this.request<PublicAssistantsApiResponse, any>({
      path: `/api/assistants/public/all`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistants
   * @name AssistantsControllerGetPublicAssistant
   * @summary Get a public assistant
   * @request GET:/api/assistants/public/{app}
   */
  assistantsControllerGetPublicAssistant = (app: string, params: RequestParams = {}) =>
    this.request<PublicAssistantApiResponse, any>({
      path: `/api/assistants/public/${app}`,
      method: 'GET',
      ...params,
    });
}
