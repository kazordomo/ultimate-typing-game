import styled from 'react-emotion';

export default styled('div')`
    animation: spin 1s linear infinite;
    height: 10px;
    width: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -5px;
    @keyframes spin {
        0% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px #20C20E, 
            20px -20px #20C20E, 
            30px -10px #20C20E, 
            30px 0px #20C20E, 
            30px 10px #20C20E, 
            20px 20px #20C20E, 
            10px 30px #20C20E, 
            0px 30px transparent, 
            -10px 30px transparent, 
            -20px 20px transparent, 
            -30px 10px transparent, 
            -30px 0px transparent, 
            -30px -10px transparent, 
            -20px -20px transparent,
            -10px -30px transparent;
        }
        6.25% {
          box-shadow: 
            0px -30px transparent, 
            10px -30px #20C20E, 
            20px -20px #20C20E, 
            30px -10px #20C20E, 
            30px 0px #20C20E, 
            30px 10px #20C20E, 
            20px 20px #20C20E, 
            10px 30px #20C20E, 
            0px 30px #20C20E, 
            -10px 30px transparent, 
            -20px 20px transparent, 
            -30px 10px transparent, 
            -30px 0px transparent, 
            -30px -10px transparent, 
            -20px -20px transparent,
            -10px -30px transparent;
        }
        12.5% {
          box-shadow: 
            0px -30px transparent, 
            10px -30px transparent, 
            20px -20px #20C20E, 
            30px -10px #20C20E, 
            30px 0px #20C20E, 
            30px 10px #20C20E, 
            20px 20px #20C20E, 
            10px 30px #20C20E, 
            0px 30px #20C20E, 
            -10px 30px #20C20E, 
            -20px 20px transparent, 
            -30px 10px transparent, 
            -30px 0px transparent, 
            -30px -10px transparent, 
            -20px -20px transparent,
            -10px -30px transparent;
        }
        18.75% {
          box-shadow: 
            0px -30px transparent, 
            10px -30px transparent, 
            20px -20px transparent, 
            30px -10px #20C20E, 
            30px 0px #20C20E, 
            30px 10px #20C20E, 
            20px 20px #20C20E, 
            10px 30px #20C20E, 
            0px 30px #20C20E, 
            -10px 30px #20C20E, 
            -20px 20px #20C20E, 
            -30px 10px transparent, 
            -30px 0px transparent, 
            -30px -10px transparent, 
            -20px -20px transparent,
            -10px -30px transparent;
        }
        25% {
          box-shadow: 
            0px -30px transparent, 
            10px -30px transparent, 
            20px -20px transparent, 
            30px -10px transparent, 
            30px 0px #20C20E, 
            30px 10px #20C20E, 
            20px 20px #20C20E, 
            10px 30px #20C20E, 
            0px 30px #20C20E, 
            -10px 30px #20C20E, 
            -20px 20px #20C20E, 
            -30px 10px #20C20E, 
            -30px 0px transparent, 
            -30px -10px transparent, 
            -20px -20px transparent,
            -10px -30px transparent;
        }
        31.25% {
          box-shadow: 
            0px -30px transparent, 
            10px -30px transparent, 
            20px -20px transparent, 
            30px -10px transparent, 
            30px 0px transparent, 
            30px 10px #20C20E, 
            20px 20px #20C20E, 
            10px 30px #20C20E, 
            0px 30px #20C20E, 
            -10px 30px #20C20E, 
            -20px 20px #20C20E, 
            -30px 10px #20C20E, 
            -30px 0px #20C20E, 
            -30px -10px transparent, 
            -20px -20px transparent,
            -10px -30px transparent;
        }
        37.5% {
          box-shadow: 
            0px -30px transparent, 
            10px -30px transparent, 
            20px -20px transparent, 
            30px -10px transparent, 
            30px 0px transparent, 
            30px 10px transparent, 
            20px 20px #20C20E, 
            10px 30px #20C20E, 
            0px 30px #20C20E, 
            -10px 30px #20C20E, 
            -20px 20px #20C20E, 
            -30px 10px #20C20E, 
            -30px 0px #20C20E, 
            -30px -10px #20C20E, 
            -20px -20px transparent,
            -10px -30px transparent;
        }
        43.75% {
          box-shadow: 
            0px -30px transparent, 
            10px -30px transparent, 
            20px -20px transparent, 
            30px -10px transparent, 
            30px 0px transparent, 
            30px 10px transparent, 
            20px 20px transparent, 
            10px 30px #20C20E, 
            0px 30px #20C20E, 
            -10px 30px #20C20E, 
            -20px 20px #20C20E, 
            -30px 10px #20C20E, 
            -30px 0px #20C20E, 
            -30px -10px #20C20E, 
            -20px -20px #20C20E,
            -10px -30px transparent;
        }
        50% {
          box-shadow: 
            0px -30px transparent, 
            10px -30px transparent, 
            20px -20px transparent, 
            30px -10px transparent, 
            30px 0px transparent, 
            30px 10px transparent, 
            20px 20px transparent, 
            10px 30px transparent, 
            0px 30px #20C20E, 
            -10px 30px #20C20E, 
            -20px 20px #20C20E, 
            -30px 10px #20C20E, 
            -30px 0px #20C20E, 
            -30px -10px #20C20E, 
            -20px -20px #20C20E,
            -10px -30px #20C20E;
        }
        56.25% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px transparent, 
            20px -20px transparent, 
            30px -10px transparent, 
            30px 0px transparent, 
            30px 10px transparent, 
            20px 20px transparent, 
            10px 30px transparent, 
            0px 30px transparent, 
            -10px 30px #20C20E, 
            -20px 20px #20C20E, 
            -30px 10px #20C20E, 
            -30px 0px #20C20E, 
            -30px -10px #20C20E, 
            -20px -20px #20C20E,
            -10px -30px #20C20E;
        }
        62.5% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px #20C20E, 
            20px -20px transparent, 
            30px -10px transparent, 
            30px 0px transparent, 
            30px 10px transparent, 
            20px 20px transparent, 
            10px 30px transparent, 
            0px 30px transparent, 
            -10px 30px transparent, 
            -20px 20px #20C20E, 
            -30px 10px #20C20E, 
            -30px 0px #20C20E, 
            -30px -10px #20C20E, 
            -20px -20px #20C20E,
            -10px -30px #20C20E;
        }
        68.75% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px #20C20E, 
            20px -20px #20C20E, 
            30px -10px transparent, 
            30px 0px transparent, 
            30px 10px transparent, 
            20px 20px transparent, 
            10px 30px transparent, 
            0px 30px transparent, 
            -10px 30px transparent, 
            -20px 20px transparent, 
            -30px 10px #20C20E, 
            -30px 0px #20C20E, 
            -30px -10px #20C20E, 
            -20px -20px #20C20E,
            -10px -30px #20C20E;
        }
        75% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px #20C20E, 
            20px -20px #20C20E, 
            30px -10px #20C20E, 
            30px 0px transparent, 
            30px 10px transparent, 
            20px 20px transparent, 
            10px 30px transparent, 
            0px 30px transparent, 
            -10px 30px transparent, 
            -20px 20px transparent, 
            -30px 10px transparent, 
            -30px 0px #20C20E, 
            -30px -10px #20C20E, 
            -20px -20px #20C20E,
            -10px -30px #20C20E;
        }
        81.25% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px #20C20E, 
            20px -20px #20C20E, 
            30px -10px #20C20E, 
            30px 0px #20C20E, 
            30px 10px transparent, 
            20px 20px transparent, 
            10px 30px transparent, 
            0px 30px transparent, 
            -10px 30px transparent, 
            -20px 20px transparent, 
            -30px 10px transparent, 
            -30px 0px transparent, 
            -30px -10px #20C20E, 
            -20px -20px #20C20E,
            -10px -30px #20C20E;
        }
        87.5% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px #20C20E, 
            20px -20px #20C20E, 
            30px -10px #20C20E, 
            30px 0px #20C20E, 
            30px 10px #20C20E, 
            20px 20px transparent, 
            10px 30px transparent, 
            0px 30px transparent, 
            -10px 30px transparent, 
            -20px 20px transparent, 
            -30px 10px transparent, 
            -30px 0px transparent, 
            -30px -10px transparent, 
            -20px -20px #20C20E,
            -10px -30px #20C20E;
        }
        93.75% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px #20C20E, 
            20px -20px #20C20E, 
            30px -10px #20C20E, 
            30px 0px #20C20E, 
            30px 10px #20C20E, 
            20px 20px #20C20E, 
            10px 30px transparent, 
            0px 30px transparent, 
            -10px 30px transparent, 
            -20px 20px transparent, 
            -30px 10px transparent, 
            -30px 0px transparent, 
            -30px -10px transparent, 
            -20px -20px transparent,
            -10px -30px #20C20E;
        }
        100% {
          box-shadow: 
            0px -30px #20C20E, 
            10px -30px #20C20E, 
            20px -20px #20C20E, 
            30px -10px #20C20E, 
            30px 0px #20C20E, 
            30px 10px #20C20E, 
            20px 20px #20C20E, 
            10px 30px #20C20E, 
            0px 30px transparent, 
            -10px 30px transparent, 
            -20px 20px transparent, 
            -30px 10px transparent, 
            -30px 0px transparent, 
            -30px -10px transparent, 
            -20px -20px transparent,
            -10px -30px transparent;
        }
    }
`