export const initDb = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("cached-images", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      createPicturesStore(db); 
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (error) => {
      console.error({ error });
      reject(error);
    };
  });
};

const createPicturesStore = (db) => {
  const storeConfig = { keyPath: "id", autoIncrement: true };
  const objectStore = db.createObjectStore("pictures", storeConfig);
  return objectStore;
};

const getPicturesObjectStore = (db) => {
  const transaction = db.transaction("pictures", "readwrite");
  transaction.onerror = (event) =>
    console.error("Transaction error: ", event.target.error);
  return transaction.objectStore("pictures");
};

export const addData = (db, data) => {
  return new Promise((resolve, reject) => {
    const store = getPicturesObjectStore(db);
    const request = store.add(data);

    request.onsuccess = () => {
      resolve(data);
    };

    request.onerror = (event) => {
      console.error("Add data error: ", event.target.error);
      reject(event.target.error);
    };
  });
};

export const getStoreData = (db) => {
  return new Promise((resolve, reject) => {
    const store = getPicturesObjectStore(db);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error("Get data error: ", event.target.error);
      reject(event.target.error);
    };
  });
};

