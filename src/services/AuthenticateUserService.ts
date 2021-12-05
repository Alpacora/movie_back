import prismaClient from '../prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IUserBody {
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  username: string,
}

interface IFileBody {
  firebaseurl: string,
}

class AuthenticateUserService {

  async executeSignUp(file: IFileBody, body: IUserBody) {
    const { email, password, firstname, lastname, username } = body;
    const { firebaseurl } = file;

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
          profile_img: firebaseurl,
        }
      });
    } else {
      return { message: 'User with already exists' };
    }
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
