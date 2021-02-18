import { SOCIAL_ICONS } from '../../constants/socialIcons';

const SocialIcons: React.FC = () => {
  return (
    <div className="social-icons">
      {SOCIAL_ICONS.map(({ link, Icon }) => (
        <div key={link} className="icon">
          <a href={link} target="_blanc">
            <Icon />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialIcons;
