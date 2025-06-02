import { create } from 'zustand';

type Store = {
  menuKey: string;
  setMenuKey: (key: string) => void;
};

export const useMenuStore = create<Store>()((set) => ({
  menuKey: '/',
  setMenuKey: (key: string) => set(() => ({ menuKey: key })),
}));
