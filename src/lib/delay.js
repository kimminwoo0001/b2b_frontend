export const delay = (time = 500, value) =>
  new Promise((resolve, reejct) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });
