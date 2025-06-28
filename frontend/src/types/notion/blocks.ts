import { DoneBy, File } from './common'

export type PageParent = {
    type: 'page_id'
    page_id: string
}

export type Image = {
    caption: (string | null)[]
    type: string
    file: File
}

export type Video = {
    caption: (string | null)[]
    type: string
    file: File
}

export type Link = {
    url: string
}

export type Text = {
    content: string
    link: Link | null
}

export type Annotations = {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
}

export type RichText = {
    type: 'text'
    text: Text
    annotations: Annotations
    plain_text: string
    href: string | null
}

export type Paragraph = {
    rich_text: RichText[]
    color: string
}

export type Icon = {
    type: 'emoji'
    emoji: string
}

export type Callout = {
    rich_text: RichText[]
    icon?: Icon
    color: string
}

type CommonBlock = {
    object: 'block'
    id: string
    parent: PageParent
    created_time: string
    last_edited_time: string
    created_by: DoneBy
    last_edited_by: DoneBy
    has_children: boolean
    archived: boolean
    in_trash: boolean
}

export type BlockView = ParagraphBlockView | CalloutBlockView | ImageBlockView | VideoBlockView | DividerBlockView

export type ParagraphBlockView = CommonBlock & {
    type: 'paragraph'
    paragraph: Paragraph
}

export type CalloutBlockView = CommonBlock & {
    type: 'callout'
    callout: Callout
}

export type ImageBlockView = CommonBlock & {
    type: 'image'
    image: Image
}

export type VideoBlockView = CommonBlock & {
    type: 'video'
    video: Video
}

export type DividerBlockView = CommonBlock & {
    type: 'divider'
    divider: null
}
