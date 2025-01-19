import pauseIcon from "./icons/pause.svg"
import playIcon from "./icons/play.svg"
import volumeIcon from "./icons/volume.svg"

import "./style.css"

const playerRoot = document.querySelector<HTMLDivElement>("[data-radio-player]")
if (!playerRoot)
    throw new Error("Radio player root is missing")

const radioId = playerRoot.getAttribute("data-radio-id")
if (!radioId)
    throw new Error("data-radio-id is unspecified on the radio player root")

const refreshIntervalSeconds = +(playerRoot.getAttribute("data-metadata-refresh-rate") ?? "15") || 15

const mediaBaseUrl = `https://myradio24.org`
const audioSourceUrl = `https://myradio24.org/${radioId}`
const metadataEndpoint = `https://myradio24.com/users/${radioId}/status.json`

function artwork(path: string) {
    return `${mediaBaseUrl}/${path}`
}

playerRoot.innerHTML = `
    <div class="fixed bottom-0 inset-x-0 bg-black text-white flex gap-4 p-4 items-center font-bold">
        <button class="size-8 cusrsor-pointer shrink-0" data-player-action="playback">
            <img src="${playIcon}">
        </button>
        <img src="${artwork("img/nocover.jpg")}" class="size-8 rounded aspect-square">
        <span data-metadata-key="song" class="truncate"></span>
        <div class="flex-1"></div>
        <div class="flex items-center gap-2 group shrink-0 max-sm:hidden">
            <img src="${volumeIcon}" class="size-4">
            <input
                type="range" data-player-action="volume" value="100" max="100" min="0"
                class="w-0 group-hover:w-24 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100
                appearance-none bg-white accent-white rounded-full h-2">
        </div>
    </div>
`

const audio = new Audio(audioSourceUrl)
const playButton: HTMLButtonElement = playerRoot.querySelector("[data-player-action=playback]")!
const volumeSlider: HTMLInputElement = playerRoot.querySelector("[data-player-action=volume]")!

function updatePlayState(playing: boolean) {
    playButton.querySelector("img")!.src = playing ? pauseIcon : playIcon
}

audio.addEventListener("play", () => updatePlayState(true))
audio.addEventListener("pause", () => updatePlayState(false))

volumeSlider.addEventListener("input", () => {
    audio.volume = +(volumeSlider.value) / 100
})

playButton.addEventListener("click", () => {
    if (audio.paused)
        void audio.play()
    else
        void audio.pause()
})

async function updateMetadata() {
    const meta = await fetch(metadataEndpoint)
        .then(r => r.json())

    Object
        .entries(meta)
        .forEach(([key, value]) => {
            const valueString = String(value)
            playerRoot!
                .querySelectorAll(`[data-metadata-key="${key}"]`)
                .forEach((elem) => {
                    if (elem instanceof HTMLImageElement)
                        elem.src = artwork(valueString)
                    else
                        elem.textContent = valueString
                })
        })

    if (navigator.mediaSession) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: meta.songtitle,
            artist: meta.artist,
            album: meta.album,
            artwork: [{ src: artwork(meta.img) }],
        })
    }
}

void updateMetadata()
setInterval(updateMetadata, 1000 * refreshIntervalSeconds)
