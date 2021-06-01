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
      url: `${faker.image.nature(400, 300)}?random=${Math.round(
        Math.random() * 1000
      )}`,
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
        id: faker.datatype.uuid(),
        stock: Math.floor(Math.random() * 10),
        price: Number.parseFloat(faker.commerce.price()),
        shipping: faker.datatype.boolean(),
        colors: [
          ...new Set(
            Array.from({ length: Math.ceil(Math.random() * 3) + 1 }, () =>
              faker.commerce.color()
            )
          ),
        ],
        category: category,
        images: images,
        reviews: Math.floor(Math.random() * 1000),
        stars: parseFloat(Math.floor(Math.random() * 5) + 1).toFixed(1),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        company: category.company,
        createdAt: Date.now(),
        updatedAt: Date.now(),

        featured: faker.datatype.boolean(),
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
