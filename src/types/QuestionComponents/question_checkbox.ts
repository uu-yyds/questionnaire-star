export type QuestionCheckboxOptionType = {
  value: string;
  label: string;
  checked: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  list?: QuestionCheckboxOptionType[];
  isVertical?: boolean;
};
