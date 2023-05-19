import './Footer.scss'
import { FaGithub, FaVk, FaTelegram } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='footer'>
          <div className='info'>
<p className='info_text'>Created by Vladislav Fisun</p>
<div className='info_icons'>
<a className='info_link' href='https://github.com/VladislavFisun'><FaGithub className='info_icon' /></a>
<a className='info_link' href='https://t.me/VladislavFisun'><FaTelegram className='info_icon'/></a>
</div>
          </div>
        </div>
    );
};

export default Footer;