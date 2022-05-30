import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Movie } from "../../components";

const People: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(undefined);

  const getPeople = () => {
    fetch(`https://swapi.dev/api/people/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })

      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (id) getPeople();
  }, [id]);

  const list = [
    {
      key: "Gender",
      value: data?.gender,
    },
    {
      key: "Birth year",
      value: data?.birth_year,
    },
    {
      key: "Eye color",
      value: data?.eye_color,
    },
    {
      key: "Hair color",
      value: data?.hair_color,
    },
    {
      key: "Skin color",
      value: data?.skin_color,
    },
    {
      key: "Height",
      value: data?.height,
    },
    {
      key: "Mass",
      value: data?.mass,
    },
  ];

  return (
    <>
      <div className='flex md:items-center  overflow-y-auto bg-gray-200 justify-center h-screen'>
        <div className='w-full p-2 md:w-1/2'>
          <button
            onClick={() => router.push("/")}
            className='py-2 mb-2 text-white px-2 font-bold bg-blue-500 rounded-md'
          >
            Home
          </button>
          {data && (
            <div className='bg-white shadow-md p-8 rounded-xl text-left'>
              <div>
                <span className='font-bold text-xl block '>{data?.name}</span>
                <div className='grid grid-cols-1 mt-10 md:grid-cols-3 gap-4  '>
                  {list.map((item, index) => {
                    return (
                      <div key={index}>
                        <span className='block text-xs  font-extrabold'>
                          {item.key}
                        </span>
                        <span className='block text-lg '>{item.value}</span>
                      </div>
                    );
                  })}
                </div>
                <br />
                <div className='border rounded-md p-2'>
                  <span className='block font-extrabold '>Movies</span>
                  <span className='block text-lg '>
                    <ol className='list-decimal ml-5 mt-2'>
                      {data?.films?.map((itm, idx) => {
                        return (
                          <li key={itm}>
                            <Movie url={itm} />
                          </li>
                        );
                      })}
                    </ol>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default People;
