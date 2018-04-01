import { AppError } from "../../shared/models/app-error";

export class PaymentProcessorError extends AppError { }

export class CreditCardInvalidError extends AppError { }

export class CreditCardDeclinedError extends AppError { }
