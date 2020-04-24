export const inputsValidation = (
  element,
  regex,
  errorMessage,
  okMessage,
  emptyValue = 'something'
) => {
  const elementDOM = document.getElementById(element);
  const elementValue = elementDOM.value;
  const reElement = new RegExp(regex);
  if (reElement.test(elementValue) && elementValue !== '') {
    elementDOM.nextElementSibling.style.border = '2px solid green';
    if (document.getElementById(element + 'helper-text') == null) {
      const helper = document.createElement('p');
      const helperText = document.createTextNode(okMessage);
      helper.id = element + 'helper-text';
      helper.style.marginTop = '0';
      helper.style.color = 'green';
      helper.append(helperText);
      elementDOM.parentElement.parentElement.parentElement.style.display =
        'flex';
      elementDOM.parentElement.parentElement.parentElement.style.flexDirection =
        'column';
      elementDOM.parentElement.parentElement.parentElement.style.alignItems =
        'center';
      elementDOM.parentElement.parentElement.parentElement.append(helper);
    } else {
      document.getElementById(element + 'helper-text').style.color = 'green';
      document.getElementById(element + 'helper-text').innerHTML = okMessage;
    }
    return elementValue;
  } else {
    if (elementValue == '')
      errorMessage = 'You have to type ' + emptyValue + '!';
    elementDOM.nextElementSibling.style.border = '2px solid red';
    if (document.getElementById(element + 'helper-text') == null) {
      const helper = document.createElement('p');
      const helperText = document.createTextNode(errorMessage);
      helper.id = element + 'helper-text';
      helper.style.marginTop = '0';
      helper.style.color = 'red';
      helper.append(helperText);
      elementDOM.parentElement.parentElement.parentElement.style.display =
        'flex';
      elementDOM.parentElement.parentElement.parentElement.style.flexDirection =
        'column';
      elementDOM.parentElement.parentElement.parentElement.style.alignItems =
        'center';
      elementDOM.parentElement.parentElement.parentElement.append(helper);
    } else {
      document.getElementById(element + 'helper-text').style.color = 'red';
      document.getElementById(element + 'helper-text').innerHTML = errorMessage;
    }
    return false;
  }
};
