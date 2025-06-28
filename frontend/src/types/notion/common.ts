export type Url = {
    id: string
    type: 'url'
    url: string | null
}

export type File = {
    url: string
    expiry_time: string
}

export type DoneBy = {
    object: string
    id: string
}

export type Tag = {
    id: string
    name: string
    color: string
}

export type Cover = {
    type: string
    file: File
}

export type Icon = {
    type: string
    emoji: string
}
