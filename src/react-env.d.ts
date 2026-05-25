import 'react';

declare module 'react' {
  interface HTMLAttributes {
    secondary?: string;
    outline?: string;
    'aria-busy'?: string;
  }
}
