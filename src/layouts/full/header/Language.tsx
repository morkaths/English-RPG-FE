import { useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { useTranslation } from 'react-i18next';
import { useAppConfig } from "src/context/AppConfigContext";
import FlagEn from 'src/assets/images/flags/1x1/en.svg';
import FlagVn from 'src/assets/images/flags/1x1/vn.svg';

const Languages = [
  {
    flagname: 'Tiếng Việt (Vietnamese)',
    icon: FlagVn,
    value: 'vi',
  },
  {
    flagname: 'English (UK)',
    icon: FlagEn,
    value: 'en',
  },
];

const Language = () => {
  const { i18n } = useTranslation();
  const { config, setLanguage } = useAppConfig();

  const currentLang =
    Languages.find((_lang) => _lang.value === config.isLanguage) || Languages[0];

  useEffect(() => {
    i18n.changeLanguage(config.isLanguage);
  }, [config.isLanguage, i18n]);

  return (
    <Dropdown
      label={
        <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden">
          <img src={currentLang.icon} alt={currentLang.value} className="w-full h-full object-cover" />
        </div>
      }
      inline
      arrowIcon={false}
      className="min-w-[200px]"
    >
      {Languages.map((option) => (
        <Dropdown.Item
          key={option.value}
          onClick={() => setLanguage(option.value)}
          className="flex items-center gap-2 py-2 px-3"
        >
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden">
            <img src={option.icon} alt={option.value} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm">{option.flagname}</span>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default Language;