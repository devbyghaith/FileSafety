import StyledComponents from "styled-components";

import { motion } from "framer-motion";

const StyledBackdrop = StyledComponents(motion.div)`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background: #000000E1;
    z-index: 999;
    height: 100%;
    width: 100%;
    left: 0%;
    top: 0%;
`;

export default function Backdrop({children, ...props}) {
    return (
        <StyledBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            {...props}
        >
            {children}
        </StyledBackdrop>
    )
};