import { Cover, DoneBy, Icon, Tag } from './common'

type CommonProperty = {
    id: string
    type: string
}

export type DatabaseParent = {
    type: string
    database_id: string
}

export type RichText = {
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
    title: RichText[]
}

export type RichTextProperty = CommonProperty & {
    rich_text: RichText[]
}

export type SelectProperty = CommonProperty & {
    select: Tag
}

export type MultiSelectProperty = CommonProperty & {
    multi_select: Tag[]
}

export type ProjectProperties = {
    ['컨퍼런스']: SelectProperty
    ['참여자']: MultiSelectProperty
    ['이름']: TitleProperty
}

export type AwardProperties = {
    ['선택']: SelectProperty
    ['이름']: TitleProperty
}

export type MemberProperties = {
    ['전화번호']: CommonProperty & { phone_number: string }
    ['관심 분야']: MultiSelectProperty
    ['이메일']: CommonProperty & { email: string }
    ['학번']: RichTextProperty
    ['전공']: SelectProperty
    ['이름']: TitleProperty
}

export type CommonNotionPage<T> = {
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
    properties: T
    url: string
    public_url: string | null
}

export type ProjectsNotionPage = CommonNotionPage<ProjectProperties>
export type AwardsNotionPage = CommonNotionPage<AwardProperties>
export type MembersNotionPage = CommonNotionPage<MemberProperties>
