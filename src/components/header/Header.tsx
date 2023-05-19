import './Header.scss'
import Logo from '../../assets/Logo.png'
const Header = () => {
    return (
        <div className='Header'>
            <div>
                <img style={{width:'50px',height:'50px'}} src={Logo}alt="" />
            </div>
            <h1>Список Валют</h1>
            <div><a className='Header_link'>Узнать больше</a></div>
        </div>
    );
};

export default Header;