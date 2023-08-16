import * as bcrypt from 'bcrypt';
const saltRounds = 12;

/**
 * Hash a password
 * @param {string} plainTextPassword - Password to be hashed
 * @returns {Promise<string>} - Hashed password
 * @author Ahimsya Firzi
 */
export async function hashPassword(plainTextPassword: string): Promise<string> {
  return await bcrypt.hash(plainTextPassword, saltRounds);
}

/**
 * Compare a plain text password with a hash
 * @param plainTextPassword - Password to be hashed
 * @param hash - Hashed password
 * @returns {Promise<boolean>} - True if password is correct, false otherwise
 * @author Ahimsya Firzi
 */
export async function comparePassword(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  // console.log({ plainTextPassword });
  // console.log({ hash });
  // console.log(await bcrypt.compare(plainTextPassword, hash));
  return await bcrypt.compare(plainTextPassword, hash);
}
