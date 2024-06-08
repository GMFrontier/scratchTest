import { isValidPhoneNumber } from "libphonenumber-js";

export function divideListByChunks<T>(inputArray: T[], chunkSize: number): T[][] {
  const tempArray: T[][] = [];

  for (let index = 0; index < inputArray.length; index += chunkSize) {
    const myChunk: T[] = inputArray.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
}


export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Función para validar el número de teléfono
export function validatePhoneNumber(phoneNumber: string, countryCode: any): boolean {
  try {
    return isValidPhoneNumber(phoneNumber, countryCode);
  } catch (error) {
    return false;
  }
};

// Función para validar el número de teléfono
export function isValidPhoneCheck(phone: string, selectedOption: string): boolean {
  try {
    const countryArray = selectedOption.split('*')
    console.log(countryArray)
    console.log(phone)
    console.log(countryArray[countryArray.length - 1])
    console.log(validatePhoneNumber(phone, countryArray[countryArray.length - 1]))
    return validatePhoneNumber(phone, countryArray[countryArray.length - 1]);
  } catch (error) {
    return false;
  }
};
interface Number {
  toMoneyFormat(): string;
}

export const toMoneyFormat = (number: number) => {
  if (number > 0) return "$" + number.toFixed(2);
  else return "- $" + Math.abs(number).toFixed(2);
};

export const isUserPasswordValid = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(
    password,
  );
};