import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService, ContactMessage } from '@univeex/contact/data-access';

@Component({
  selector: 'univeex-contact',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['Consultas Generales', Validators.required], // Added default subject to match interface
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      const message = this.contactForm.value as ContactMessage;
      this.contactService.sendMessage(message).subscribe(() => {
        alert('Mensaje enviado');
        this.contactForm.reset();
      });
    }
  }
}
