export const id = () => {
  const gen8 = () =>
    Math.floor((1 + Math.random()) * 0x100000000)
      .toString(16)
      .substring(1);
  return gen8() + '_' + gen8();
};
