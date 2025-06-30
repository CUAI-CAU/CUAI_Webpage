const colorMap: Record<string, string> = {
    default: 'bg-slate-100 text-slate-900',
    red: 'bg-red-200 text-red-900',
    orange: 'bg-orange-200 text-orange-900',
    yellow: 'bg-yellow-100 text-yellow-900',
    green: 'bg-green-200 text-green-900',
    blue: 'bg-blue-200 text-blue-900',
    purple: 'bg-purple-300 text-purple-900',
    pink: 'bg-pink-200 text-pink-900',
    brown: 'bg-[#dbc4ba] text-[#5a3424]',
    gray: 'bg-gray-300 text-gray-900',
}

export const ColoredTag = ({ text, color = 'default' }: { text: string | undefined; color?: string }) => {
    const bgClass = colorMap[color]

    return <p className={`w-fit px-1 rounded-md font-medium whitespace-nowrap ${bgClass}`}>{text}</p>
}
