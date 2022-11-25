import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Container } from "../../themes/basic";

import logo from "../../../src/img/logo_euro_2020.png";

const Footer = () => {
  return (
    <FooterBox className="footer-box">
          <Container>
              <div className="content">
                  <Link className="nav-link" to="/">
                    <img
                      src={logo}
                      alt="logo"
                      style={{ width: "85px" }}
                      className="thumbnail"
                    />
                  </Link>
                  <div className="copyrights">
                    Copyrights &copy; {new Date().getFullYear()}
                  </div>
              </div>
        </Container>
    </FooterBox>
  );
}

export default Footer;

const FooterBox = styled.footer`
    display:flex;
    padding: 30px 0px;
    background-color: #202020;
    color: #fff;
    .content{
      display:flex;
      justify-content:space-between;
      flex:1;
    }
    .content > *{
      flex:1;
    }
    .copyrights{
      display:flex;
      justify-content: flex-end;
    }
`;