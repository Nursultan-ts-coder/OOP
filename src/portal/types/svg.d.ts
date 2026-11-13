declare module '*.svg' {
  import type * as React from 'react';

  const src: string;
  export default src;
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module '*.svg?react' {
  import type * as React from 'react';

  const Component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}
