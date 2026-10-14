export const REPOSITORY =
  "https://github.com/shashikanth-gs/http2xx.io-desing-system"
export const MAINTAINER = {
  name: "Shashi Kanth G S",
  website: "https://shashikanth.me",
  github: "https://github.com/shashikanth-gs",
} as const
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
export const asset = (path: string) => `${basePath}${path}`
