

export const emailCheck = (email) => {
  const EMAIL_SCHEMA = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
  return EMAIL_SCHEMA.test(email);
};
export const passwordCheck = (password) => {
  const PASSWORD_SCHEMA = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
  return PASSWORD_SCHEMA.test(password);
};
export const confirmCheck = (password, confirm) => (password !== '' && confirm !== '') && (password === confirm);
