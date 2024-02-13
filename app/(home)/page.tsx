import Link from "next/link";

export const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

export const metadata = {
  title: "Home",
};

async function getMovies() {
  // 페이지가 켜지기까지 5초의 로딩시간을 준다
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 로딩 페이지를 만들지 않아서 느려지는 것을 눈으로 확인 가능했음.
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function Page() {
  const movies = await getMovies();
  return (
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}
