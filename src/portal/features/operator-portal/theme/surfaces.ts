/* eslint-disable no-restricted-syntax -- The portal's own surface colors (Figma "Dashboard Cards"),
   kept here because the grafana theme in src/app/theme is a synced copy that must not be edited.
   Move them into grafana's palette.ts if grafana adopts this card style. */
import type { Theme } from '@mui/material/styles';

export interface PortalSurfaces {
  /** The page behind the cards. */
  page: string;
  /** A card: solid and borderless, as the Figma card. */
  card: string;
  /** Something set into a card (a nested card, a table row on hover). */
  inset: string;
  /** The card's lift off the page. */
  cardShadow: string;
}

/** Dark: Figma's #303030 card on a near-black page, so every card stands out. */
const DARK: PortalSurfaces = {
  page: '#141414',
  card: '#2a2a2a',
  inset: '#333333',
  cardShadow: 'none',
};

/** Light: white cards on a cool grey page, lifted by a soft shadow. */
const LIGHT: PortalSurfaces = {
  page: '#f3f4f6',
  card: '#ffffff',
  inset: '#f7f7f8',
  cardShadow: '0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.1)',
};

/** The portal's surfaces for the active color scheme. */
export const portalSurfaces = (theme: Theme): PortalSurfaces =>
  theme.palette.mode === 'light' ? LIGHT : DARK;
