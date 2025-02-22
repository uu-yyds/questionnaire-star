import QuestionTitle from './QuestionTitle';
import QuestionInput from './QuestionInput';
import QuestionParagraph from './QuestionParagraph';
import QuestionInfo from './QuestionInfo';
import QuestionTextArea from './QuestionTextArea';
import QuestionRadio from './QuestionRadio';
import QuestionCheckbox from './QuestionCheckbox';
import type { ComponentConfigType } from '../../types/QuestionComponents';
import { QuestionTitlePropsConfig } from '../../types/QuestionComponents/question_title';
import { QuestionInputPropsConfig } from '../../types/QuestionComponents/question_input';
import { QuestionParagraphPropsConfig } from '../../types/QuestionComponents/question_paragraph';
import { QuestionInfoPropsConfig } from '../../types/QuestionComponents/question_info';
import { QuestionTextAreaPropsConfig } from '../../types/QuestionComponents/question_textarea';
import PieChartComponent from '../StatPage/PieChart';
import BarChartComponent from '../StatPage/BarChart';

export const questionTitleConfig: ComponentConfigType = {
  title: '标题',
  type: 'questionTitle',
  component: QuestionTitle,
  props: {
    text: '一行标题',
    level: 1,
    isCenter: false,
  },
};

export const questionInputConfig: ComponentConfigType = {
  title: '输入框',
  type: 'questionInput',
  component: QuestionInput,
  props: {
    title: '输入框标题',
    placeholder: '请输入',
  },
};

export const questionTextAreaConfig: ComponentConfigType = {
  title: '多行输入框',
  type: 'questionTextArea',
  component: QuestionTextArea,
  props: {
    title: '多行输入框标题',
    placeholder: '请输入',
  },
};

export const questionParagraphConfig: ComponentConfigType = {
  title: '段落',
  type: 'questionParagraph',
  component: QuestionParagraph,
  props: {
    paragraph: '一行段落',
    isCenter: false,
  },
};

export const questionRadioConfig: ComponentConfigType = {
  title: '单选',
  type: 'questionRadio',
  component: QuestionRadio,
  statComponent: PieChartComponent,
  props: {
    title: '单选标题',
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
    ],
    isVertical: false,
    value: '',
  },
};

export const questionInfoConfig: ComponentConfigType = {
  title: '问卷信息',
  type: 'questionInfo',
  component: QuestionInfo,
  props: {
    title: '问卷标题',
    desc: '问卷描述',
  },
};

export const questionCheckboxConfig: ComponentConfigType = {
  title: '多选',
  type: 'questionCheckbox',
  component: QuestionCheckbox,
  statComponent: BarChartComponent,
  props: {
    title: '多选标题',
    list: [
      { label: '选项1', value: 'option1', checked: false },
      { label: '选项2', value: 'option2', checked: false },
    ],
    isVertical: false,
  },
};

const componentConfigList: ComponentConfigType[] = [
  questionTitleConfig,
  questionInputConfig,
  questionTextAreaConfig,
  questionParagraphConfig,
  questionInfoConfig,
  questionRadioConfig,
  questionCheckboxConfig,
];

export const getComponentConfigByType = (type: string) => {
  return componentConfigList.find(config => config.type === type);
};

export const componentConfGroup = [
  {
    groupId: 'TextGroup',
    groupName: '文本显示',
    components: [questionTitleConfig, questionParagraphConfig, questionInfoConfig],
  },
  {
    groupId: 'InputGroup',
    groupName: '用户输入',
    components: [questionInputConfig, questionTextAreaConfig],
  },
  {
    groupId: 'ChoiceGroup',
    groupName: '用户选择',
    components: [questionRadioConfig, questionCheckboxConfig],
  },
];

export const componentTypeMapConfig = {
  [questionTitleConfig.type]: QuestionTitlePropsConfig(),
  [questionInputConfig.type]: QuestionInputPropsConfig(),
  [questionParagraphConfig.type]: QuestionParagraphPropsConfig(),
  [questionInfoConfig.type]: QuestionInfoPropsConfig(),
  [questionTextAreaConfig.type]: QuestionTextAreaPropsConfig(),
};
