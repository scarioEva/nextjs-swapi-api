import { useEffect, useState } from "react";
import { Pagination } from "../../components";
import { useRouter } from "next/router";

export const HomePage = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getList = () => {
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data?.results);
        setTotalPage(Math.ceil(data?.count / 10));
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getList();
  }, [page]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("favorites")) || [];
    localStorage.setItem("favorites", JSON.stringify(localData));
  }, []);

  const getUserId = (url) => {
    let id = url.replace("https://swapi.dev/api/people/", "");
    return id.replace("/", "");
  };

  const toggleFavorite = (id) => {
    const favoriteList = JSON.parse(localStorage.getItem("favorites"));
    let found = favoriteList.find((item) => item === id);
    if (found) {
      let data = favoriteList;
      let index = data.findIndex((item) => item === id);
      data.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favoriteList));
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favoriteList, id]));
    }
    getList();
  };

  return (
    <>
      <div className='flex md:items-center overflow-y-auto bg-gray-200 justify-center h-screen'>
        <div className='w-full p-2 md:w-1/2'>
          <div className='text-center'>
            <h1 className='mb-2 font-bold text-2xl'>Peoples</h1>
          </div>
          <div className='bg-white shadow-md p-8 rounded-xl text-left'>
            <div className='flex flex-col  gap-2 divide-y-2'>
              {list.map((item) => {
                return (
                  <div
                    className='flex pt-2  justify-between gap-2'
                    key={getUserId(item.url)}
                  >
                    <div className='text-left '>
                      <button
                        onClick={() =>
                          router.push(`people/${getUserId(item.url)}`)
                        }
                      >
                        {item.name}
                      </button>
                    </div>
                    <div className='md:pl-40'>
                      <button
                        className='h-5 w-5'
                        onClick={() => toggleFavorite(getUserId(item.url))}
                      >
                        <img
                          src={
                            JSON.parse(localStorage.getItem("favorites")).find(
                              (itm) => itm === getUserId(item.url)
                            ) === getUserId(item.url)
                              ? "heart-fill.svg"
                              : "heart.svg"
                          }
                          className='w-full h-full'
                          alt='favorite-icon'
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Pagination
            totalPage={totalPage}
            currentPage={page}
            next={() => setPage(page + 1)}
            previous={() => setPage(page - 1)}
          />
        </div>
      </div>
    </>
  );
};
