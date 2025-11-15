import fakerBr from 'faker-br'

interface User {
  fristName: string
  lasName: string
  zipCode: string
}

export function userGenerator(): User {
  const user: User = {
    fristName: fakerBr.name.firstName(),
    lasName: fakerBr.name.lastName(),
    zipCode: fakerBr.address.zipCode(),
  }

  return user
}
