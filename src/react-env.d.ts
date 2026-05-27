import 'react';

declare module 'react' {
  interface HTMLAttributes {
    secondary?: string;
    outline?: string;
    destructive?: string;
    'aria-busy'?: string;
  }
}
