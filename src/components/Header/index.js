import './header.css';

const Header = () => {
    return <div className="header mb-5">
         <div className="d-flex align-items-center">
                <img src="./images/logo.webp" alt="лого"/>
                <div className="d-flex align-items-center flex-wrap ms-3 fs-2">
                    <span className="d-block w-100 fs-3 ">
                        Министерство на образованието и науката
                    </span>
                    <span className="fs-5 ">Регионално управление на образованието Пловдив</span>
                </div>
            </div>
    </div>;
}   

export default Header;