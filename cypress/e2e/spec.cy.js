describe('내 프로젝트 테스트', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('홈페이지가 정상적으로 로드됨', () => {
    cy.get('h1').should('be.visible')
    cy.contains('환영합니다').should('exist')
  })

  it('로그인 기능이 정상 작동함', () => {
    cy.contains('로그인').click()

    cy.get('input[name="username"]').type('테스트유저')
    cy.get('input[name="password"]').type('password123')

    cy.get('button[type="submit"]').click()

    cy.contains('환영합니다, 테스트유저님').should('be.visible')
    cy.url().should('include', '/dashboard')
  })

  it('폼 제출이 정상 작동함', () => {
    cy.contains('새 글 작성').click()

    cy.get('input[name="title"]').type('테스트 제목')
    cy.get('textarea[name="content"]').type('테스트 내용입니다.')
    cy.get('select[name="category"]').select('일반')

    cy.contains('저장').click()

    cy.contains('글이 성공적으로 저장되었습니다.').should('be.visible')
    cy.contains('테스트 제목').should('exist')
  })
})
