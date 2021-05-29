const faker = require('faker');
const fs = require('fs');

const randomCategoryList = (number) => {
  const categoryList = [];

  Array.from({ length: number }).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      company: faker.company.companyName(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });

  return categoryList;
};

const randomImages = () => {
  const imagesList = [];
  Array.from({ length: 6 }).forEach(() => {
    const image = {
      id: faker.datatype.uuid(),
      url: faker.image.imageUrl(800, 800),
      filename: faker.commerce.productName(),
    };
    imagesList.push(image);
  });
  return imagesList;
};

const images = randomImages();

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts < 1) return;
  const productList = [];

  for (let category of categoryList) {
    for (let i = 0; i < numberOfProducts; i++) {
      productList.push({
        categoryId: category.id,
        company: category.company,
        id: faker.datatype.uuid(),
        stock: Math.floor(Math.random() * 10),
        name: faker.commerce.productName(),
        color: [
          ...new Set(
            Array.from({ length: Math.random() * 3 + 1 }, () =>
              faker.commerce.color()
            )
          ),
        ],
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        images: images,
        shipping: faker.datatype.boolean(),
        featured: faker.datatype.boolean(),
        stars: parseFloat(Math.random() * 5 + 1).toFixed(1),
        reviews: Math.floor(Math.random() * 1000),
      });
    }
  }
  return productList;
};

const categoryList = randomCategoryList(5);
const productList = randomProductList(categoryList, 10);

(() => {
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Ted',
    },
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate data successful');
  });
})();
