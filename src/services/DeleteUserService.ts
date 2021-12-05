import prismaClient from "../prisma"

class DeleteUserService {
  async execute(user_id: string) {
    let user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    })

    if (user) {
      user = await prismaClient.user.delete({
        where: {
          id: user_id
        }
      })
      return { message: 'User deleted successfully' };
    } else {
      return { message: 'User does not exist' };
    }
  }
}

export { DeleteUserService }