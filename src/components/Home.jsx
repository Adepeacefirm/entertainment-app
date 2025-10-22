import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    try {
      const res = await fetch("/data.json");
      if (!res) {
        throw new Error("Response not found");
      }
      const info = await res.json();
      setData(info);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredResult = data.filter((item) => {
    if (search === "") {
      return true;
    }
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <motion.main
      key={"home"}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-[90%] mx-auto lg:mx-0 lg:ml-auto lg:mr-5 mb-10"
    >
      <div className="flex relative items-center gap-5 text-white text-sm sm:text-lg my-5 lg:my-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 absolute left-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for movies or TV series"
          className="placeholder-white/50 placeholder:tracking-widest w-full py-3 cursor-pointer caret-red500 focus:outline-none border-b border-b-transparent focus:border-white/40   pl-10"
        />
      </div>
      {search ? (
        <div>
          <h1 className="mb-5 text-white/80 sm:text-2xl tracking-widest">
            Found {filteredResult.length} results for &apos;{search}&apos;
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredResult.map((item, index) => (
              <div key={index} className="relative cursor-pointer">
                <div>
                  <img
                    className="rounded-2xl"
                    src={item.thumbnail?.regular?.small}
                    alt={item.title + index}
                  />
                </div>
                <div
                  className={`absolute top-2 right-3 bg-[hsla(223,30%,9%,0.5)] w-8 aspect-square rounded-full flex justify-center items-center ${
                    item.isBookmarked ? "text-white" : "text-transparent"
                  }`}
                >
                  <svg
                    className="size-4"
                    viewBox="0 0 12 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                      stroke="#FFF"
                      strokeWidth="1.5"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex items-center text-xs text-white/50 gap-1 mt-2">
                  <p>{item.year}</p>
                  <div className="w-1 aspect-square rounded-full bg-white/40"></div>
                  <div>
                    <svg
                      width="12"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                        fill="currentColor"
                        opacity=".75"
                      />
                    </svg>
                  </div>
                  <p>{item.category}</p>
                  <div className="w-1 aspect-square rounded-full bg-white/40"></div>
                  <p>{item.rating}</p>
                </div>
                <p className="text-white mt-1 text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <section>
            <h1 className="text-white text-2xl">Trending</h1>
            <div className="overflow-x-auto scroll-smooth my-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex my-3 gap-3">
                {data.map((item, index) => (
                  <div
                    className="shrink-0 inline-flex cursor-pointer"
                    key={index}
                  >
                    {item.thumbnail?.trending?.small && (
                      <div className="w-56 sm:w-96 rounded-2xl relative z-10">
                        <img
                          className="w-full rounded-2xl"
                          src={item.thumbnail?.trending?.small}
                          alt={item.title + index}
                        />
                        <div
                          className={`absolute top-2 right-3 bg-[hsl(0,0%,39%)] w-8 aspect-square rounded-full flex justify-center items-center ${
                            item.isBookmarked
                              ? "text-white"
                              : "text-transparent"
                          }`}
                        >
                          <svg
                            className="size-4"
                            viewBox="0 0 12 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                              stroke="#FFF"
                              strokeWidth="1.5"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="flex items-center gap-1 text-xs absolute bottom-8 left-5 text-white/70 z-50">
                          <p>{item.year}</p>
                          <div className="w-1 aspect-square rounded-full bg-white/40"></div>
                          <div>
                            {item.category === "Movie" ? (
                              <svg
                                width="12"
                                height="12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                                  fill="currentColor"
                                  opacity=".75"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="12"
                                height="12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z"
                                  fill="currentColor"
                                  opacity=".75"
                                />
                              </svg>
                            )}
                          </div>
                          <p>{item.category}</p>
                          <div className="w-1 aspect-square rounded-full bg-white/40"></div>
                          <p>{item.rating}</p>
                        </div>
                        <div className="absolute bottom-2 left-5 ">
                          <p className="text-white text-sm font-medium bg-black]">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section>
            <h2 className="my-5 text-xl text-white">Recommended for you</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {data.map(
                (item, index) =>
                  !item.isTrending && (
                    <div key={index} className="relative">
                      <div>
                        <img
                          className="rounded-2xl"
                          src={item.thumbnail?.regular?.small}
                          alt={item.title + index}
                        />
                      </div>
                      <div
                        className={`absolute top-2 right-3 bg-[hsla(223,30%,9%,0.5)] w-8 aspect-square rounded-full flex justify-center items-center ${
                          item.isBookmarked ? "text-white" : "text-transparent"
                        }`}
                      >
                        <svg
                          className="size-4"
                          viewBox="0 0 12 14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                            stroke="#FFF"
                            strokeWidth="1.5"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="flex items-center text-xs text-white/50 gap-1 mt-2">
                        <p>{item.year}</p>
                        <div className="w-1 aspect-square rounded-full bg-white/40"></div>
                        <div>
                          {item.category === "Movie" ? (
                            <svg
                              width="12"
                              height="12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                                fill="currentColor"
                                opacity=".75"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="12"
                              height="12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z"
                                fill="currentColor"
                                opacity=".75"
                              />
                            </svg>
                          )}
                        </div>
                        <p>{item.category}</p>
                        <div className="w-1 aspect-square rounded-full bg-white/40"></div>
                        <p>{item.rating}</p>
                      </div>
                      <p className="text-white mt-1 text-sm sm:text-base">
                        {item.title}
                      </p>
                    </div>
                  )
              )}
            </div>
          </section>
        </div>
      )}
    </motion.main>
  );
};

export default Home;
