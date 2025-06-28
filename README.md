# myradio-player

Simple player widget with track metadata and covers for [MyRadio24](https://myradio24.com) radios.
Powered by Preact & TailwindCSS.

## Installation

### Adding script & styles
> Hosted builds are provided for convenience, I recommend building the library yourself.
```html
<script type="module" src="https://i.otomir23.me/platform/myradio/myradio-player.js"></script>
<link rel="stylesheet" href="https://i.otomir23.me/platform/myradio/myradio-player.css">
```

### Adding the player
```html
<div data-radio-player data-radio-id="your-radio-id"></div>
```

## Configuration

| Attribute                    | Description                             | Default  |
|------------------------------|-----------------------------------------|----------|
| `data-radio-player`          | Marks radio player element, required    | N/A      |
| `data-radio-id`              | The ID of the radio to play, required   | N/A      |
| `data-player-style`          | Player style, can be `bottom` or `mini` | `bottom` |
| `data-metadata-refresh-rate` | Metadata refresh rate in seconds        | `15`     |
| `data-hide-artworks`         | Flag to hide artworks                   | `false`  |

