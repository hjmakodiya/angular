import { Injectable } from '@angular/core';
import { Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root' // Just do @Injectable() if you're not on Angular v6+
})

export class Common {
  inputObject: any = {}

  generateFormInput(inputArray: any[]) {
    inputArray.forEach(element => {
      var validationArry: any[] = []
      if (element.validation) {
        element.validation.forEach((errobj: any) => {
          switch (errobj.valid) {
            case "required":
              validationArry.push(Validators.required)
              break;

            case "email":
              validationArry.push(Validators.email)
              break;

            default:
              break;
          }
        });
      }
      this.inputObject[element.key] = [element.default, validationArry]
    });

    return this.inputObject;
  }
}