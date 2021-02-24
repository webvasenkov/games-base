import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        ::-webkit-scrollbar {
            width: .5em;
            background: #ddd;
        }

        ::-webkit-scrollbar-thumb {
            background: #777;
            border-radius: 1em;
        }
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    a {
        color: inherit;
        text-decoration: initial;
    }

    body {
        font-family: "Poppins", sans-serif;
        color: #222;
        background: rgb(245, 245, 245);
    }

    h2 {
        position: relative;
        font-size: 1.6rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        padding-left: 0.4em;
        margin: 1em 0;

        &::before {
            content: '';
            position: absolute;
            width: 1px;
            height: 100%;
            background: #222;
            left: 0;
            top: 0;
        }
    }
`;

export default GlobalStyles;
