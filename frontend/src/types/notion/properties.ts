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
    conference: SelectProperty
    participants: MultiSelectProperty
    project_name: TitleProperty
}

export type AwardProperties = {
    time_period: SelectProperty
    awards: TitleProperty
}

export type MemberProperties = {
    interests: MultiSelectProperty
    email_address: CommonProperty & { email: string }
    major: SelectProperty
    member_name: TitleProperty
}

export type IntroductionProperties = {
    label: TitleProperty
    info: RichTextProperty
    description: RichTextProperty
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
export type IntroductionNotionPage = CommonNotionPage<IntroductionProperties>
