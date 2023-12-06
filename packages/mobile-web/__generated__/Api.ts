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

export interface LoginDto {
  /** 이메일 주소 */
  email: string
  /** 비밀번호 */
  password: string
}

export interface CreateUserDto {
  /** 이메일 주소 */
  email: string
  /** 비밀번호 */
  password: string
  /** 이름 */
  name: string
}

export type UserResponseDto = object

export interface UpdateUserDto {
  /** 비밀번호 */
  password: string
  /** 이름 */
  name: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) => (input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input),
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(key, property instanceof Blob ? property : typeof property === 'object' && property !== null ? JSON.stringify(property) : `${property}`)
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Waiting API
 * @version 1.0
 * @contact
 *
 * Rest API for Waiting
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  waiting = {
    /**
     * @description Waiting 리스트 조회
     *
     * @tags waiting
     * @name ReadWaitings
     * @request GET:/waiting/{id}
     */
    readWaitings: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/waiting/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description Waiting 생성
     *
     * @tags waiting
     * @name CreateWaiting
     * @request POST:/waiting/{id}
     */
    createWaiting: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/waiting/${id}`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description Waiting 수정
     *
     * @tags waiting
     * @name UpdateWaiting
     * @request PUT:/waiting/{id}
     */
    updateWaiting: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/waiting/${id}`,
        method: 'PUT',
        ...params,
      }),

    /**
     * @description Waiting 삭제
     *
     * @tags waiting
     * @name DeleteWaiting
     * @request DELETE:/waiting/{id}
     */
    deleteWaiting: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/waiting/${id}`,
        method: 'DELETE',
        ...params,
      }),
  }
  auth = {
    /**
     * @description 이메일 인증코드 전송
     *
     * @tags auth
     * @name SendVerifyEmail
     * @request POST:/auth/email-verification/{email}
     */
    sendVerifyEmail: (email: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/email-verification/${email}`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description 이메일 인증코드 확인
     *
     * @tags auth
     * @name VerifyCode
     * @request GET:/auth/email-verification/{email}/{code}
     */
    verifyCode: (email: string, code: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/email-verification/${email}/${code}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 로그인
     *
     * @tags auth
     * @name Login
     * @request POST:/auth/login
     */
    login: (data: LoginDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  users = {
    /**
     * @description 회원가입
     *
     * @tags users
     * @name CreateUser
     * @request POST:/users
     */
    createUser: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserResponseDto, any>({
        path: `/users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 회원정보 수정
     *
     * @tags users
     * @name UpdateUser
     * @request PATCH:/users
     * @secure
     */
    updateUser: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 팀원 조회
     *
     * @tags users
     * @name GetTeammates
     * @request GET:/users/teammates/{team}
     * @secure
     */
    getTeammates: (team: 'G플레이스서비스개발' | 'A team' | 'B team', params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/teammates/${team}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 팀 가입
     *
     * @tags users
     * @name JoinTeam
     * @request POST:/users/teams/{team}
     * @secure
     */
    joinTeam: (team: 'G플레이스서비스개발' | 'A team' | 'B team', params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/teams/${team}`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description 팀 탈퇴
     *
     * @tags users
     * @name LeaveTeam
     * @request DELETE:/users/teams/{team}
     * @secure
     */
    leaveTeam: (team: 'G플레이스서비스개발' | 'A team' | 'B team', params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/teams/${team}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  }
  me = {
    /**
     * @description 내 정보 조회
     *
     * @tags me
     * @name GetMe
     * @request GET:/me
     * @secure
     */
    getMe: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/me`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  }
}