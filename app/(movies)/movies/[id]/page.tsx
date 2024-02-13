import { URL } from "../../../(home)/page";

type Props = {
  params: {
    id: string;
  };
};

async function getMovie(id: string) {
  console.log(`Fetching movies: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(`${URL}/${id}`);
  return response.json();
}

async function getVideos(id: string) {
  console.log(`Fetching videos: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(`${URL}/${id}/videos`);
  return response.json();
}

export default async function Page({ params: { id } }: Props) {
  // 지금 상태에서는 waterfall이 일어나고 있어서 두번째 함수가 첫번째 함수가 끝나야 실행됨
  // console.log("start fetching");
  // const movie = await getMovie(id);
  // const videos = await getVideos(id);
  // console.log("end fetching");

  // 지금 상태에서는 병렬적으로 데이터를 갖고오고 있어서 위에보다 좋음
  console.log("start fetching");
  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  console.log("end fetching");
  return <h1>Movie is {movie.title}</h1>;
}
