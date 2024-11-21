import { unstable_flag as flag } from "@vercel/flags/next"

export const enableApplications = flag({
    key: 'applications',
    decide: () => {
        if (process.env.NODE_ENV == "development") return true
        else return false
    }
})