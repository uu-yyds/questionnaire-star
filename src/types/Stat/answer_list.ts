export type answerInfoType = {
  componentFeId: string;
  value: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type answerItemType = {
  id: string;
  [key: string]: string | string[];
};

export type answerListType = {
  list: answerItemType[];
  count: number;
};

export type componentStatType = {
  name: string;
  count: number;
};
