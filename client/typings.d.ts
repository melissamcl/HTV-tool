import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    pk?: number;
  }
}

export interface HTVColor {
  id: number;
  brand: string;
  style: string;
  name: string;
  hex_code: string;
}
