import { Route } from "react-router-dom";
import CategoryPage from "../categories/CategoryPage";

export const renderCategoriesRoute = (categories) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }
  return categories.map((category) => (
    <Route
      key={category._id}
      path={`/categories/${category.slug}`}
      element={<CategoryPage category={category} />}
    />
  ));
};
