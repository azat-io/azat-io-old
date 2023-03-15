---
title: Fluid interfaces
description: Using the CSS сlamp() Function to create fluid interfaces
date: 2022-08-18
hero:
  desktop:
    avif: /posts/fluid-interfaces/cover-desktop.avif
    webp: /posts/fluid-interfaces/cover-desktop.webp
  mobile:
    avif: /posts/fluid-interfaces/cover-mobile.avif
    webp: /posts/fluid-interfaces/cover-mobile.webp
image: /posts/fluid-interfaces/preview.png
---

Modern web is a zoo of all kinds of devices on which a browser can be launched. Therefore, developers keep an eye on how the website looks on different mobile devices, tablets, and desktop computers.

Due to the small screens of mobile devices, it is necessary to reduce the font size and spacing on the page.

The most common way to do this is through media queries. For example:

```css
.button {
  padding: 2px 4px;
  font-size: 1.25rem;
  background: blue;
  border: none;
  border-radius: 4px;
}

@media screen and (min-width: 760px) {
  .button {
    padding: 4px 12px;
    font-size: 1.5rem;
    border-radius: 6px;
  }
}
```

There are drawbacks to this method:

- it requires writing a lot of code
- it would be nice to take into account intermediate values for indents and make elements on the page truly flexible

Let's say the task is to set the font size, which will change in the range from 480 to 1280 pixels. The minimum size will be `2.25rem`, the maximum will be `3rem`.

What are some ways to do this?

## calc() function

This function is used for calculations in CSS. In combination with the `vw` unit (viewport width percentage), it becomes a powerful tool for creating fluid interfaces.

Let's define the difference between the maximum and minimum font sizes. In our example, it will be: `3rem - 2.25rem = 0.75rem`.

We'll also define the difference between the viewport values, first converting them to `rem` units (depending on the value of `<html>`, by default `16px`). We get `(1280 / 16) - (480 / 16) = 50`.

We have the following values:

- Minimum font size: `2.25rem`
- Maximum font size: `3rem`
- Difference between maximum and minimum font sizes: `0.75rem`
- Minimum viewport size: `30rem (480px)`
- Difference between maximum and minimum viewport sizes: `50rem (800px)`

The necessary function looks like this:

Minimum font size + Difference between maximum and minimum font sizes \* ((Viewport width - Minimum viewport size) / Difference between maximum and minimum viewport sizes).

As a result, we get:

```css
.foo {
  font-size: 2.25rem;
}

@media screen and (min-width: 480px) and (max-width: 1280px) {
  .foo {
    font-size: calc(2.25rem + 0.75 * ((100vw - 30rem) / 50));
  }
}

@media screen and (min-width: 1280px) {
  .foo {
    font-size: 3em;
  }
}
```

It has gotten better, but there is still too much code for now.

## clamp() functions

The `clamp()` function is a more concise way to set a value within the range of minimum and maximum values of a CSS property.

All that remains is to find the preferred font size value.

![clamp function graph](/posts/fluid-interfaces/image-01.webp)

On the coordinate plane, the values of browser window width are shown on the X axis, and CSS properties are shown on the Y axis. Let's determine the point where the function intersects the Y-axis. To do this, we use the slope of the line.

The slope of the line is the ratio of the change in Y coordinate (between two points) to the change in X coordinate (between two points). Let's find the difference between the values that correspond to the coordinates of the first and second points. We will divide the difference between the maximum and minimum font sizes by the difference between the maximum and minimum viewport sizes (while also converting the viewport sizes from px to rem for convenience). The result is: `(3 - 2.25) / ((1280 / 16) - (480 / 16)) = 0.015`

The slope of the line is `0.015`. Now let's find the Y-intercept using the formula: the negative of the minimum viewport size, multiplied by the slope of the line, plus the minimum font size: `(0 - (480 / 16)) * 0.015 + 2.25 = 1.8`

The preferred font size value will be equal to the Y-intercept plus (slope of the line multiplied by 100)vi.

```css
.foo {
  font-size: clamp(2.25rem, 1.8rem + 1.5vw, 3rem);
}
```

## PostCSS plugin

![postcss-responsive >](/posts/fluid-interfaces/image-02.webp =176x220)

This mathematics seems tedious, especially when it comes to developing a large web application or an entire design system.

To simplify the task, I created a corresponding plugin, [postcss-responsive](https://github.com/azat-io/postcss-responsive).

To use responsive typography in the project, it is sufficient to install the PostCSS plugin:

```sh
pnpm add postcss-responsive
```

Next, add plugin to PostCSS config:

```json
{
  "plugins": {
    "postcss-responsive": {
      "minWidth": 480,
      "maxWidth": 1280
    }
  }
}
```

Now we can use the `responsive()` function in our styles by passing the minimum and maximum font sizes to it. The value will be calculated by the PostCSS plugin.

```postcss
/* Input */

.foo {
  font-size: responsive(2.25rem, 3rem);
}

/* Output */

.foo {
  font-size: clamp(2.25rem, 1.8rem + 1.5vw, 3rem);
}
```

This plugin will be useful not only for creating fluid typography, but also for working with other CSS properties.

```postcss
.container {
  display: grid;
  grid-template-columns: responsive(180px, 240px) 1fr;
  grid-gap: responsive(8px, 16px);
  padding: responsive(16px, 32px) responsive(16px, 24px);
  font-size: responsive(1rem, 1.125rem);
  line-height: responsive(1.5rem, 1.75rem);
}
```

Create fluid interfaces without media queries.
