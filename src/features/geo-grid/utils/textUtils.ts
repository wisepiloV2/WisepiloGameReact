export const normalizeAnswer = (answer: string): string => {
  if (!answer) return "";
  
  return answer
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
};

export const capitalizeString = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}