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

// DB Properties

export type ProjectProperties = {
    project_name: TitleProperty
    conference: SelectProperty
    participants: MultiSelectProperty
    prize: RichTextProperty
}

export type AwardProperties = {
    time_period: SelectProperty
    awards: TitleProperty
}

export type MemberProperties = {
    member_name: TitleProperty
    year: MultiSelectProperty
    major: SelectProperty
    interests: MultiSelectProperty
    track: SelectProperty
}

export type IntroductionProperties = {
    label: TitleProperty
    info: RichTextProperty
    description: RichTextProperty
}

export type CurriculumProperties = {
    label: TitleProperty
    content: RichTextProperty
}

export type GpuProperties = {
    label: TitleProperty
    content: RichTextProperty
}

export type FaqProperties = {
    question: TitleProperty
    answer: RichTextProperty
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

// DB Types

export type ProjectsNotionPage = CommonNotionPage<ProjectProperties>
export type AwardsNotionPage = CommonNotionPage<AwardProperties>
export type MembersNotionPage = CommonNotionPage<MemberProperties>
export type IntroductionNotionPage = CommonNotionPage<IntroductionProperties>
export type CurriculumNotionPage = CommonNotionPage<CurriculumProperties>
export type GpuNotionPage = CommonNotionPage<GpuProperties>
export type FaqNotionPage = CommonNotionPage<FaqProperties>
