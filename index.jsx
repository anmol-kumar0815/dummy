import React, { useState, useEffect } from "react";

import { Search, Down, Plus } from "neetoicons";
import {
  PageLoader,
  Button,
  Typography,
  Input,
  Dropdown,
  Checkbox,
  Table,
} from "neetoui";

import articlesApi from "apis/articles";

import SideBar from "./SideBar";
import { buildArticleTableColumnData } from "./utils";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [searchedArticleTitle, setSearchedArticleTitle] = useState("");
  const { Menu, MenuItem } = Dropdown;
  const [articles, setArticles] = useState([]);
  const [displayColumn, setDisplayColumn] = useState({
    title: true,
    date: true,
    author: true,
    name: true,
    status: true,
  });

  const handleDisplayColumn = e => {
    setDisplayColumn(preDislayColumnState => ({
      ...preDislayColumnState,
      [e.target.id]: !preDislayColumnState[e.target.id],
    }));
  };

  const filterAllArticlesAsPerSearchedArticleTitle = (
    allArticles,
    searchedArticleTitle
  ) =>
    allArticles.filter(article =>
      article.title
        .toLowerCase()
        .includes(searchedArticleTitle.toLowerCase().trim())
    );

  const fetchArticles = async () => {
    logger.info("inside fetchArticles");
    try {
      const {
        data: { articles },
      } = await articlesApi.list();
      logger.info(articles);
      const filteredArticles = filterAllArticlesAsPerSearchedArticleTitle(
        articles,
        searchedArticleTitle
      );
      setArticles(filteredArticles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [searchedArticleTitle]);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="py-6 pl-4 pr-6">
        <div className="flex gap-x-3">
          <Input
            className="ml-64"
            placeholder="Search article title"
            prefix={<Search />}
            value={searchedArticleTitle}
            onChange={e => setSearchedArticleTitle(e.target.value)}
          />
          <Dropdown buttonStyle="secondary" icon={Down} label="Columns">
            <Menu>
              <MenuItem.Button>
                <Checkbox
                  checked={displayColumn["title"]}
                  id="title"
                  label="Title"
                  onChange={handleDisplayColumn}
                />
              </MenuItem.Button>
              <MenuItem.Button>
                <Checkbox
                  checked={displayColumn["date"]}
                  id="date"
                  label="Date"
                  onChange={handleDisplayColumn}
                />
              </MenuItem.Button>
              <MenuItem.Button>
                <Checkbox
                  checked={displayColumn["author"]}
                  id="author"
                  label="Author"
                  onChange={handleDisplayColumn}
                />
              </MenuItem.Button>
              <MenuItem.Button>
                <Checkbox
                  checked={displayColumn["name"]}
                  id="name"
                  label="Category"
                  onChange={handleDisplayColumn}
                />
              </MenuItem.Button>
              <MenuItem.Button>
                <Checkbox
                  checked={displayColumn["status"]}
                  id="status"
                  label="Status"
                  onChange={handleDisplayColumn}
                />
              </MenuItem.Button>
            </Menu>
          </Dropdown>
          <Button
            icon={Plus}
            label="Add New Article"
            style="primary"
            to="/create"
          />
        </div>
        <Typography className="mt-6" style="h4">
          67 Articles
        </Typography>
        <Table
          className="mt-6"
          columnData={buildArticleTableColumnData(displayColumn)}
          rowData={articles}
        />
      </div>
    </div>
  );
};
export default Articles;
