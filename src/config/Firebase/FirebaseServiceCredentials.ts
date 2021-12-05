const access = {
  type: "service_account",
  project_id: "movieparty-a1227",
  private_key_id: "92fb4cab01c92dc7914d071ef56d503d86323b05",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: "firebase-adminsdk-wv0l9@movieparty-a1227.iam.gserviceaccount.com",
  client_id: "116713257670838770379",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wv0l9%40movieparty-a1227.iam.gserviceaccount.com",
}

export default access;
