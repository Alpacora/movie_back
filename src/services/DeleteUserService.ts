import prismaClient from "../prisma"
import { handleDeleteUserFolderBucket } from '../middlewares/UploadImage';

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

      await handleDeleteUserFolderBucket(user_id, 'profile_image')

      return { message: 'User deleted successfully' };
    } else {
      return { message: 'User does not exist' };
    }
  }
}

export { DeleteUserService }
