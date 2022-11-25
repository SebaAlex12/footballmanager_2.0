import styled from "styled-components";

export const Container = styled.div`
    max-width:1270px;
    width:100%;
    margin-left:auto;
    margin-right:auto;
    .nav-link{
        text-decoration:none;
        color:#000;
        font-size:16px;
    }
    .btn{
        padding: 8px 10px;
        background-color: #317630;
        border-radius: 5px;
        border: 1px solid #1a4868;
        color: #fff;
        margin: 4px;
        cursor:pointer;
    }
    .btn:hover{
        color:#000;
        background-color:#fff;
    }
    .btn.active{
        background-color:#4b7781;
    }
`;
export const Button = styled.div`

`;