export const DATA_BODY_KEY = "data";

export type CreateCategoryQueryResponse = {
  title: string;
  office: string;
};

export type UpdateCategoryQueryResponse = {
  title?: string;
};

export type AddDefaultCategoryQueryResponse = {
  idOffice: string;
  idDefaultCategories: string[];
};

export type RemoveCategoryQueryResponse = {
  id: string;
};
