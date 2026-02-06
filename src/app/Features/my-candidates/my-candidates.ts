import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-my-candidates',
  imports: [ReactiveFormsModule, CommonModule,MatTabsModule],
  templateUrl: './my-candidates.html',
  styleUrls: ['./my-candidates.css'],
})
export class MyCandidates {
  //FormBuilder- Angular service
  //  simplifies the creation of reactive forms by reducing boilerplate
  // code when defining form controls and form groups. 
   URL = URL;  

  //whyInject //Standalone components// Functional style// Cleaner classes// Less boilerplate// Angular team wants to reduce constructor usage.
 //inject() = constructor injection, but modern and cleaner.
  private fb=inject(FormBuilder); 
  private router=inject (Router);
  private snackBar=inject(MatSnackBar);
previewUrl: string | ArrayBuffer | null = null;
  submitted=false;

//tab change
onTabChange(event: MatTabChangeEvent) {
  if (event.index === 1) {
    this.router.navigateByUrl('/about');
  }

  if (event.index === 2) {
    this.router.navigateByUrl('/home');
  }
}

  registerForm=this.fb.nonNullable.group(
    {
      name:["", [Validators.required, Validators.maxLength(100)]],
      email:["",[Validators.required,Validators.email]],
      contact:["",[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      upload: new FormControl<File | null>(null, Validators.required)

      
    }
  );
  get name(){
    return this.registerForm.controls.name;
      }
      get email()
      {
        return this.registerForm.controls.email;
      }
      get contact()
      {
        return this.registerForm.controls.contact;
      }
      get uploadFile() {
    return this.registerForm.controls;
  }
//file uploader and preview
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // store file in form
      this.uploadFile.upload.setValue(file);
      this.uploadFile.upload.markAsTouched();

      // preview only for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewUrl = null;
      }
    }
  }

onSubmit() {
  this.submitted = true;

  if (this.registerForm.invalid) {
    this.snackBar.open('Please fill all required fields correctly', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    return;
  }
const formData = new FormData();
  formData.append('name', this.registerForm.value.name!);
  formData.append('email', this.registerForm.value.email!);
  formData.append('contact', this.registerForm.value.contact!);
  formData.append('file', this.uploadFile.upload.value!); // 👈 your file control name

  console.log('FormData ready:', formData);
  this.snackBar.open('Successfully submitted!', 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  });

  this.router.navigateByUrl('/about');
}
}