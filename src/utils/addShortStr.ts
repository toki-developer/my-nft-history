export const addShortStr = (address: string, num = 7) => {
  const regex = new RegExp(`(.{${num}}).*(.{${num}})`, "g");
  return address.replace(regex, "$1...$2");
};
