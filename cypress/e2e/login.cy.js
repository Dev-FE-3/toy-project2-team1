describe('로그인 페이지 테스트', () => {
  beforeEach(() => {
    // 로그인 페이지 방문
    cy.visit('/login')
  })

  it('로그인 페이지가 올바르게 렌더링됨', () => {
    // 로고 확인
    cy.get('img[src="/public/images/logo.svg"]').should('be.visible')

    // 입력 필드 확인
    cy.get('input[type="text"][placeholder="이메일 주소"]').should('be.visible')
    cy.get('input[type="password"][placeholder="비밀번호"]').should('be.visible')

    // 로그인 버튼 확인
    cy.contains('로그인 하기').should('be.visible')
  })

  it('이메일과 비밀번호 입력 시 입력 필드에 값이 반영됨', () => {
    // 이메일 입력
    cy.get('input[type="text"][placeholder="이메일 주소"]')
      .type('admin@naver.com')
      .should('have.value', 'admin@naver.com')

    // 비밀번호 입력
    cy.get('input[type="password"][placeholder="비밀번호"]')
      .type('admin@naver.com')
      .should('have.value', 'admin@naver.com')
  })

  // it('잘못된 자격 증명으로 로그인 시 에러 메시지 표시', () => {
  //   // 잘못된 이메일/비밀번호 입력
  //   cy.get('input[type="text"][placeholder="이메일 주소"]').type('wrong@example.com')
  //   cy.get('input[type="password"][placeholder="비밀번호"]').type('wrongpassword')

  //   // 로그인 시도
  //   cy.contains('로그인 하기').click()

  //   // 에러 메시지 확인 (LoginError 컴포넌트가 표시됨)
  //   // 참고: LoginError 컴포넌트의 실제 텍스트나 요소에 맞게 수정 필요
  //   cy.get('form').contains('로그인에 실패했습니다').should('be.visible')
  // })

  //   it('올바른 자격 증명으로 로그인 시 홈페이지로 리다이렉트', () => {
  //     // 실제 로그인을 테스트하기 위해서는 Firebase 모의(mock) 필요
  //     // 이 예제에서는 Firebase 인증을 모의(mock)하는 방법을 보여줍니다

  //     // Firebase 인증 성공 모의
  //     cy.window().then((win) => {
  //       // SignIn 함수 및 fetchUserData 함수 모의
  //       cy.stub(win, 'SignIn').resolves(true)
  //       cy.stub(win, 'fetchUserData').resolves({
  //         uid: 'admin@naver.com',
  //         email: 'test@example.com',
  //         displayName: '테스트 유저',
  //       })
  //     })

  //     // 올바른 자격 증명 입력
  //     cy.get('input[type="text"][placeholder="이메일 주소"]').type('test@example.com')
  //     cy.get('input[type="password"][placeholder="비밀번호"]').type('correctpassword')

  //     // 로그인 시도
  //     cy.contains('로그인 하기').click()

  //     // 홈페이지로 리다이렉트 확인
  //     cy.url().should('eq', 'http://localhost:5173/')
  //   })
  // })

  describe('Firebase 실제 로그인 테스트', () => {
    it('실제 Firebase로 로그인', () => {
      cy.visit('/login')

      // 환경 변수 사용 및 정확한 선택자 적용
      cy.get('input[type="text"][placeholder="이메일 주소"]').type(Cypress.env('TEST_EMAIL'))
      cy.get('input[type="password"][placeholder="비밀번호"]').type(Cypress.env('TEST_PASSWORD'))

      cy.contains('로그인 하기').click()

      // 로그인 성공 확인
      cy.url().should('eq', 'http://localhost:5173/')
    })
  })
})
