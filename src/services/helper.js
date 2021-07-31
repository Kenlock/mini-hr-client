export const createParamsString = (params) => {
  let url = '';
  for (const param in params) {
    if (params[param] === 0 || params[param]) {
      url += `&${param}=${params[param]}`;
    }
  }
  return '?' + url.substring(1, url.length);
};
