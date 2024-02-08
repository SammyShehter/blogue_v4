import type {Config} from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            typography: (theme: any) => ({
                DEFAULT: {
                    css: {
                        pre: {
                            // backgroundColor: theme("colors.gray.100"),
                            backgroundColor: "#0d1117",
                        },
                        // ":root": {
                        //     "--tw-prose-pre-bg": theme("colors.gray.100"),
                        // },
                    },
                },
                dark: {
                    css: {
                        pre: {
                            backgroundColor: theme("colors.gray.800"),
                        },
                        // ":root": {
                        //     "--tw-prose-pre-bg": theme("colors.gray.800"),
                        // },
                    },
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/typography")],
}
export default config
