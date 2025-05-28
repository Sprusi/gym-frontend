/* eslint-disable i18n/no-russian-character */

export const SUCCESS = 'Выполнено успешно';
export const ERR_DEFAULT = 'Произошла ошибка';
export const FROM_TO: [string, string] = ['с', 'до'];
export const RUB = 'руб.';

/**
 *  AXIOS
 */
export const NO_CONNECTION_TO_SERVER = 'Нет связи с сервером';
export const ACCESS_DENIED = 'Доступ запрещен';
export const LOGIN_ERROR = 'Ошибка входа в систему';
export const SERVER_REQUEST_ERROR = 'Ошибка в запросе к серверу';
export const REQUEST_ERROR = 'Ошибка в запросе';
export const PAGE_NOT_FOUND = 'Страница или документ не найдена';
export const INACTIVE_SESSION = 'Сессия истекла или неактивна';
export const INTERNAL_SERVER_ERROR = 'Ошибка на стороне сервера';
export const ERROR = (key: string) => 'Ошибка ' + key;
export const SOMETHING_WENT_WRONG = 'Что-то пошло не так ...';

/**
 * Animation Page
 */
export const AP_TITLE_FIRST = 'ТВОЙ РИНГ';
export const AP_TITLE_SECOND = 'ТВОЯ ПОБЕДА';
export const AP_MOTIVATIONAL_QUOTE =
  'В каждом ударе — сила. В каждом движении — цель. Это твой момент. Твоя победа начинается здесь!';
export const AP_START_BUTTON = 'Начать';

/**
 * Lessons Page
 */
export const LP_INFO_CARDS = {
  firstTitle: 'ЭТО БЕЗОПАСНО',
  firstSubtitle: 'Самое надежное оборудование',
  secondTitle: 'ЭТО ДОСТУПНО',
  secondSubtitle: 'Минимум вложений',
  thirdTitle: 'ЭТО ЭФФЕКТИВНО',
  thirdSubtitle: 'Подбор техники под каждого',
};
export const LP_TRAINER_CARDS = {
  title: 'Твой ринг',
  subText: ['Это ', 'ММА', ' для каждого независимо от возраста и уровня подготовки'],
  button: 'Занятие с тренером',
};

/**
 * Tariff Page
 */
export const TP_CARD_TITLES = {
  girl: 'ТВОЙ РИНГ ДЕВУШКАМ',
  child: 'ТВОЙ РИНГ ДЕТЯМ',
  boy: 'ТВОЙ РИНГ МУЖЧИНАМ',
};
export const TP_GO_TRAINING_BUTTON = 'Записаться';

/**
 * Payment Page
 */
export const PP_TITLE = 'Тарифы';
export const PP_TARIF_DAY_TYPES = {
  morning: 'Утренний',
  afternoon: 'Дневной',
  evening: 'Вечерний',
};
export const PP_TARIF_TITLES = {
  girl: 'Девушкам',
  boy: 'Мужчинам',
  children: 'Детям',
};
export const PP_TRENER = 'Тренер:';
export const PP_COLUMNS = {
  name: 'Название',
  time: 'Режим работы',
  price: 'Цена',
};
export const PP_SELECTED_TARIFS = 'Выбранные тарифы';
export const PP_PAYT = 'Оплатить';
