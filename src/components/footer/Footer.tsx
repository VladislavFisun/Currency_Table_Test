import './Footer.scss'
import { FaGithub, FaTelegram } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='footer'>
          <div className='info'>
<p className='info_text'>Created by Vladislav Fisun</p>
<div className='info_icons'>
<a className='info_link' href='https://github.com/VladislavFisun' target='_blank'><FaGithub className='info_icon' /></a>
<a className='info_link' href='https://t.me/VladislavFisun' target='_blank'><FaTelegram className='info_icon'/></a>
</div>
          </div>
        </div>
    );
};

export default Footer;