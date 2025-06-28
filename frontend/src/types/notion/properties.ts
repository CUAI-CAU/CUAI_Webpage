import { Cover, DoneBy, Icon, Tag } from './common'

type CommonProperty = {
    id: string
    type: string
}

export type DatabaseParent = {
    type: string
    database_id: string
}

export type Title = {
    type: string
    text: {
        content: string
        link: null
    }
    annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
    }
    plain_text: string
    href: null
}

export type TitleProperty = CommonProperty & {
    title: Title[]
}

export type SelectProperty = CommonProperty & {
    select: Tag
}

export type MultiSelectProperty = CommonProperty & {
    multi_select: Tag[]
}

export type Properties = {
    ['컨퍼런스']: SelectProperty
    ['참여자']: MultiSelectProperty
    ['이름']: TitleProperty
    url: string
    public_url: null
}

export type ProjectProperty = {
    object: 'page'
    id: string
    created_time: string
    last_edited_time: string
    created_by: DoneBy
    last_edited_by: DoneBy
    cover: Cover | null
    icon: Icon | null
    parent: DatabaseParent
    archived: boolean
    in_trash: boolean
    properties: Properties
}
