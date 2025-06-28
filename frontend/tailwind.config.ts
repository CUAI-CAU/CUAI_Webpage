import type { Config } from 'tailwindcss'

const config: Config = {
    theme: {
        extend: {
            screens: {
                '2xl': '1536px',
                '3xl': '1920px',
            },
        },
    },
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
}
export default config
