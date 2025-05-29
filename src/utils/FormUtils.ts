import { Rule } from 'antd/es/form';

import { InterfaceLabels } from '@/constants';

export const getRequiredRule = (required?: boolean): Rule => ({
  required: required ?? true,
  message: InterfaceLabels.REQUIRED_FIELD,
});
