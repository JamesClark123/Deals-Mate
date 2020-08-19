export const clientErrors = {
  EMAIL_ALREADY_REGISTERED: "EMAIL_ALREADY_REGISTERED",
  NO_EMAIL_PASSWORD: "NO_EMAIL_PASSWORD",
  EMAIL_NOT_REGISTERED: "EMAIL_NOT_REGISTERED",
  EMAIL_NOT_CONFIRMED: "EMAIL_NOT_CONFIRMED",
  WRONG_EMAIL_OR_PASSWORD: "WRONG_EMAIL_OR_PASSWORD",
  ITEM_ALREADY_IN_LIST: "ITEM_ALREADY_IN_LIST",
  INVALID_AUTH_TOKEN: "INVALID_AUTH_TOKEN",
  MAX_ITEMS_REACHED: "MAX_ITEMS_REACHED",
  NOT_FOUND_404: "NOT_FOUND_404",
};

export const serverErrors = {
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  PRICE_SCRAPPING_ERROR: "PRICE_SCRAPPING_ERROR",
  LIST_CREATION_ERROR: "LIST_CREATION_ERROR",
  DELETE_ACCOUNT_ERROR: "DELETE_ACCOUNT_ERROR",
  AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
  DEMO_ACCOUNT_CREATION_ERROR: "DEMO_ACCOUNT_CREATION_ERROR",
};

export const statusCodes = {
  [clientErrors.EMAIL_ALREADY_REGISTERED]: 403,
  [clientErrors.NO_EMAIL_PASSWORD]: 400,
  [clientErrors.EMAIL_NOT_REGISTERED]: 400,
  [clientErrors.EMAIL_NOT_CONFIRMED]: 400,
  [clientErrors.WRONG_EMAIL_OR_PASSWORD]: 401,
  [clientErrors.ITEM_ALREADY_IN_LIST]: 400,
  [clientErrors.INVALID_AUTH_TOKEN]: 400,
  [clientErrors.MAX_ITEMS_REACHED]: 406,
  [clientErrors.NOT_FOUND_404]: 404,

  [serverErrors.PRICE_SCRAPPING_ERROR]: 500,
  [serverErrors.UNKNOWN_ERROR]: 500,
  [serverErrors.LIST_CREATION_ERROR]: 500,
  [serverErrors.DELETE_ACCOUNT_ERROR]: 500,
  [serverErrors.AUTHORIZATION_ERROR]: 500,
  [serverErrors.DEMO_ACCOUNT_CREATION_ERROR]: 500,
};

export const errorMessages = {
  [clientErrors.EMAIL_ALREADY_REGISTERED]:
    "Email is already registered, please provide a new one.",
  [clientErrors.NO_EMAIL_PASSWORD]:
    "Please include both an email and password.",
  [clientErrors.EMAIL_NOT_REGISTERED]:
    "This email isn't linked to an account, please create an account first.",
  [clientErrors.EMAIL_NOT_CONFIRMED]:
    "This email hasn't been confirmed yet, please check your spam folder for the email we've sent.",
  [clientErrors.WRONG_EMAIL_OR_PASSWORD]:
    "Either the email or password is incorrect, please try again.",
  [clientErrors.ITEM_ALREADY_IN_LIST]:
    "This item already exists in one of your lists.",
  [clientErrors.INVALID_AUTH_TOKEN]:
    "Session has timed out, please sign in again.",
  [clientErrors.MAX_ITEMS_REACHED]:
    "Max number of items have already been added to this account!",
  [clientErrors.NOT_FOUND_404]: "Oops! Looks like that pages doesn't exist.",

  [serverErrors.PRICE_SCRAPPING_ERROR]:
    "Oops! Looks like we're having trouble finding this item. Please make sure the url is correct!",
  [serverErrors.UNKNOWN_ERROR]:
    "Oops! Looks like we're having some problems, please try again later.",
  [serverErrors.LIST_CREATION_ERROR]:
    "Oops! Looks like we can't create that list right now.",
  [serverErrors.DELETE_ACCOUNT_ERROR]:
    "Oops! Please try to delete your account later.",
  [serverErrors.AUTHORIZATION_ERROR]:
    "Oops! Looks like we're having some problems, please try signing in again later.",
  [serverErrors.DEMO_ACCOUNT_CREATION_ERROR]:
    "Oops! Looks like we can't create any demo accounts right now, please try again later.",
};

export function getErrorString(err) {
  if (err in clientErrors || err in serverErrors) {
    return errorMessages[err];
  }
  return errorMessages[serverErrors.UNKNOWN_ERROR];
}
