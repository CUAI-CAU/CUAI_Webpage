/**
 * 애니메이션이 적용된 기본 스켈레톤 박스 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.sizeConfig - TailwindCSS 클래스 문자열로, 박스의 너비와 높이 등의 크기를 지정
 * @param {string} props.radiusConfing - TailwindCSS 클래스 문자열로, 박스의 테두리 반경(border-radius)을 지정
 *
 * @returns {JSX.Element} 크기와 애니메이션이 적용된 스켈레톤 박스
 */
export const BaseSkeleton = ({
    sizeConfig,
    radiusConfig = 'rounded-xl',
}: {
    sizeConfig: string
    radiusConfig?: string
}) => {
    return (
        <div
            className={`
                ${sizeConfig} ${radiusConfig} bg-[length:200%_100%]
                bg-gradient-to-r from-[#ffffff0d] via-[#ffffff1a] to-[#ffffff0d] motion-safe:animate-[var(--animate-wave)]
            `}
        />
    )
}
