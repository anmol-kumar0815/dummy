import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { PageLoader, Button, Dropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import {
  CREATE_ARTICLE_INITIAL_FORM_DATA,
  CREATE_ARTICLE_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Create = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Save Draft");
  const [status, setStatus] = useState("Draft");

  const { Menu, MenuItem } = Dropdown;
  const buttonLabels = ["Publish", "Save Draft"];

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async values => {
    try {
      values = {
        ...values,
        category_id: values.category_id.value,
        status,
      };
      await articlesApi.create(values);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    setLoading(false);
  }, []);

  const CATEGORIES_OPTIONS = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-sm py-6">
      <Formik
        initialValues={CREATE_ARTICLE_INITIAL_FORM_DATA}
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={CREATE_ARTICLE_FORM_VALIDATION_SCHEMA(
          CATEGORIES_OPTIONS
        )}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            <div className="flex gap-x-4">
              <Input
                required
                className="w-7/12"
                label="Article Title"
                name="title"
                placeholder="Write title of your article here."
              />
              <Select
                isSearchable
                required
                label="Category"
                name="category_id"
                options={CATEGORIES_OPTIONS}
                placeholder="Select a category"
              />
            </div>
            <Textarea
              required
              className="mt-5"
              label="Article Body"
              name="body"
              placeholder="Write your article body here."
              rows={10}
            />
            <div className="mt-2 flex">
              <Button
                className="mr-px"
                disabled={isSubmitting}
                label={buttonLabel}
                loading={isSubmitting}
                size="medium"
                style="primary"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Dropdown
                className="mr-3"
                disabled={isSubmitting}
                type="submit"
                onClick={() => setSubmitted(true)}
              >
                <Menu>
                  {buttonLabels.map((buttonLabel, idx) => (
                    <MenuItem.Button
                      key={idx}
                      onClick={() => {
                        setButtonLabel(buttonLabel);
                        buttonLabel === "Save Draft"
                          ? setStatus("Draft")
                          : setStatus("Published");
                      }}
                    >
                      {buttonLabel}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
              <Button className="ml-2" label="Cancel" style="text" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
