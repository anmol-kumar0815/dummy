import * as yup from "yup";

export const ARTICLE_TABLE_COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "20%",
  },
  {
    title: "Date",
    dataIndex: "updated_at",
    key: "updated_at",
    width: "10%",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    width: "10%",
  },
  {
    title: "Category",
    dataIndex: "name",
    key: "name",
    width: "10%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "10%",
  },
];
export const ARTICLE_TABLE_ROW_DATA = [
  {
    id: 1,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 2,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 3,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 4,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 5,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 6,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 7,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 8,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 9,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 10,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
  {
    id: 11,
    title: "Welcome to Sribble",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting started",
    status: "draft",
  },
];
export const CREATE_ARTICLE_INITIAL_FORM_DATA = {
  title: "",
  category: null,
  body: "",
  status: "Draft",
};

export const CREATE_ARTICLE_FORM_VALIDATION_SCHEMA = CATEGORIES_OPTIONS =>
  yup.object().shape({
    title: yup.string().required("Article title cannot be empty"),
    body: yup.string().required("Article body cannot be empty"),
    category_id: yup
      .object()
      .nullable()
      .shape({
        label: yup
          .string()
          .oneOf(
            CATEGORIES_OPTIONS.map(categoryOption => categoryOption.label)
          ),
        value: yup
          .number()
          .oneOf(
            CATEGORIES_OPTIONS.map(categoryOption => categoryOption.value)
          ),
      })
      .required("Article category cannot be empty"),
  });
