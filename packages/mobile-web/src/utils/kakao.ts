export const kakaoInit = () => {
  const kakao = (window as any).Kakao

  if (!kakao.isInitialized()) {
    kakao.init('7679f1ff49fa2a90a2371b50a2fdc523')
  }

  return kakao
}
