const checkPassword = (test: (char: string) => boolean, password: string) => {
  for (const char of password) {
    if (test(char)) {
      return true;
    }
  }

  return false;
};

const hasNumber = (char: string) => {
  if (char >= '0' && char <= '9') return true;
  return false;
};

const hasUpper = (char: string) => {
  if (char >= 'A' && char <= 'Z') return true;
  return false;
};

const hasLower = (char: string) => {
  if (char >= 'a' && char <= 'z') return true;
  return false;
};

const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
const hasSpecial = (char: string) => {
  if (specialChars.includes(char)) return true;
  return false;
};

export const checkPasswordNumber = (password: string) => checkPassword(hasNumber, password);
export const checkPasswordUpper = (password: string) => checkPassword(hasUpper, password);
export const checkPasswordLower = (password: string) => checkPassword(hasLower, password);
export const checkPasswordSpecial = (password: string) => checkPassword(hasSpecial, password);

export const checkPasswordStrength = (password: string) => {
  let strength = 0;

  if (checkPasswordNumber(password)) strength++;
  if (checkPasswordUpper(password)) strength++;
  if (checkPasswordLower(password)) strength++;
  if (checkPasswordSpecial(password)) strength++;

  return strength;
};
