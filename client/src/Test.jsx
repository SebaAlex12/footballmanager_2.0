import react from 'react';
import styled from 'styled-components';

const Test = () => {
    return (
        <TestStyled>
            test text
        </TestStyled>
    )
}

const TestStyled = styled.div`
    font-size:30px;
`;

export default Test;