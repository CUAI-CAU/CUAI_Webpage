import { ColoredTag } from '@/components/notion'
import { MembersNotionPage } from '@/types/notion/properties'
import { UserRound } from 'lucide-react'

export const MemberCard = ({ member }: { member: MembersNotionPage }) => {
    return (
        <div className="bg-slate-800/90 rounded-2xl w-72 h-56 p-5 space-y-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
            <div className="text-3xl">
                <UserRound />
            </div>
            <div className="flex flex-row items-end gap-2">
                <div className="text-xl font-semibold">{member.properties.member_name.title[0].plain_text}</div>
                <p className="text-slate-400 text-sm whitespace-nowrap">({member.properties.major.select.name})</p>
            </div>
            <div className="space-y-2">
                <p className="text-slate-400 text-sm">관심분야</p>
                <div className="flex flex-wrap gap-2">
                    {member.properties.interests.multi_select
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((item, i) => (
                            <ColoredTag key={i} text={item.name} color="gray" />
                        ))}
                </div>
            </div>
        </div>
    )
}
