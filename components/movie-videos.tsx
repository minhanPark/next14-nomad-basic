import styles from "../styles/movie-videos.module.css";
import { URL } from "../app/(home)/page";

async function getVideos(id: string) {
  // throw new Error("Failed to fetch videos");
  const response = await fetch(`${URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return (
    <div className={styles.container}>
      {videos.map((v) => (
        <iframe
          key={v.id}
          src={`https://youtube.com/embed/${v.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={v.name}
        />
      ))}
    </div>
  );
}
