import { theme, ThemeConfig } from 'antd';

export const gymTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontSize: 18,
    colorPrimary: '#606060d9',
  },
  components: {
    Menu: { darkItemBg: '#000' },
    Layout: { siderBg: '#000' },
  },
};
