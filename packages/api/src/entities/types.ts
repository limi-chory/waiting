export enum UserType {
  ADMIN = 'ADMIN',
  GENERAL = 'GENERAL',
}

export enum UserGroup {
  NOT_BELONG = 'NOT_BELONG',
  NAVER = 'NAVER',
}

export const EMAIL_GROUP_MAP = {
  'navercorp.com': UserGroup.NAVER,
}
