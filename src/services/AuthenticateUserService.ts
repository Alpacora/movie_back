import prismaClient from '../prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { uploadImage } from '../middlewares/uploadImage';

interface IUserBody {
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  username: string,
}

class AuthenticateUserService {

  async executeSignUp(file, body: IUserBody) {
    const { email, password, firstname, lastname, username } = body;

    if (!file) {
      return { message: 'Error identifying profile image' }
    }

    let user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          email: email,
          password: bcrypt.hashSync(password, 8),
          first_name: firstname,
          last_name: lastname,
          user_name: username,
          profile_img: '',
        }
      });
    } else {
      return { message: 'User with already exists' };
    }

    const imageUrl = await uploadImage(user.id, file, 'profile_image');

    user = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        profile_img: imageUrl as unknown as string,
      }
    })

    return user;
  }

  async executeSignIn(email: string, password: string) {
    let user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      return { message: 'User does not exist, check email and password' };
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return { message: 'Incorrect password, check your credentials' };
    }

    const { id, user_name, profile_img } = user;

    const token = sign({
      user: {
        id: id,
        username: user_name,
        profileimg: profile_img
      }
    },
      process.env.JWT_SECRET,
      {
        subject: id,
        expiresIn: '1d'
      })

    return { user, token };
  }
}

export { AuthenticateUserService }
