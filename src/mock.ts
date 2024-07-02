interface IRecord {
  amount: number;
  createdBy: string;
  detail: string;
  createdAt: Date;
}

interface IAccount {
  id: number;
  name: string;
  balance: number;
  records: IRecord[];
}

export const accounts: IAccount[] = [
  {
    id: 100,
    name: "Steve",
    balance: 5235,
    records: [
      {
        amount: -331,
        createdBy: "Alex",
        detail: "project",
        createdAt: new Date("2023-05-17"),
      },
      {
        amount: -3032,
        createdBy: "Alex",
        detail: "exam",
        createdAt: new Date("2023-05-09"),
      },
      {
        amount: -4740,
        createdBy: "John",
        detail: "exam",
        createdAt: new Date("2023-05-15"),
      },
      {
        amount: 2302,
        createdBy: "Alex",
        detail: "hw",
        createdAt: new Date("2023-05-31"),
      },
      {
        amount: -4146,
        createdBy: "John",
        detail: "exam",
        createdAt: new Date("2023-02-04"),
      },
      {
        amount: -1753,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-02-05"),
      },
      {
        amount: 16935,
        createdBy: "Alex",
        detail: "hw",
        createdAt: new Date("2023-03-07"),
      },
    ],
  },
  {
    id: 101,
    name: "Bob",
    balance: 8966,
    records: [
      {
        amount: -4244,
        createdBy: "Alex",
        detail: "exam",
        createdAt: new Date("2023-08-20"),
      },
      {
        amount: 7196,
        createdBy: "Sally",
        detail: "project",
        createdAt: new Date("2023-03-20"),
      },
      {
        amount: 6014,
        createdBy: "Sally",
        detail: "project",
        createdAt: new Date("2023-09-17"),
      },
    ],
  },
  {
    id: 102,
    name: "Rogan",
    balance: 3368,
    records: [
      {
        amount: 2200,
        createdBy: "Sally",
        detail: "project",
        createdAt: new Date("2023-10-11"),
      },
      {
        amount: 1717,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-07-22"),
      },
      {
        amount: 1956,
        createdBy: "Alex",
        detail: "project",
        createdAt: new Date("2023-10-28"),
      },
      {
        amount: 349,
        createdBy: "Alex",
        detail: "hw",
        createdAt: new Date("2023-05-22"),
      },
      {
        amount: -2854,
        createdBy: "John",
        detail: "exam",
        createdAt: new Date("2023-06-03"),
      },
    ],
  },
  {
    id: 103,
    name: "Jeremy",
    balance: 6214,
    records: [
      {
        amount: 2755,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-01-19"),
      },
      {
        amount: 5022,
        createdBy: "Alex",
        detail: "hw",
        createdAt: new Date("2023-05-25"),
      },
      {
        amount: -4472,
        createdBy: "Sally",
        detail: "exam",
        createdAt: new Date("2023-07-01"),
      },
      {
        amount: 2909,
        createdBy: "Alex",
        detail: "exam",
        createdAt: new Date("2023-11-22"),
      },
    ],
  },
  {
    id: 104,
    name: "William",
    balance: 7778,
    records: [
      {
        amount: 2289,
        createdBy: "Sally",
        detail: "hw",
        createdAt: new Date("2023-04-13"),
      },
      {
        amount: 6533,
        createdBy: "Alex",
        detail: "exam",
        createdAt: new Date("2023-06-07"),
      },
      {
        amount: -1044,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-10-03"),
      },
    ],
  },
  {
    id: 105,
    name: "Lisa",
    balance: 1198,
    records: [
      {
        amount: -1414,
        createdBy: "Sally",
        detail: "exam",
        createdAt: new Date("2023-03-11"),
      },
      {
        amount: -3036,
        createdBy: "Sally",
        detail: "exam",
        createdAt: new Date("2023-01-23"),
      },
      {
        amount: 6648,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-10-12"),
      },
    ],
  },
  {
    id: 106,
    name: "Morgan",
    balance: 8442,
    records: [
      {
        amount: -2759,
        createdBy: "Alex",
        detail: "hw",
        createdAt: new Date("2023-07-23"),
      },
      {
        amount: -1952,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-08-15"),
      },
      {
        amount: 2172,
        createdBy: "Alex",
        detail: "exam",
        createdAt: new Date("2023-10-14"),
      },
      {
        amount: 4570,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-04-29"),
      },
      {
        amount: 4411,
        createdBy: "Alex",
        detail: "project",
        createdAt: new Date("2023-07-12"),
      },
    ],
  },
  {
    id: 107,
    name: "Jun",
    balance: 6873,
    records: [
      {
        amount: -2176,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-03-03"),
      },
      {
        amount: -2346,
        createdBy: "Alex",
        detail: "hw",
        createdAt: new Date("2023-06-30"),
      },
      {
        amount: 5781,
        createdBy: "Sally",
        detail: "project",
        createdAt: new Date("2023-10-21"),
      },
      {
        amount: -4495,
        createdBy: "Sally",
        detail: "exam",
        createdAt: new Date("2023-03-11"),
      },
      {
        amount: 11109,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-11-01"),
      },
    ],
  },
  {
    id: 108,
    name: "Nebula",
    balance: 4766,
    records: [
      {
        amount: 5789,
        createdBy: "Sally",
        detail: "project",
        createdAt: new Date("2023-08-02"),
      },
      {
        amount: -2113,
        createdBy: "Alex",
        detail: "hw",
        createdAt: new Date("2023-05-20"),
      },
      {
        amount: -4738,
        createdBy: "John",
        detail: "exam",
        createdAt: new Date("2023-06-19"),
      },
      {
        amount: 4828,
        createdBy: "Sally",
        detail: "project",
        createdAt: new Date("2023-03-11"),
      },
    ],
  },
  {
    id: 109,
    name: "Spring",
    balance: 2422,
    records: [
      {
        amount: 4612,
        createdBy: "John",
        detail: "hw",
        createdAt: new Date("2023-06-08"),
      },
      {
        amount: 2481,
        createdBy: "Alex",
        detail: "project",
        createdAt: new Date("2023-11-05"),
      },
      {
        amount: -4671,
        createdBy: "John",
        detail: "exam",
        createdAt: new Date("2023-01-11"),
      },
    ],
  },
  {
    id: 110,
    name: "JJ",
    balance: 5884,
    records: [
      {
        amount: 6352,
        createdBy: "Alex",
        detail: "project",
        createdAt: new Date("2023-05-14"),
      },
      {
        amount: -2581,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-01-22"),
      },
      {
        amount: 2113,
        createdBy: "John",
        detail: "exam",
        createdAt: new Date("2023-09-15"),
      },
    ],
  },
  {
    id: 111,
    name: "Morre",
    balance: 2284,
    records: [
      {
        amount: -678,
        createdBy: "Alex",
        detail: "hw",
        createdAt: new Date("2023-03-12"),
      },
      {
        amount: -900,
        createdBy: "Sally",
        detail: "hw",
        createdAt: new Date("2023-09-22"),
      },
      {
        amount: 1056,
        createdBy: "Sally",
        detail: "hw",
        createdAt: new Date("2023-11-30"),
      },
      {
        amount: 2130,
        createdBy: "John",
        detail: "project",
        createdAt: new Date("2023-12-22"),
      },
      {
        amount: 2013,
        createdBy: "Sally",
        detail: "exam",
        createdAt: new Date("2023-02-01"),
      },
      {
        amount: -1337,
        createdBy: "John",
        detail: "exam",
        createdAt: new Date("2023-02-22"),
      },
    ],
  },
];

const sorted = accounts.sort((a, b) => a.balance - b.balance);

export const MrankerSummary = sorted
  .reverse()
  .slice(0, 3)
  .map((account) => {
    const data = {
      id: account.id,
      name: account.name,
      balance: account.balance,
    };
    return data;
  });
export const MdudesSummay = sorted
  .reverse()
  .slice(0, 3)
  .reverse()
  .map((account) => {
    const data = {
      id: account.id,
      name: account.name,
      balance: account.balance,
    };
    return data;
  });

export const MY_ID = 100;

interface IProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

function shuffleProducts(array: IProduct[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const products: IProduct[] = [
  { id: 1, name: "초콜릿", price: 2300, imageUrl: "/images/choco.jpeg" },
  {
    id: 2,
    name: "투명케이스",
    price: 2000,
    imageUrl: "/images/case.jpeg",
  },
  {
    id: 3,
    name: "장난감",
    price: 2000,
    imageUrl: "/images/toy.jpeg",
  },
  { id: 4, name: "사탕", price: 2300, imageUrl: "/images/candy.jpeg" },
];

export const ONLINE_PRODUCTS = shuffleProducts(products);
export const OFFLINE_PRODUCTS = shuffleProducts(products);