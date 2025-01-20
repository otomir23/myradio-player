import { useMemo } from "preact/hooks"

import BottomPlayer from "./bottom-player.tsx"
import { PlayerContextProvider } from "./context.tsx"
import MiniPlayer from "./mini-player.tsx"

import "./style.css"

const playerStyles = new Map([
    ["bottom", BottomPlayer],
    ["mini", MiniPlayer],
])

export default function App(
    { radioId, metadataRefreshInterval, playerStyle = "bottom" }: { radioId: string, metadataRefreshInterval?: number, playerStyle?: string },
) {
    const Player = useMemo(() => playerStyles.get(playerStyle) ?? BottomPlayer, [playerStyle])

    return (
        <PlayerContextProvider radioId={radioId} metadataRefreshInterval={metadataRefreshInterval}>
            <Player />
        </PlayerContextProvider>
    )
}
