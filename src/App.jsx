// src/components/ImageSlider.js
import { useEffect, useState } from "react";
import { addData, initDb } from "./cache";
import { getNextDataItems } from "./data/data";


const App = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [db, setDb] = useState(null);

  useEffect(() => {
    initializeDB().then((database) => {
      setDb(database);
      fetchData(database);
    });
  }, []);

  const initializeDB = () => {
    return initDb();
  };

  const fetchData = async (database) => {
    const newItems = await getNextDataItems(10);
    setImages((prevImages) => [...prevImages, ...newItems]);

    // Cache new items in IndexedDB
    newItems.forEach(async (item) => {
      await addData(database, item);
    });
    
  };

  const handleNext = async () => {
    if (index % 10 == 0) {
      fetchData(db);
    }
    setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleChangePicture = (id) => {
    if (index >= images.length - 5) {
      fetchData(db);
    }
    setIndex(id - 1);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start py-3">
      <div className="flex items-center gap-2 ">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="size-12 rounded-full bg-zinc-200 px-4 py-2 text-white hover:bg-zinc-400 disabled:bg-zinc-200 disabled:opacity-75  "
        >
          <img src="/assets/icon-left.svg" />
        </button>
          <img
            key={index}
            src={images[index]?.url}
            alt="slider-img"
            className="object-cover md:h-fit"
          />
      
        <button
          onClick={handleNext}
          className="size-12 rounded-full bg-zinc-200 px-4 py-2 text-white hover:bg-zinc-400 disabled:bg-zinc-200 disabled:opacity-75"
          disabled={index == images.length - 5 ? true : false}
        >
          <img src="/assets/icon-right.svg" />
        </button>
      </div>
      <div className="flex py-3">
        <div className="flex w-full gap-1 overflow-hidden">
          {images.slice(index, index + 5).map((image,idx) => {
            return (
              <img
                key={idx}
                src={image.url}
                alt="slider-img"
                className="h-20 w-1/5 rounded-lg object-cover focus:border-2 focus:border-blue-500"
                onClick={() => handleChangePicture(image.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
