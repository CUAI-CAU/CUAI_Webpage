describe('라우팅 테스트', () => {
    it('홈 페이지로 이동', () => {
        cy.visit('/')
        cy.contains('중앙대학교').should('exist')
    })

    it('프로젝트 페이지로 이동', () => {
        cy.visit('/projects')
        cy.contains('프로젝트').should('exist')
    })

    it('수상 내역 페이지로 이동', () => {
        cy.visit('/awards')
        cy.contains('수상 내역').should('exist')
    })

    it('학회원 페이지로 이동', () => {
        cy.visit('/members')
        cy.contains('학회원').should('exist')
    })

    it('과제 제출 페이지로 이동', () => {
        cy.visit('/quiz')
        cy.contains('과제 제출').should('exist')
    })

    it('FAQ 페이지로 이동', () => {
        cy.visit('/faq')
        cy.contains('FAQ').should('exist')
    })

    it('존재하지 않는 경로는 404 페이지로 가야 함', () => {
        cy.visit('/404page', { failOnStatusCode: false })
        cy.contains('404').should('exist')
    })
})
