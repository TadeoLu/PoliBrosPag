// clipboard.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  copy(text: string): void {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Copying to clipboard was successful!');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }
}
