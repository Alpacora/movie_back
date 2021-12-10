import prismaClient from '../prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { uploadImage } from '../middlewares/UploadImage';

import EmailTemplate from '../EmailTemplates/ValidateEmail';

import handleSendEmail from './NodeMailerService';
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
          verified_email: false
        }
      });
    } else {
      return { message: 'User with already exists' };
    }

    handleSendEmail({
      from: 'falamais@falaagro.com',
      to: user.email,
      subject: 'Confimação de Email - Movie Party',
      text: 'Olá! esse é um email de teste',
      html: EmailTemplate({
        link: `https://falaagro.com/validade-email/?${user.id}`,
        username: 'Kaê Benning',
        email: 'kaeteixeiraleal@gmail.com'
      })
    });

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

    if (!user.verified_email) {
      return { message: 'Email not verified, please enter your email.' };
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

  async executeValidadeEmail(id: string) {
    await prismaClient.user.update({
      where: {
        id: id
      },
      data: {
        verified_email: true
      }
    });

    return { message: 'Email successfully verified' };
  }

  async executeSendValidadeEmail(id: string) {

    handleSendEmail({
      from: 'falamais@falaagro.com',
      to: 'kaeteixeiraleal@gmail.com',
      subject: 'Confimação de Email - Movie Party',
      text: 'Olá! esse é um email de teste',
      html: EmailTemplate({
        link: `https://falaagro.com/validade-email/?${id}`,
        username: 'Kaê Benning',
        email: 'kaeteixeiraleal@gmail.com'
      })
    });

    return { message: 'Email successfully sent' };
  }
}

export { AuthenticateUserService }
