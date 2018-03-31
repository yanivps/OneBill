import { AppError } from "./shared/models/app-error";

export class InvitationAlreadyUsedError extends AppError { }

export class InvitationTokenInvalidError extends AppError { }

export class InvitationExpiredError extends AppError { }
