import fakerBr from 'faker-br'

interface User {
  fristName: string
  lasName: string
  zipCode: string
}

/**
 *@function Gera um usúario para realizar os testes de input'.
 * @return {User} um objeto do tipo User que contém primeiro nome, sobrenome e zipCode.
 */
export function userGenerator(): User {
  const user: User = {
    fristName: fakerBr.name.firstName(),
    lasName: fakerBr.name.lastName(),
    zipCode: fakerBr.address.zipCode(),
  }

  return user
}
