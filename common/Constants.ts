export const MIN_CHARS_USERNAME = 3;
export const MAX_CHARS_USERNAME = 32;
export const MIN_CHARS_PASSWORD = 6;

export const MIN_CHARS_COMMENT = 100;

// practical implementation of RFC 2822
export const emailRegEx =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// Alphanumeric 3 - 32 characters, no __ or _. or ._ or .. inside, no _ or . at the beginning or the end
export const usernameRegEx =
  /^(?=[a-zA-Z0-9._]{3,32}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

// min 6 characters, at least one letter, one number and one special character
export const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

export const enum EMAIL_TYPE_ENUM {
  accountCreated = "accountCreated",
  requestResetPassword = "requestResetPassword",
  resetPassword = "resetPassword",
}

export const enum UNIVERSITY_CARD_TYPE_ENUM {
  vertical = "vertical",
  horizontal = "horizontal",
}

export const COORDINATES_ROMANIA_CENTER: [number, number] = [
  46.017579, 24.872295,
];

export const enum ORDER_BY_ENUM {
  overallRating = "overallRating",
  createdAt = "createdAt",
}

export const enum ORDER_ENUM {
  asc = "asc",
  desc = "desc",
}

export const enum Role {
  user = "user",
  admin = "admin",
}

export const REVIEW_PER_PAGE_LIMIT = 5;
