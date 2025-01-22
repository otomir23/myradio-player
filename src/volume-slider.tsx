import { usePlayerContext } from "./context.tsx"
import muteIcon from "./icons/mute.svg"
import volumeIcon from "./icons/volume.svg"

export default function VolumeSlider() {
    const player = usePlayerContext()

    return (
        <div className="flex items-center gap-2 group shrink-0 relative">
            <button
                onClick={() => player.volume === 0 ? player.setVolume(1) : player.setVolume(0)}
                className="cursor-pointer"
            >
                <img src={player.volume ? volumeIcon : muteIcon} className="size-4" alt="Volume icon" />
            </button>
            <div
                className="absolute bg-black transition bottom-full -translate-x-1/2 left-1/2 rounded-lg z-20 flex w-0 py-8 h-20 px-2
                pointer-events-none group-hover:pointer-events-auto
                opacity-0 group-hover:opacity-100
                translate-y-10 group-hover:-translate-y-4
                before:absolute before:-top-2 before:-bottom-4 before:-inset-x-4"
                draggable={false}
            >
                <input
                    type="range"
                    onInput={e => player.setVolume(e.currentTarget.valueAsNumber / 100)}
                    value={player.volume * 100}
                    max={100}
                    min={0}
                    step={1}
                    className="appearance-none bg-white accent-white rounded-full h-2 -rotate-90 -translate-x-1/2 translate-y-1.5 w-16"
                    draggable={false}
                />
            </div>
        </div>
    )
}
