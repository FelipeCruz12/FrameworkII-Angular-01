import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [FormsModule, CommonModule],  
  template: `
    <div class="container">
      <h1>Gerador de Senhas Seguras</h1>

      <div class="settings">
        <label for="length">Comprimento da senha:</label>
        <input
          type="number"
          id="length"
          [(ngModel)]="passwordLength"
          min="4"
          max="32"
          placeholder="Ex: 12"
        />

        <div class="options">
          <label>
            <input type="checkbox" [(ngModel)]="includeNumbers" />
             Números
          </label>

          <label>
            <input type="checkbox" [(ngModel)]="includeSymbols" />
             Símbolos
          </label>

          <label>
            <input type="checkbox" [(ngModel)]="includeUppercase" />
             Letras A-Z
          </label>
          
          <label>
            <input type="checkbox" [(ngModel)]="includeLowercase" />
             Letras a-z
          </label>
        </div>
      </div>

      <button (click)="generatePassword()">Gerar Senha</button>

      <div *ngIf="generatedPassword" class="result">
        <strong>Senha Gerada:</strong>
        <input type="text" [value]="generatedPassword" readonly />
        <button (click)="copyToClipboard()">Copiar</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 4px solid #A020F0;
        border-radius: 10px;
        text-align: center;
        background-color: #f9f9f9;
      }
      .settings, .options {
        margin: 15px 0;
      }
      .result {
        margin-top: 15px;
      }
      button {
        background-color: #0D0D0D;
        color: #fff;
        border: 1px solid #A020F0;
        padding: 8px 20px;
        cursor: pointer;
        border-radius: 5px;
      }
      input[type="text"] {
        width: 100%;
        padding: 5px;
        margin-top: 5px;
      }
    `
  ]
})
export class AppComponent {
  title: string = 'Gerador de Senhas';

  passwordLength: number = 12;
  includeNumbers: boolean = false;
  includeSymbols: boolean = false;
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  generatedPassword: string = '';

  generatePassword() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}[]<>?';
  
    let validChars = '';
  
    if (this.includeNumbers) validChars += numberChars;
    if (this.includeSymbols) validChars += symbolChars;
    if (this.includeUppercase) validChars += uppercaseChars;
    if (this.includeLowercase) validChars += lowercaseChars;
    
    // Se nenhuma opção foi selecionada, exibe um alerta de erro
    if (!this.includeNumbers && !this.includeSymbols && !this.includeUppercase && !this.includeLowercase) {
      alert('Por favor, selecione ao menos uma opção (números, símbolos, letras maiúsculas ou minúsculas).');
      return;
    }
  
    // Gerar a senha com os caracteres válidos
    this.generatedPassword = Array.from({ length: this.passwordLength }, () =>
      validChars.charAt(Math.floor(Math.random() * validChars.length))
    ).join('');
  }
  
  
  copyToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.generatedPassword).then(() => {
        alert('Senha copiada para a área de transferência!');
      }).catch(err => {
        console.error('Erro ao copiar senha:', err);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = this.generatedPassword;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Senha copiada para a área de transferência!');
    }
  }
}
