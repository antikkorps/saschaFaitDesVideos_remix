import { ProjectData, ProjectStats, VideoPack } from "./VideoPackCard"
interface VideoPackGridProps {
  projects: ProjectData[]
}

const VideoPackGrid = ({ projects }: VideoPackGridProps): JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {projects.map((project) => (
        <VideoPack key={project.id} project={project} />
      ))}
    </div>
  )
}

export { VideoPack, VideoPackGrid }
export type { ProjectData, ProjectStats }
