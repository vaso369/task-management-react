export const email = {
  inputId: 'tbEmail',
  regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
  errorMsg: 'You have to enter email in regular format!',
  okMsg: 'Email accepted!',
  emptyValue: 'email',
};
export const message = {
  inputId: 'tbMessage',
  regex: /^.{1,255}$/,
  errorMsg: 'Maximum characters number is 250!',
  okMsg: 'Message accepted!',
  emptyValue: 'message',
};
