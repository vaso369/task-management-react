export const fName = {
  inputId: 'tbFirstName',
  regex: '[A-Z][a-z]{2,13}',
  errorMsg: 'You have to enter first name in regular format',
  okMsg: 'First name accepted',
  emptyValue: 'first name',
};
export const lName = {
  inputId: 'tbLastName',
  regex: '^[A-Z][a-z]{2,13}',
  errorMsg: 'You have to enter last name in regular format',
  okMsg: 'Last name accepted',
  emptyValue: 'last name',
};
export const userName = {
  inputId: 'tbUserName',
  regex: '[A-Z][a-z]{2,13}',
  errorMsg: 'You have to enter username in regular format',
  okMsg: 'Username accepted',
  emptyValue: 'username',
};
export const email = {
  inputId: 'tbEmail',
  regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
  errorMsg: 'You have to enter email in regular format',
  okMsg: 'Email accepted',
  emptyValue: 'email',
};
export const pass = {
  inputId: 'tbPass',
  regex: '[A-Z][a-z]{2,13}',
  errorMsg: 'You have to enter password in regular format',
  okMsg: 'Password accepted',
  emptyValue: 'password',
};
