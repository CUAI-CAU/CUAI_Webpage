/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

export {}

Cypress.Commands.add('verifyMember', () => {
    cy.fixture('member').then(({ name, email }) => {
        // step 1: 학회원 인증 입력
        cy.get('input[placeholder="이름을 입력해주세요."]').type(name)
        cy.get('input[placeholder="이메일을 입력해주세요."]').type(email)
        // step 2: 인증 버튼 클릭
        cy.contains('확인하기').click()
    })
})

declare global {
    namespace Cypress {
        interface Chainable {
            verifyMember(): Chainable<void>
        }
    }
}
