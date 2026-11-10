---
name: Aous Damanhoori portfolio
description: A quiet, product-grade bilingual portfolio where input is visibly checked and refused.
colors:
  ink-dark: "#0a0a0b"
  surface-dark: "#131315"
  raised-dark: "#1c1c1f"
  text-dark: "#f5f5f3"
  muted-dark: "#a5a5a2"
  ember-dark: "#ff5a36"
  paper-light: "#f6f6f3"
  surface-light: "#ffffff"
  raised-light: "#ebebe7"
  text-light: "#101011"
  muted-light: "#5c5c58"
  ember-light: "#c7330e"
typography:
  display:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "clamp(5rem, 8.8vw, 8.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-.035em"
  display-arabic:
    fontFamily: "Readex Pro Variable, Tahoma, sans-serif"
    fontSize: "clamp(6rem, 11vw, 11rem)"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 5.4vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-.028em"
  body:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  panel: "18px"
  card: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 2rem)"
  tap: "44px"
components:
  button-primary:
    backgroundColor: "{colors.text-dark}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    height: "50px"
  button-ghost:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.pill}"
    height: "50px"
  card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.card}"
---

# Design System: Aous Damanhoori portfolio

## Overview

**Creative North Star: "Checked, Then Shown"**

The page behaves the way its author works. It is calm, neutral and product-grade, and the only drama comes from something being verified or refused. One huge name leads, real project screens supply the colour, and everything else stays out of the way.

English and Arabic are equal. Arabic has its own typeface scale and line heights, and all layout uses logical properties so the page truly reads right to left.

**Key Characteristics:**
- One name at maximum scale, centred, with a pill above it that says cybersecurity.
- Neutral surfaces in dark and light, with ember reserved for refusal.
- Real product screens in each product's own colour field.
- Motion that shows a check happening.

## Colors

Neutrals carry the page. One accent means one thing.

### Primary
- **Ember** (dark and light variants): untrusted output, refused dots, the Abstains result, focus rings and text selection.

### Neutral
- **Ink and Paper:** the page ground in each theme.
- **Surface and Raised:** cards, panels and segmented controls.
- **Text and Muted:** primary and secondary copy. Muted passes AA on every surface.

**The One Meaning Rule.** Ember means refused or untrusted. It is never decoration.

**The Borrowed Colour Rule.** Saturated fields appear only on project cards, and they come from that product's own interface.

## Typography

**Latin:** Geist Variable. **Arabic:** Readex Pro Variable, set through the `--font-ar` token so it can be swapped.

**Character:** a neutral grotesque beside a modern Arabic sans, tight in Latin and open in Arabic.

### Hierarchy
- **Display:** the name in the hero, and "Email me" at the close.
- **Title:** section headings, with a muted second clause.
- **Body:** copy, capped by section measures.
- **Small:** dates and metadata at .9375rem in muted.

**The Arabic Spacing Rule.** Arabic never takes negative letter-spacing, and it gets more line height than Latin at every level.

## Layout

Single page, phone first, in a 76rem container. Breakpoints sit at 44rem and 60rem. The first viewport always shows the name, the actions and four proof facts. Project cards stack and pin on screens tall enough to hold them.

## Elevation & Depth

Flat by default, with separation from hairlines and tonal surfaces. The only shadow sits under project screens, where a device-like object rests on a colour field. The floating nav uses a blur, because content scrolls beneath it.

## Shapes

Soft and consistent: pills for controls, 28px for cards, 18px for panels nested inside them.

## Components

### Buttons
Pills at 50px tall, with a primary inverted fill and a surface ghost. Hover lifts 2px.

### Baseera demo
The signature component: untrusted output, plain code, then either exact stored text or Abstains. The failure path shows two attempts before refusing.

### Scan field
A canvas of dots behind the hero, swept once. Dots that fail flash ember and are removed for good.

### Case studies
Native disclosure elements with four parts: problem, the hard part, what we did, proof.

## Do's and Don'ts

### Do:
- **Do** keep every animated text state at AA contrast.
- **Do** split animated Arabic by word only, so letters stay joined.
- **Do** keep every interactive target at 44px or more.
- **Do** self-host fonts and scripts, because the Content-Security-Policy allows nothing else.

### Don't:
- **Don't** use ember for emphasis or decoration.
- **Don't** use matrix rain, green-on-black terminals, padlock or circuit imagery, fake typing, skill bars, certificate scans or logo walls.
- **Don't** show film clips from Dub.
