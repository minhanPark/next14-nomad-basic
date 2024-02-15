import { Suspense } from "react";
import { URL } from "../../../(home)/page";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props) {
  const movie = await getMovie(id);

  return {
    title: movie.title,
  };
}

export default async function Page({ params: { id } }: Props) {
  // 지금 상태에서는 waterfall이 일어나고 있어서 두번째 함수가 첫번째 함수가 끝나야 실행됨
  // console.log("start fetching");
  // const movie = await getMovie(id);
  // const videos = await getVideos(id);
  // console.log("end fetching");

  // 지금 상태에서는 병렬적으로 데이터를 갖고오고 있어서 위에보다 좋음

  return (
    <div className="">
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
