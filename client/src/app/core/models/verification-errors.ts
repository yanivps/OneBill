import { AppError } from "../../shared/models/app-error";

export class VerificationIncorrectPhoneNumberError extends AppError { }

export class IncorrectVerificationCodeError extends AppError { }

