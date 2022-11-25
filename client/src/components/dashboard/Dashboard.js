import MatchFinals from "../matchFinals/MatchFinals";
import MatchLegend from "../matches/MatchLegend";
import styled from 'styled-components';
import { Container } from "../../themes/basic";

const Dashboard = () => {
  return(
    <DashboardBox className="dashboard-box">
        <Container>
              <MatchFinals />
              <MatchLegend />
        </Container>
    </DashboardBox>
  )
}

export default Dashboard;

const DashboardBox = styled.div`
`;