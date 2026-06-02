import { describe, it, expect } from 'vitest';
import {
  checkPasswordStrength,
  checkPasswordLower,
  checkPasswordNumber,
  checkPasswordSpecial,
  checkPasswordUpper,
} from './check-password';

describe('checkPasswordStrength', () => {
  it('should return 4 for a strong password', () => {
    expect(checkPasswordStrength('Password123!')).toBe(4);
  });

  it('should return false if missing a number', () => {
    expect(checkPasswordStrength('Password!@#')).toBe(3);
    expect(checkPasswordNumber('Password!@#')).toBe(false);
  });

  it('should return false if missing an uppercase letter', () => {
    expect(checkPasswordStrength('password123!')).toBe(3);
    expect(checkPasswordUpper('password123!')).toBe(false);
  });

  it('should return false if missing a lowercase letter', () => {
    expect(checkPasswordStrength('PASSWORD123!')).toBe(3);
    expect(checkPasswordLower('PASSWORD123!')).toBe(false);
  });

  it('should return false if missing a special character', () => {
    expect(checkPasswordStrength('Password123')).toBe(3);
    expect(checkPasswordSpecial('Password123')).toBe(false);
  });
});
