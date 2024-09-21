import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRoundsString = process.env.SALT_ROUNDS;
if (!saltRoundsString) {
  throw new Error(
    "The salt rounds were not found in the environment variables"
  );
}
const saltRounds = parseInt(saltRoundsString, 10);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const getFileNameWithoutExtension = (
  fileNameWithExtension: string
): string => {
  const lastIndex = fileNameWithExtension.lastIndexOf(".");
  if (lastIndex !== -1) {
    return fileNameWithExtension.substring(0, lastIndex);
  }
  return `${fileNameWithExtension}-${Math.random() * 10}`;
};

export const cleanObject = (
  obj: Record<string, any>,
  keysToCheck: string[]
) => {
  const propertiesToEdit: Record<string, any> = {};
  keysToCheck.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
        delete obj[key];
      } else {
        propertiesToEdit[key] = obj[key];
      }
    }
  });

  return propertiesToEdit;
};

export const isNumber = (str: string) => {
  const regex = /^-?\d+(\.\d+)?$/;

  return regex.test(str);
};

export const formatDate = () => {
  const now: Date = new Date();
  const pad = (num: number): string => num.toString().padStart(2, "0");

  const year: number = now.getFullYear();
  const month: string = pad(now.getMonth() + 1);
  const day: string = pad(now.getDate());

  const hours: string = pad(now.getHours());
  const minutes: string = pad(now.getMinutes());
  const seconds: string = pad(now.getSeconds());
  const milliseconds: string = now
    .getMilliseconds()
    .toString()
    .padStart(3, "0");

  const timezoneOffset: number = -now.getTimezoneOffset();
  const sign: string = timezoneOffset >= 0 ? "+" : "-";
  const offsetHours: string = pad(Math.floor(Math.abs(timezoneOffset) / 60));
  const offsetMinutes: string = pad(Math.abs(timezoneOffset) % 60);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}${offsetMinutes}`;
};
