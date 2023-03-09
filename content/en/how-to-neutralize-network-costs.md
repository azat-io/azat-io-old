---
title: How to neutralize network costs
description: How to reduce the influence of networks on the speed of loading sites
date: 2022-10-05
hero:
  avif: /posts/how-to-neutralize-network-costs.avif
  webp: /posts/how-to-neutralize-network-costs.webp
image: /posts/how-to-neutralize-network-costs-preview.png
---

Website loading speed affects search engine ranking, user perception, and conversion rates.

The average human reaction speed is [200-250 milliseconds](https://humanbenchmark.com/tests/reactiontime).

What happens within 250 milliseconds is perceived by humans as “instantaneous”, and a few hundred milliseconds is perceived as “fast enough”.

Web page loading can be roughly divided into three major parts:

1. Network
2. Server
3. Client

This article focuses on the first part, but the other two will also be touched upon.

## How does a browser work?

First, the user enters a URL into the browser's address bar. Let's take the address of this article as an example: `https://azat.io/ru/fluid-interfaces`.

The browser breaks down the address into parts:

- `https` - protocol
- `azat.io` - host
- `/ru/fluid-interfaces` - resource

Based on the host, the browser obtains the IP address of the server where the website is located. This is done using DNS.

DNS servers are like yellow phone books that match contact names with phone numbers, where the contact name corresponds to the website host and the phone number corresponds to its IP address on the network.

If the request to the host has already been executed, then there won't be a request to DNS again, and the browser will take the server's IP address from the local cache.

Additionally, the browser visits the `hosts` file, which contains a database of domain names and is used to translate them into network node addresses (in macOS, for example, this file is located at `/private/etc/hosts`). But these are already details.

A connection is established by IP address via the TCP data transmission protocol. For TCP connection, the port is important: for HTTP protocol - 80, for HTTPS - 443.

When establishing a connection via the HTTPS protocol, a TLS Handshake occurs:

The client sends a message to the server that contains the version of the TLS cryptographic protocol and a list of supported encryption algorithms and data compression methods. The server responds to the client the same way and sends the SSL certificate of the service, which contains the public key.

In response, the client generates a random string and encrypts it using the server's public key. The server decrypts it using its secret key and uses this string to create a master key, which the client and server use to generate a symmetric key.

After that, the data received via HTTP will be transmitted in an encrypted form using the symmetric key.

After establishing the connection, an HTTP header is formed.

HTTP header is a text header that starts with a line that specifies the method (`GET`, `POST`, `PUT`, etc.), followed by the resource location and the version of the HTTP protocol. In addition, the Host header is specified, which usually matches the domain name, and the Connection: close header is also specified. The latter is added because some browsers support persistent connections.

```
GET / HTTP/1.1
Host: azat.io
Connection: close
[...]
```

The HTTP response contains information about an error and its code, or a header with a status code of 200 and an HTML page. The time from the beginning of the process to the receipt of the first HTML data packet is called Time to First Byte (TTFB).

Next, the browser starts the process of parsing the HTML page, forming the DOM and CSSOM, creating a rendering tree and a set of elements, based on which the display is made.

Scripts can change the position and size of elements, which launches the reflow and redraw processes. Parsing a page is a voluminous task that includes at least one reflow and one redraw.

## How networking works

**Bandwidth** is the maximum amount of data that can be transmitted over a connection in a certain period of time. It is measured in megabits per second and greatly affects the speed at which web pages load. Bandwidth can be compared to a water pipe: the wider it is, the more water can pass through it in a unit of time.

On mobile devices, bandwidth is lower, especially in 3G networks. Therefore, the impact of the network on page loading speed is higher here than on desktop.

The time it takes for a request to reach the server and back is called the **Round Trip Time** (RTT).

The RTT can be determined using the `ping` command. The ideal average round trip time is 50 milliseconds.

```
PING azat.io (75.2.60.5): 56 data bytes
64 bytes from 75.2.60.5: icmp_seq=0 ttl=117 time=31.788 ms
64 bytes from 75.2.60.5: icmp_seq=1 ttl=117 time=32.157 ms
64 bytes from 75.2.60.5: icmp_seq=2 ttl=117 time=31.282 ms
64 bytes from 75.2.60.5: icmp_seq=3 ttl=117 time=31.204 ms

--- azat.io ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 31.204/31.608/32.157/0.388 ms
```

Aside from HTML, a webpage also consists of CSS, JS files, images, and so on. Each resource requires a network request.

RTT is directly affected by **latency**. As the distance to the end server and its route increases, the delay grows because data is transmitted not through a single network, but passes through multiple autonomous systems. Network quality also affects it: 3G networks may have a delay of 100-500 milliseconds, which significantly slows down content loading. Other causes include servers that cannot handle high traffic volume, network congestion in crowded areas, and inefficient router performance.

As technology improves, bandwidth increases, but at least the speed of light limits latency.

The distance between Mars and Earth varies from 55.75 million km to 401 million km. Thus, a message from Mars will take from 3 minutes and 22 seconds to 44 minutes to arrive.

This is why internet resources in Australia and New Zealand usually load slower since most servers are located in the US and Europe.

Unstable networks experience packet loss problems, leading to an increase in RTT.

## How to measure page loading speed?

To evaluate performance, you can use Lighthouse in Chrome DevTools or a similar cloud service.

Here's what you can see:

**First Contentful Paint** - the time it takes for the browser to display the first part of the DOM content. FCP is considered fast if it does not exceed 1.8 seconds.

**Speed Index** - the speed of visual content display when the page loads. The browser evaluates this speed by comparing the site with others from the HTTP archive.

**Largest Contentful Paint** - the time it takes to load the largest element in the user's viewport.

**Time to Interactive** - the time from the beginning of loading to when the page becomes fully interactive.

**Total Blocking Time** - the time the page is blocked when the user cannot take any action.

**Cumulative Layout Shift** - layout shift due to asynchronous loading of resources.

## What can be done about it?

The TCP slow start specification establishes that the volume of the first data packet is always 14 kB.

The server does not know the amount of data that the internet connection can handle, so a small and reliable amount of data is sent - 10 TCP packets with a maximum size of 1500 bytes.

For this reason, a web page with a size of 14 kB loads significantly faster than a web page with a size of 15 KB due to an additional RTT, although the difference between them is minimal.

To reduce the volume of data, data compression algorithms such as Brotli and Gzip should be used.

![How a CDN works](/posts/how-to-neutralize-network-costs-01.webp)

When using TCP/IP, delays are influenced by the number of routes between the client and the server. The further the user is from the server, the longer they wait for a response. Content delivery services - CDNs - solve the problem of delays. These are worldwide distributed servers that store static data.

To reduce the impact of delays, it is necessary to avoid chains of sequential calls, such as when fonts are loaded from CSS files.

A good option is to use `preload`:

```html
<link
  rel="preload"
  href="/fonts/awesome-font.woff2"
  type="font/woff2"
  as="font"
  crossorigin
/>
```

During the loading of an external web font, the text should remain visible. This can be achieved by including font-display: swap:

```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/awesome-font.woff2') format('woff2');
  font-display: swap;
}
```

Redirects to display the first page slow down page rendering. Instead of redirecting to the mobile version of the site, it is better to use responsive design.

To speed up page rendering, the technique of inline styles is used because they are loaded with the first request, and even `preload` only with the second.

When working with scripts, it is necessary to use the `defer`/`async` attributes to avoid blocking during page rendering. It is also important to carefully consider code splitting to optimize loading speed.

Lazy loading of images and the `content-visibility` property in CSS are good ways to reduce rendering time for pages with a lot of content.

Using the HTTP/2 protocol speeds up page loading. This is achieved because when using the second version of the protocol, several requests can be sent over a single TCP connection, regardless of the type of resource, and also thanks to compression of HTTP headers.
