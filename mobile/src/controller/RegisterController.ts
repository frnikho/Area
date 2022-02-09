import app from '../axios_config';

export default class RegisterController {
  public nativeRegister(
    email: string | undefined,
    password: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    callback: (status: boolean, response: any) => void,
  ): void {
    if (
      firstName === undefined ||
      lastName === undefined ||
      email === undefined ||
      password === undefined
    ) {
      callback(false, "Form missing");
    }

    app
      .post(`/auth/register`, {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
      })
      .then((response: any) => {
        if (response.status === 200) {
          callback(true, response);
        }
      })
      .catch((err: any) => {
        callback(false, err);
      });
  }
}
