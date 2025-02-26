import * as S from './HeaderStyled'

export default function Header({ userName }) {
  return (
    <S.Header>
      <S.Wrapper>
        <S.Logo />
        <S.Greeting>
          안녕하세요, <S.UserName>{userName}</S.UserName>님
          <S.GreetingIcon />
        </S.Greeting>
      </S.Wrapper>
    </S.Header>
  )
}
