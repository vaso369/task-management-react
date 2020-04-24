export const removeBorderColorOnEmpty = (...args) => {
  for (let element of args) {
    if (
      document.getElementById(element).value == '' ||
      (document.getElementById(element).value !== '' && args.length > 1)
    ) {
      const elementDOM = document.getElementById(element);
      elementDOM.nextElementSibling.style.border =
        '1px solid rgba(0, 0, 0, 0.23)';
      if (document.getElementById(element + 'helper-text') !== null)
        document.getElementById(element + 'helper-text').innerHTML = '';
    }
  }
};
