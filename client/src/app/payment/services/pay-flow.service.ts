import { Injectable } from '@angular/core';

import { STEPS } from '../models/pay-flow.model';

@Injectable()
export class PayFlowValidatorService {
    private payFlow = [
        { step: STEPS.options, valid: false },
        { step: STEPS.method, valid: false },
        { step: STEPS.confirmation, valid: false }
    ];

    validateStep(step: string) {
        // If the state is found, set the valid field to true
        var found = false;
        for (var i = 0; i < this.payFlow.length && !found; i++) {
            if (this.payFlow[i].step === step) {
                found = this.payFlow[i].valid = true;
            }
        }
    }

    resetSteps() {
        // Reset all the steps in the PayFlow to be invalid
        this.payFlow.forEach(element => {
            element.valid = false;
        });
    }

    getFirstInvalidStep(step: string) : string {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.payFlow.length && !found && valid; i++) {
            let item = this.payFlow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step
            }
        }
        return redirectToStep;
    }
}
