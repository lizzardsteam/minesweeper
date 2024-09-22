import PasswordHasher from "../utils/PasswordHasher"

test("Testing password hasher", () => {
    let password = "1234"
    let wrongPassword = "4321"
    let hash = PasswordHasher.hashPassword(password)
    expect(PasswordHasher.validatePassword(password, hash)).toBe(true)
    expect(PasswordHasher.validatePassword(wrongPassword, hash)).toBe(false)
})
