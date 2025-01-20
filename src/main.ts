import { h, render } from "preact"

import App from "./app.tsx"

const playerRoot = document.querySelector<HTMLDivElement>("[data-radio-player]")
if (!playerRoot)
    throw new Error("Radio player root is missing")

const radioId = playerRoot.getAttribute("data-radio-id")
if (!radioId)
    throw new Error("data-radio-id is unspecified on the radio player root")

const refreshIntervalSecondsString = playerRoot.getAttribute("data-metadata-refresh-rate")
const refreshIntervalSeconds = (refreshIntervalSecondsString && !Number.isNaN(+refreshIntervalSecondsString)) ? +refreshIntervalSecondsString : undefined

const playerStyle = playerRoot.getAttribute("data-player-style") || undefined
const disableArtwork = playerRoot.getAttribute("data-hide-artworks") === "true"

render(h(App, { radioId, metadataRefreshInterval: refreshIntervalSeconds, playerStyle, disableArtwork }), playerRoot)
