---
title: Fluid interfaces
description: Using the CSS сlamp() Function to create fluid interfaces
date: 2022-08-18
hero:
  avif: /assets/fluid-interfaces.avif
  webp: /assets/fluid-interfaces.webp
preview: /assets/fluid-interfaces-preview.png
---

Ohayo, as they say!

Today's web is a wild zoo of all kinds of devices on which you can run a browser. And, therefore, our site should look cheerfully both on different mobile phones and on tablets, laptops, desktop computers.

Due to the small screen size of mobile devices, for example, it makes sense to change font sizes and all kinds of indents on the page down.

Fortunately, there are a couple of ways to use CSS to set the font size, which would be fun to scale between different values ​​​​within a certain range of viewport width.

As a rule, an average developer uses media expressions for these purposes. It looks something like this:

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

But, I think, this method is dull, like the agrarian industry. First of all, it makes you sad because you have to write a lot of code, you can even say that you write CSS code twice in one file. It would also be fun to take into account intermediate values ​​for all paddings and sizes, that is, to make the button fluid.

So, for this example, let's say we want to set a font that spans between 480px and 1280px viewport sizes. The minimum font size will be `2.25rem`, the maximum font size will be `3rem`.

What are some ways to make it fun?

## calc() function

This function is used to perform simple calculations in CSS, in conjunction with the `vw` unit (percentage of the total width of the viewport), this function becomes a powerful tool in responsive design. This func can help us in calculating the required font size in the range we need.

First, let's define the difference between the maximum and minimum font sizes. In our example, this would be: `3rem - 2.25rem = 0.75rem`.

We will also determine the difference between the viewport values ​​by first converting their value to the `rem` unit (depends on the value of `<html>`, by default `16px`). We get the following value: `(1280 / 16) - (480 / 16) = 50`.

Thus, we got the following values:

- Minimum font size: `2.25rem`
- Maximum font size: `3rem`
- Difference between maximum and minimum font sizes: `0.75rem`
- Minimum viewport size: `30rem (480px)`
- Difference between max and min viewport sizes: `50rem (800px)`

The function we need should look like this:

Minimum font size + Difference between maximum and minimum font sizes \* ((Viewport width - Minimum viewport size) / Difference between maximum and minimum viewport sizes).

In total we get the following result:

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

## clamp() functions

But perhaps the most efficient way is the clamp() function, which is designed to set a value in the range between the specified lower and upper limits. Obviously, in our case, the boundaries will be the minimum and maximum dimensions of the viewport.

All that remains for us is to find the preferred value for the font size. To do this, we will need to perform several non-trivial operations.

![clamp function graph](/assets/fluid-interfaces-01.webp)

So, we have a coordinate plane, the X-axis is the width of the browser window, and the Y-axis is the CSS property values. We need to find the point where the graph of the function intersects the Y-axis. As we remember from the boring geometry lessons at school, it is done according to the angular coefficient.

The slope, I recall, is the ratio of a change in the Y coordinate (two points) to a change in the X coordinate (two points). Coordinate change is the difference between the values ​​of the corresponding coordinate of the first and second points. Okay, let's go: the difference between the maximum and minimum font sizes is divided by the difference between the maximum and minimum viewport sizes (at the same time we convert the viewport sizes from px to rem for convenience): `(3 - 2.25) / ((1280 / 16) - ( 480 / 16)) = 0.015`

So, we found out that the slope is `0.015`. Now let's find the intersection along the Y-axis by the formula: the minimum viewport size, converted to a negative number, multiplied by the slope plus the minimum font size: `(0 - (480 / 16)) * 0.015 + 2.25 = 1.8`

The preferred font size value would be the Y-intercept + (slope \* 100)vw.

```css
.foo {
  font-size: clamp(2.25rem, 1.8rem + 1.5vw, 3rem);
}
```

## PostCSS plugin

![postcss-responsive >](/assets/fluid-interfaces-02.webp =176x220)

All this math seems to be unnecessarily tedious, especially when it comes to developing a large web application or an entire design system. Therefore, for the audience's titillation, I filed the corresponding plugin [postcss-responsive](https://github.com/azat-io/postcss-responsive).

To use fluid typography in your project, just install the PostCSS plugin:

```sh
pnpm add postcss-responsive
```

Next, add it to our PostCSS config:

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

That's all. Now we can use the `responsive()` function in our styles, to which it is enough to pass two arguments: the minimum and maximum font sizes, and the PostCSS plugin will already calculate the preferred value:

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

In fact, this plugin can be used not only when developing responsive typography, but also for all other CSS properties.

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

Thus, we can easily create truly fluid interfaces.
