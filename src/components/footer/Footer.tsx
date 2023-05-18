import {AiOutlineGithub} from 'react-icons/ai'
import {BsTelegram} from 'react-icons/bs'
import './Footer.scss'
const Footer = () => {
    return (
        <div className='Footer'>
             <h2 className='Footer_title'>Created by Vladislav Fisun</h2>
             <div className='icons'>
                <a href=""><AiOutlineGithub/></a>
                <a href=""><BsTelegram/></a>
             </div>
        </div>
    );
};

export default Footer;