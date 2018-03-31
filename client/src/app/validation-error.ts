import { AppError } from "./shared/models/app-error";

export class ValidationError extends AppError {
  validations: {}
  constructor(originalError: any) {
    super(originalError);
    this.validations = originalError.validations;
  }
}
