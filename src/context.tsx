import type { ComponentChildren } from "preact"
import type { RadioMetadata } from "./data.ts"

import { createContext } from "preact"
import { useCallback, useContext, useEffect, useRef, useState } from "preact/hooks"

import { artworkUrl, getMetadata, getRadioStream } from "./data.ts"

export type PlayerContextType = RadioMetadata & {
    volume: number,
    setVolume: (volume: number) => void,
    playing: boolean,
    togglePlaying: () => void,
    hide: () => void,
}
const PlayerContext = createContext<PlayerContextType | null>(null)

export type PlayerConfig = { radioId: string, metadataRefreshInterval?: number, playerStyle?: string }

export function PlayerContextProvider(
    { radioId, children, metadataRefreshInterval = 15 }: PlayerConfig & { children: ComponentChildren },
) {
    const [hidden, setHidden] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [metadata, setMetadata] = useState<RadioMetadata>({
        artist: "",
        img: artworkUrl("img/nocover.jpg"),
        song: "Loading...",
        songtitle: "",
    })
    const audio = useRef<HTMLAudioElement>(null!)

    const updateMetadata = useCallback(async () => {
        const meta = await getMetadata(radioId)
        setMetadata({ ...meta, img: artworkUrl(meta.img) })
        if (navigator.mediaSession) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: meta.songtitle,
                artist: meta.artist,
                album: meta.album,
                artwork: [{ src: artworkUrl(meta.img) }],
            })
        }
    }, [radioId])

    useEffect(() => {
        void updateMetadata()
        const interval = setInterval(updateMetadata, 1000 * metadataRefreshInterval)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const currentAudio = getRadioStream(radioId)
        audio.current = currentAudio

        const eventController = new AbortController()
        currentAudio.addEventListener("play", () => setPlaying(true), { signal: eventController.signal })
        currentAudio.addEventListener("pause", () => setPlaying(false), { signal: eventController.signal })
        currentAudio.addEventListener("volumechange", () => setVolume(currentAudio.volume), { signal: eventController.signal })

        return () => {
            setPlaying(false)
            currentAudio.pause()
            eventController.abort("Effect cleanup")
        }
    }, [radioId])

    return (
        <PlayerContext.Provider
            value={{
                ...metadata,
                volume,
                setVolume: v => audio.current.volume = v,
                playing,
                togglePlaying: () => audio.current.paused ? audio.current.play() : audio.current.pause(),
                hide: () => {
                    audio.current.pause()
                    setHidden(true)
                },
            }}
        >
            {!hidden && children}
        </PlayerContext.Provider>
    )
}

export function usePlayerContext() {
    const context = useContext(PlayerContext)
    if (!context)
        throw new Error("usePlayerContext must be used inside PlayerContextProvider")
    return context
}
