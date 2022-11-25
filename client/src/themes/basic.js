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
    .error-message{
        color:red;
    }
    .success-message{
        color:green;
    }
`;
export const Button = styled.button`
    cursor: pointer;
    padding: 10px 15px;
    background-color: grey;
    border: 1px solid #000;
    margin: 5px;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    .form-group{
        display:flex;
        flex-direction:column;
    }
    input{
        padding: 10px 15px;
        font-size: 14px;
        border: 1px solid grey;
    }
    input[type:submit]{

    }

`;