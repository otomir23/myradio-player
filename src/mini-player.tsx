import { usePlayerContext } from "./context.tsx"

import closeIcon from "./icons/close.svg"
import pauseIcon from "./icons/pause.svg"
import playIcon from "./icons/play.svg"
import VolumeSlider from "./volume-slider.tsx"

export default function MiniPlayer() {
    const player = usePlayerContext()

    return (
        <div className="fixed bottom-4 right-4 bg-neutral-900 text-white flex gap-4 p-4 font-bold rounded-lg flex-col">
            <div className="flex items-center gap-4 w-full">
                {player.img && (
                    <img src={player.img} className="size-12 rounded aspect-square" alt="Song Artwork" />
                )}
                <div className="flex-1 flex flex-col h-full gap-0.5 w-40">
                    <span className="truncate text-sm w-full">{player.songtitle}</span>
                    <span className="truncate text-xs w-full">{player.artist}</span>
                </div>
            </div>
            <div className="flex items-center gap-4 justify-between">
                <button className="size-8 cusrsor-pointer shrink-0" onClick={() => player.togglePlaying()}>
                    <img
                        src={player.playing ? pauseIcon : playIcon}
                        alt={player.playing ? "Pause icon" : "Play icon"}
                    />
                </button>
                <VolumeSlider />
            </div>
            <button onClick={player.hide} className="absolute top-2 right-2">
                <img src={closeIcon} className="size-4" alt="Close icon" />
            </button>
        </div>
    )
}
