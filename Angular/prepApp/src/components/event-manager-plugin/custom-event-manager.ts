import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-custom-event',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-event-manager.html',
  styleUrl: './custom-event-manager.css'
})
export class CustomEventManager {
  protected signUpForm = new FormGroup({
    email: new FormControl<null | string>(null, [Validators.email, Validators.required])
  });
  protected onSubmit() {
    const form = this.signUpForm.getRawValue();
    console.log(form);
    const updateApi = async (form: any) => {
      try {
        await fetch('https://dummyjson.com/users/2', {
          method: 'PUT',
          body: JSON.stringify(form),
        });
        this.signUpForm.reset();
        return undefined;
      } catch (e) {
        return [{
          kind: 'server',
          field: form.email,
          message: (e as Error).message
        }]
      }
    }

    updateApi(form);
  }
}