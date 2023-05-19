import "./Header.scss";
import Logo from "../../assets/free-icon-currency-8193798.png";
const Header = () => {
  return (
    <div className="Header">
      <div>
        <img style={{ width: "50px", height: "50px" }} src={Logo} alt="" />
      </div>
      <h1>Список Акций</h1>
      <div>
        <a
          className="Header_link"
          href="https://iexcloud.io/console/datasets/CORE/HISTORICAL_PRICES"
          target="_blank"
        >
          Узнать больше
        </a>
      </div>
    </div>
  );
};

export default Header;
