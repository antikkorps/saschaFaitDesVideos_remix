export interface Video {
  id: string
  title: string
  thumbnailUrl: string
  description: string
  date: string
  duration: string
  youtubeUrl: string
  views: number
  size?: "small" | "medium" | "large"
  highlight?: boolean
}
