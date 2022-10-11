import React, { useState, useEffect } from "react";

import { Plus, Search, Check } from "neetoicons";
import { Typography, Input, PageLoader } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoriesApi from "apis/categories";

const SideBar = () => {
  const [loading, setLoading] = useState(true);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [showAddNewCategoryInputField, setShowAddNewCategoryInputField] =
    useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleClick = async () => {
    try {
      await categoriesApi.create(newCategory);
    } catch (error) {
      logger.error(error);
    }
  };

  const categoryDataAsPerSearchCategory = categories.filter(
    categoryWithArticleCount =>
      categoryWithArticleCount.name
        .toLowerCase()
        .includes(searchCategory.toLowerCase().trim())
  );

  const fetchCategories = async () => {
    logger.info("inside fetch categories");
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
      logger.info("done with API call");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <MenuBar showMenu="true" title="Articles">
        <MenuBar.Block active count={13} label="All" />
        <MenuBar.Block count={2} label="Draft" />
        <MenuBar.Block count={7} label="Published" />
        <MenuBar.SubTitle
          iconProps={[
            {
              icon: Plus,
              onClick: () =>
                setShowAddNewCategoryInputField(
                  showAddNewCategoryInputField => !showAddNewCategoryInputField
                ),
            },
            {
              icon: Search,
              onClick: () =>
                setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
            },
          ]}
        >
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            CATEGORIES
          </Typography>
        </MenuBar.SubTitle>
        <MenuBar.Search
          collapse={isSearchCollapsed}
          value={searchCategory}
          onChange={e => setSearchCategory(e.target.value)}
          onCollapse={() => setIsSearchCollapsed(true)}
        />
        {showAddNewCategoryInputField && (
          <Input
            suffix={<Check onClick={handleClick} />}
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
        )}
        {categoryDataAsPerSearchCategory.map(category => (
          <MenuBar.Block
            count={category.count}
            key={category.id}
            label={category.name}
          />
        ))}
      </MenuBar>
    </div>
  );
};
export default SideBar;
