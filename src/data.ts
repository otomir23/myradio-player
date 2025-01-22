export type RadioMetadata = {
    title: string,
    artist: string,
    song: string,
    songtitle: string,
    img: string,
    album?: string,
}

export async function getMetadata(radioId: string) {
    const metadataEndpoint = `https://myradio24.com/users/${radioId}/status.json`
    return await fetch(metadataEndpoint)
        .then(r => r.json() as Promise<RadioMetadata>)
}

export function artworkUrl(path: string) {
    const mediaBaseUrl = "https://myradio24.org"
    return `${mediaBaseUrl}/${path}`
}

export function getRadioStream(radioId: string) {
    const audioSourceUrl = `https://myradio24.org/${radioId}`
    return new Audio(audioSourceUrl)
}
