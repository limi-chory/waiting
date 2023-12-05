export const VERIFICATION_EMAIL_SUBJECT = '[Waiting] 계정 이메일 인증'
export const VERIFICATION_EMAIL_HTML = (code: string) =>
  `<h3>[Waiting] 계정 이메일 인증 보안코드 입니다.</h3><br/>아래의 보안코드를 입력해주세요.<br/><br/>보안코드: ${code}`
