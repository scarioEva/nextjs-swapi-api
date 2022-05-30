import { useEffect, useState } from "react";

interface props {
  url: string;
}
export const Movie: React.FC<props> = ({ url }) => {
  const [movieName, setMovieName] = useState("");
  const getMovie = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovieName(data.title);
      })

      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (url) getMovie();
  }, [url]);

  return (
    <>
      <span>{movieName}</span>
    </>
  );
};
