describe('학회원 인증 및 과제 제출 테스트', () => {
    beforeEach(() => {
        cy.visit('/quiz')
    })

    it('학회원이 인증되면 과제 질문을 보인다.', () => {
        cy.verifyMember()
        cy.contains('Quiz Questions').should('be.visible')
    })

    it('잘못된 정보로 학회원 인증을 시도하면 실패 alert가 뜬다.', () => {
        cy.get('input[placeholder="이름을 입력해주세요."]').type('존재하지않는사람')
        cy.get('input[placeholder="이메일을 입력해주세요."]').type('invalid@example.com')

        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert')
        })

        cy.contains('확인하기').click()
        cy.get('@alert').should('have.been.calledWith', '회원 인증에 실패했습니다. 정보를 다시 확인해 주세요.')
    })

    it('과제 질문에 전부 답하고 제출하면 정답을 보인다.', () => {
        cy.verifyMember()
        cy.contains('Quiz Questions').should('be.visible')

        cy.get('textarea').each(($textarea, index) => {
            cy.wrap($textarea).type(`답변 ${index + 1}`)
        })

        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert')
        })

        cy.contains('과제 제출하기').click()
        cy.get('@alert').should('have.been.calledWith', '제출 성공! 정답을 확인하세요.')
    })

    it('모든 과제 질문이 응답되지 않으면 alert를 보인다.', () => {
        cy.verifyMember()
        cy.contains('Quiz Questions').should('be.visible')

        cy.get('textarea').first().type('부분 답변')

        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert')
        })

        cy.contains('과제 제출하기').click()
        cy.get('@alert').should('have.been.calledWith', '모든 질문에 답변을 작성해주세요.')
    })
})
