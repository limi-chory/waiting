export enum UserType {
  ADMIN = 'ADMIN',
  GENERAL = 'GENERAL',
}

export enum UserGroup {
  NOT_BELONG = 'NOT_BELONG',
  NAVER = '네이버',
  HYUNDAI_DPTSTR = '현대백화점',
}

export enum UserTeam {
  G_PLACE_SERVICE_DEV = 'G플레이스서비스개발',
  A = 'A team',
  B = 'B team',
}

export enum UserRole {
  REPORTER = 'REPORTER',
  RECIPIENTS = 'RECIPIENTS',
}

export const GroupTeamMap = {
  [UserGroup.NOT_BELONG]: [],
  [UserGroup.NAVER]: [UserTeam.G_PLACE_SERVICE_DEV],
  [UserGroup.HYUNDAI_DPTSTR]: [UserTeam.A, UserTeam.B],
}

export const EMAIL_GROUP_MAP = {
  'navercorp.com': UserGroup.NAVER,
}
