export * from './question_title';
export * from './question_input';
export * from './question_textarea';
export * from './question_paragraph';
export * from './question_info';
export * from './question_radio';
export * from './question_checkbox';

import type { QuestionTitlePropsType } from './question_title';
import type { QuestionInputPropsType } from './question_input';
import type { QuestionTextAreaPropsType } from './question_textarea';
import type { QuestionParagraphPropsType } from './question_paragraph';
import type { QuestionInfoPropsType } from './question_info';
import type { QuestionRadioPropsType } from './question_radio';
import type { QuestionCheckboxPropsType } from './question_checkbox';
import type { componentStatType } from '../Stat/answer_list';

export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionTextAreaPropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

export type ComponentConfigType = {
  title: string;
  type: string;
  component: React.ComponentType<ComponentPropsType>;
  statComponent?: React.ComponentType<{ data: componentStatType[] }>;
  props: ComponentPropsType;
};
