export enum UserType {
  ADMIN = 'ADMIN',
  GENERAL = 'GENERAL',
}

export enum UserGroup {
  NOT_BELONG = 'NOT_BELONG',
  NAVER = 'NAVER',
  HYUNDAI_DPTSTR = 'HYUNDAI_DPTSTR',
}

export enum UserTeam {
  NAVER_DEV = 'NAVER_DEV',
  HYUNDAI_DPTSTR_MARKETING = 'HYUNDAI_DPTSTR_MARKETING',
  HYUNDAI_DPTSTR_BUSINESS = 'HYUNDAI_DPTSTR_BUSINESS',
}

export enum UserRole {
  REPORTER = 'REPORTER',
  RECIPIENTS = 'RECIPIENTS',
}

export const GroupTeamMap = {
  [UserGroup.NOT_BELONG]: [],
  [UserGroup.NAVER]: [UserTeam.NAVER_DEV],
  [UserGroup.HYUNDAI_DPTSTR]: [UserTeam.HYUNDAI_DPTSTR_MARKETING, UserTeam.HYUNDAI_DPTSTR_BUSINESS],
}

export const EMAIL_GROUP_MAP = {
  'navercorp.com': UserGroup.NAVER,
}
