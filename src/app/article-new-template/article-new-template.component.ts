import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-new-template',
  templateUrl: './article-new-template.component.html',
  styleUrl: './article-new-template.component.css'
})
export class ArticleNewTemplateComponent implements OnInit {
  articleForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.articleForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9]*)?$/)]],
      enVenta: [false]
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      console.log('Formulario válido:', this.articleForm.value);
    } else {
      this.markFormGroupTouched(this.articleForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  
}