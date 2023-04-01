// practical implementation of RFC 2822
export const emailRegEx =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// Alphanumeric 5 - 32 characters, no __ or _. or ._ or .. inside, no _ or . at the beginning or the end
export const usernameRegEx =
  /^(?=[a-zA-Z0-9._]{5,32}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

// 8 - 32 characters, at least one letter, one number and one special character
export const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const enum UNIVERSITY_CARD_TYPE_ENUM {
  vertical = "vertical",
  horizontal = "horizontal",
}

export const COORDINATES_ROMANIA_CENTER: [number, number] = [
  46.017579, 24.872295,
];
