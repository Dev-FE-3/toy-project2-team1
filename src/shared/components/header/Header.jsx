import * as S from './HeaderStyled'

export default function Header({ userName }) {
  return (
    <S.Header>
      <S.Wrapper>
        <S.Logo to="/" />
        <S.Greeting>
          안녕하세요, <S.UserName>{userName}</S.UserName>님
          <S.GreetingIcon src="/public/images/icon-smile.svg" />
        </S.Greeting>
      </S.Wrapper>
    </S.Header>
  )
}
