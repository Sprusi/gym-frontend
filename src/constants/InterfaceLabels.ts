/* eslint-disable i18n/no-russian-character */

export const SUCCESS = 'Выполнено успешно';
export const ERR_DEFAULT = 'Произошла ошибка';
export const FROM_TO: [string, string] = ['с', 'до'];
export const RUB = 'руб.';
export const REQUIRED_FIELD = 'Поле обязательно для заполнения';
export const VALIDATION_ERROR = 'Не все обязательные поля были заполнены';
export const REALLY_DELETE = 'Действительно удалить?';
export const NOT_ID = 'Не найден ID';
export const KCAL_DAY = 'ккал/сутки';
export const KCAL = 'ккал';

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
 *  MENU
 */
export const PAYMENT_PROFILE = 'Тарифы';
export const ACHIEVEMENTS = 'Достижения';
export const PAYMENT_LIST = 'Настройка Тарифов';
export const TRAINING_LIST = 'Тренировки';

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
export const PP_DID_BUY_TITLE = 'Активные тарифы';
export const PP_DID_BUY_TRENER = '+ Тренер';

/**
 * Payment List Page
 */
export const PLP_COLUMNS = {
  globalType: 'Общая категория',
  type: 'Тип занятия',
  time: 'Время',
  price: 'Стоимость тарифа',
  trainerPrice: 'Стоимость тренера',
};
export const PLP_TITLE = 'Редактирование тарифов';
export const PLP_SET_PRICE_TREINER = 'Назначить цену тренера';
export const PLP_TARIFF_ADDED = 'Добавить тариф';

export const PLP_TM_TITLE = 'Задать цену тренеру';
export const PLP_TM_GLOBAL_TYPE_FIELD = 'Общая категория';
export const PLP_TM_TRAINER_PRICE = 'Цена';

export const PLP_EM_TITLE_CREATE = 'Создать тариф';
export const PLP_EM_TITLE_EDIT = 'Изменить тариф';

/**
 * Achievements Page
 */
export const AP_TITLE = 'Цели и Достижения';
export const AP_ADD_BUTTON = 'Добавить запись';
export const AP_COLUMNS = {
  date: 'Дата',
  calories: 'Потрачено калорий',
  group: 'Группа мышц',
  comment: 'Комментарий',
};
export const AP_IDEAL_INDICATOR = 'Идеального показателя калорий';
export const AP_EM_TITLE_CREATE = 'Создать запись';
export const AP_EM_TITLE_EDIT = 'Изменить запись';
export const AP_GRAFF_TITLE = 'График сожжённых калорий по дням';
export const AP_GRAFF_CALORIES = 'Калории';
export const AP_GRAFF_DATE = 'Дата';

/**
 * Training List Page
 */
export const TLP_TITLE = 'Тренировки';
export const TLP_TYPE = 'Тип: ';
export const TLP_TYPE_VALUES = {
  my: 'Мои',
  group: 'Групповые',
};
export const TLP_SIGN_UP = 'Записаться с тренером';
export const TLP_COLUMNS = {
  date: 'Дата',
  time: 'Время',
  type: 'Тип',
  trainer: 'Тренер',
  holl: 'Зал',
};
export const TLP_CM_TITLE = 'Тренировка с тренером';
