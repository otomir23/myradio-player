import { usePlayerContext } from "./context.tsx"

import closeIcon from "./icons/close.svg"
import pauseIcon from "./icons/pause.svg"
import playIcon from "./icons/play.svg"
import VolumeSlider from "./volume-slider.tsx"

export default function BottomPlayer() {
    const player = usePlayerContext()

    return (
        <div className="fixed bottom-0 inset-x-0 bg-black text-white flex gap-4 p-4 items-center font-bold">
            <button className="size-8 cusrsor-pointer shrink-0" onClick={() => player.togglePlaying()}>
                <img src={player.playing ? pauseIcon : playIcon} alt={player.playing ? "Pause icon" : "Play icon"} />
            </button>
            <img src={player.img} className="size-8 rounded aspect-square" alt="Song Artwork" />
            <span className="truncate">{player.song}</span>
            <div className="flex-1"></div>
            <VolumeSlider />
            <button onClick={player.hide}>
                <img src={closeIcon} className="size-4" alt="Close icon" />
            </button>
        </div>
    )
}
