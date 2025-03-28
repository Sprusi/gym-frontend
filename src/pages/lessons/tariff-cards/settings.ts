import { InterfaceLabels } from '@/constants';

import { RegistrationCardType } from './LessonsTariffCards';
import boylImg from '@/assets/page/lessons/boy.jpg';
import childrenImg from '@/assets/page/lessons/children.jpg';
import girlImg from '@/assets/page/lessons/girl.jpg';

export const registrationCardsData: Record<RegistrationCardType, Record<string, string>> = {
  girls: {
    title: InterfaceLabels.LP_TARIFF_CARDS_TITLE.girls,
    imagePath: girlImg,
    className: 'cardGirls',
  },
  boys: { title: InterfaceLabels.LP_TARIFF_CARDS_TITLE.boys, imagePath: boylImg, className: 'cardBoys' },
  children: {
    title: InterfaceLabels.LP_TARIFF_CARDS_TITLE.children,
    imagePath: childrenImg,
    className: 'cardChildren',
  },
};
