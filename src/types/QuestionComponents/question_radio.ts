export type QuestionRadioOptionType = {
  value: string;
  label: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  options?: QuestionRadioOptionType[];
  isVertical?: boolean;
  value?: string;
};
