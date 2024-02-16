// sidebar.animations.ts

import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidebarAnimation = trigger('slideInOut', [
  state(
    'void',
    style({
      width: '0',
    })
  ),
  state(
    '*',
    style({
      width: '250px', // Adjust the width as needed
    })
  ),
  transition('void <=> *', animate('300ms ease-in-out')),
]);
