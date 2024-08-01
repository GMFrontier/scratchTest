import { isValidPhoneNumber } from "libphonenumber-js";

export function stringToBoolean(s?: string): boolean {
  return s?.toLowerCase() === 'true';
}

export function obfuscatePhone(s?: string): string {
  if (!s) return ""
  if (s.length <= 6) {
    return s;
  }
  return s.slice(0, 2) + "****" + s.slice(-3);
}


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

export const doesPasswordsMatch = (password: string, matchingPassword: string) => {
  return password.length > 0 && password === matchingPassword
};


export const formatTime = (seconds: any) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
};

function upperCaseFirstLetter(inputString: string): string {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export function truncateCustomDate(date: string): string {
  const dateArray = date.split(' ')
  const month = upperCaseFirstLetter(dateArray[0]);
  const year = dateArray[dateArray.length - 1]

  const shortenedMonth =
    month.length > 3 ? month.slice(0, 3) + '.' : month;

  return `${shortenedMonth} ${year}`;
};

export function maskEmail(email: string): string {
  return email.replace(/([^@]+)@(.*)/, (match, localPart, domain) => {
    if (localPart.length <= 3) {
      return '*'.repeat(localPart.length) + '@' + domain;
    } else {
      const numAsterisks = Math.min(localPart.length - 3, 3);
      return '*'.repeat(numAsterisks) + localPart.slice(-3) + '@' + domain;
    }
  });
}