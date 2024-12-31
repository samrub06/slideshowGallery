let dataItems = [];
let currentIndex = 0;

// Generate random data
for (let i = 1; i < 100; i++) {
  dataItems.push({
    url: `https://picsum.photos/seed/${i}/200/300`,
    creationDate: new Date(Date.now() - i * 1000 * 60 * 60).toISOString()
  });
}


dataItems.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

export const getNextDataItems = (numberOfItemsToGet) => {
  const start = currentIndex;
  const end = currentIndex + numberOfItemsToGet;
  currentIndex = end;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataItems.slice(start, end));
    }, 500); // Simulate network delay
  });
};
