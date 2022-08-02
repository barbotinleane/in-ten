import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${(props) => props.theme.backgroundColor};
      color: ${(props) => props.theme.textColor};
      text-align:center;
      font-family: Rubik, sans-serif;
    }

    h1, h2, h3, h4, h5 {
      letter-spacing: 2px;
    }

    h1 {
      font-size: 1.6rem;
    }

    h2 {
      font-size: 1.4rem;
    }

    nav {
      display:flex;
    }

    .colorSecondary {
      color: ${(props) => props.theme.secondaryColor};
    }

    .colorBrand {
      color: ${(props) => props.theme.brandColor};
    }
    
    .size-1 {
      font-size: 0.5em;
    }
    
    .size-5 {
      font-size: 5em;
    }
    
    .row-space-around {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      text-align: left;
      padding: 30px 0px;
      
      @media only screen and (max-width: 600px) {
        flex-direction: column;
      }
    }
    
    .row {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      padding: 10px;
      margin: 15px auto;
      background-color: lightgrey;
    }
    
    .box-grey {
      background-color: grey;
      padding: 10px;
      margin: 0px 5px;
    }

    button, .btn-primary {
      font-family: Rubik, sans-serif;
      background-color: ${(props) => props.theme.brandColor};
      color: ${(props) => props.theme.textColor};
      padding: 12px 20px;
      border-radius: 20px;
      cursor: pointer;
      border: none;
      transition: linear 0.25s;
      margin: 5px;
      text-decoration: none;
      font-weight: normal;
      font-size: 0.9em;
    }

    button:hover, .btn-primary:hover {
      background-color: ${(props) => props.theme.backgroundColor};
      border: 1px solid ${(props) => props.theme.brandColor};
      color: ${(props) => props.theme.brandColor};
      box-shadow: 4px 4px 0px 0px ${(props) => props.theme.brandColor};
      transition: box-shadow 0.4s;
    }
    
    button:disabled, .btn-primary-disabled {
      opacity: 0.65; 
      cursor: not-allowed;
      
      &:hover {
        background-color: ${(props) => props.theme.brandColor};
        color: ${(props) => props.theme.textColor};
        border: none;
        box-shadow: 0px 0px transparent;
      }
    }

    .intensity {
      font-size: 4em;
      background-color: ${(props) => props.theme.brandColor};
      padding: 10px;
      width: 120px;
      margin: auto;
      border-radius: 30px;
    }

    .btn-secondary {
      background-color: ${(props) => props.theme.secondaryColor};
      color: ${(props) => props.theme.textColor};
    }

    .btn-secondary:hover {
      background-color: ${(props) => props.theme.backgroundColor};
      border: 1px solid ${(props) => props.theme.secondaryColor};
      color: ${(props) => props.theme.secondaryColor};
      box-shadow: 4px 4px 0px 0px ${(props) => props.theme.secondaryColor};
      transition: box-shadow 0.4s;
    }
    
    .btn-secondary-disabled:hover {
      background-color: ${(props) => props.theme.secondaryColor};
      color: ${(props) => props.theme.textColor};
    }
    
    .box-rounded {
      color: white;
      background-color: ${(props) => props.theme.mainColor};
      padding: 40px;
      margin: 0px 10px 40px 10px;
      border-radius: 80% 30% 50% 50%/50%;
      box-shadow: 0.375em 0.375em 0 0 rgba(15, 28, 63, 0.125);
      border: 0.1875em solid #0F1C3F;
    }
    
    .italic {
      font-style: italic;
      font-size: 0.8em;
      font-family: verdana, sans-serif;
      width: 25%;
      margin: auto;
      
      @media only screen and (max-width: 600px) {
        width: 100%;
      }
    }

    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    
    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: #B6C649;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #B6C649;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    
    .slider.round:before {
      border-radius: 50%;
    } 

    .icon-switch-right {
        padding-top: 10px;
        right: 9px;
        position: absolute;
        font-size: 0.9em;
    }

    .icon-switch-left {
        padding-top: 10px;
        left: 9px;
        position: absolute;
        font-size: 0.9em;
    }
`;

export default GlobalStyle;