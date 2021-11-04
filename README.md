# Web-S7-Mediaselect-Demo

**Demo of Mediaselection (Image / Video) controlled by a S7 Plc.**

This is an example of an easy way to select the displayed images or other
media data like mp4 movies in a webserver, controlled by a S7 plc.

The example website contains an image and a video clip.
Each media can be selected by an integer variable in the S7 plc.

This example contains 4 images and 4 mp4 videos, which can be selected by the values
from 0 to 3. The selection is done in some javascript code in *public/s7-mediaselect.html*, but could
also be done on the serverside scripting or even by using a string variable in the S7 which contains
the filename.

The autoplay of MP4 movies works properly only if the video is muted.

![Demo application running in a Webbrowser](https://github.com/thomas-v2/Web-S7-Mediaselect-Demo/blob/master/images/demo-s7mediaselect-browser.png)

## Installation

The neccessary Javascript modules are downloaded and installed with npm.

In the work directory call:
```
npm install
```

## Prerequisites

Settings like Webserver port (default: 3000) and the S7-Plc IP, rack, slot and variable addresses for the Image and and Video number
can be configured in the file:
```
config.json
```

To control the media selection using S7 Plc variables, you need a S7 Plc (300/400 or 1200/1500 with Put/Get enabled) with a TCP/IP network interface.

## Running

Start the application with:

```
node app-s7-mediaselect.js
```

The default setting for the Webserver port is 3000. You can change this in the *config.json* file.
To view the demo with default settings, open a Webbrowser with the URL:

```
http://<your-ip>:3000/s7-mediaselect.html
```

## Technical Details

* Using [Node.js](https://nodejs.org/) with express to deliver static content
* Using [nodeS7](https://www.npmjs.com/package/nodes7) for accessing variables from a S7 plc

## Authors

* **Thomas Wiens** - *Initial work* - [thomas-v2](https://github.com/thomas-v2)
