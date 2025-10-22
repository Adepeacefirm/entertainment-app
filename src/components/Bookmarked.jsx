import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Bookmarked = () => {
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
    if (item.isBookmarked) {
      return item.title.toLowerCase().includes(search.toLowerCase());
    }
  });
  return (
    <motion.main
      key={"bookmark"}
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
          placeholder="Search for bookmarked movies and series"
          className="placeholder-white/50 placeholder:tracking-widest w-full py-3 cursor-pointer caret-red500 focus:outline-none border-b border-b-transparent focus:border-white/40   pl-10"
        />
      </div>
      {search ? (
        <div>
          <h1 className="mb-5 text-white/80 sm:text-2xl tracking-widest">
            Found {filteredResult.length} results for '{search}'
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
        <section>
          <section>
            <h1 className="mb-7 text-white text-xl">Bookmarked Movies</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {data.map(
                (item, index) =>
                  item.isBookmarked &&
                  item.category === "Movie" && (
                    <div key={index} className="relative cursor-pointer">
                      <div>
                        <img
                          className="rounded-2xl"
                          src={item.thumbnail?.regular?.small}
                          alt={item.title + index}
                        />
                      </div>
                      <div className="absolute top-2 right-3 bg-[hsla(223,30%,9%,0.5)] w-8 aspect-square rounded-full flex justify-center items-center">
                        <svg
                          className="size-4 text-white"
                          viewBox="0 0 12 14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
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
                  )
              )}
            </div>
          </section>
          <section>
            <h2 className="my-7 text-white text-xl">Bookmarked TV Series</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {data.map(
                (item, index) =>
                  item.isBookmarked &&
                  item.category === "TV Series" && (
                    <div key={index} className="relative">
                      <div>
                        <img
                          className="rounded-2xl"
                          src={item.thumbnail?.regular?.small}
                          alt={item.title + index}
                        />
                      </div>
                      <div className="absolute top-2 right-3 bg-[hsla(223,30%,9%,0.5)] w-8 aspect-square rounded-full flex justify-center items-center">
                        <svg
                          className="size-4 text-white"
                          viewBox="0 0 12 14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
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
                  )
              )}
            </div>
          </section>
        </section>
      )}
    </motion.main>
  );
};

export default Bookmarked;
