interface IValidadeEmail {
  link: string,
  username?: string,
  email?: string
}

export default function template({ link, username, email }: IValidadeEmail) {
  return `<!DOCTYPE html>
  <html lang="pt-Br">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de email</title>
  </head>
  
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: gainsboro;
    }
  
    h1 {
      color: black;
      text-align: center;
    }
  
    p {
      font-family: verdana;
      font-size: 20px;
    }
  
    .verifyButton {
      height: 60px;
      width: 320px;
      border-radius: 30px;
      border-style: solid;
      border-width: 3px;
      border-color: royalblue;
      box-shadow: 10px 5px 10px rgba(112, 112, 112, 0.719);
      display: flex;
      align-items: center;
      justify-content: center;
      transition:  0.3s;
      
    }
    .verifyButton:hover{
      border-color: blueviolet;
      transform: scale(1.1, 1.1);
    }
  
  </style>
  </head>
  
  <body>
  
    <h1>Verfique seu email para terminar o cadastro</h1>
    <p>Obrigado por se inscrever ${username}.</p>
  
    <p>Por favor confirme que ${email} é seu endereço de email clicando no botão abaixo ou use esse link ao lado ${link}</p>
    <a href="${link}">
      <div class="verifyButton">
        Verificar meu email
      </div>
    </a>
  
  </body>
  
  </html>`
} 
