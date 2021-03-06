import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handleSignUp(request: Request, response: Response) {
    const service = new AuthenticateUserService();
    try {
      const result = await service.executeSignUp(request.file, JSON.parse(request.body.body));
      return response.json(result);
    } catch (error) {
      return response.json({ 'Error': error.message })
    }
  }

  async handleSignIn(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const service = new AuthenticateUserService();

      const result = await service.executeSignIn(email, password);

      return response.json(result);
    } catch (error) {
      return response.json({ 'Error': error.message })
    }
  }

  async handleValidadeEmail(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const service = new AuthenticateUserService();

      const result = await service.executeValidadeEmail(id);
      response.json(result);
    } catch (error) {
      return response.json({ 'Error': error.message })
    }
  }

  async handleSendValidateEmail(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const service = new AuthenticateUserService();

      const result = await service.executeSendValidadeEmail(id);
      response.json(result);
    } catch (error) {
      return response.json({ 'Error': error.message })
    }
  }
}

export { AuthenticateUserController }
