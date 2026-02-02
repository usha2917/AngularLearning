import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-my-candidates',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './my-candidates.html',
  styleUrl: './my-candidates.css',
})
export class MyCandidates {
  private fb=inject(FormBuilder);
  private router=inject (Router);

  submitted=false;

  registerForm=this.fb.nonNullable.group(
    {
      name:["", [Validators.required, Validators.maxLength]],
      email:["",[Validators.required,Validators.email]],
    }
  );
  get name(){
    return this.registerForm.controls.name;
      }
      get email()
      {
        return this.registerForm.controls.email;
      }
onSubmit()
{
  this.submitted=true;
  if(this.registerForm.invalid){
    return;
   
  }
  alert("successfully submitted")
   this.router.navigateByUrl("/about")
}
}