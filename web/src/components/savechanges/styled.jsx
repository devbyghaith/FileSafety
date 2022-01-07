import StyledComponents from "styled-components";
import { motion } from "framer-motion";

export const Bar = StyledComponents(motion.div)`
    display: flex;
    position: absolute;
    align-items: center;
    jusitfy-content: space-between;
    background-color: var(--colors-backgrounds-dark);
    box-shadow: 0px 0px 1.5rem 0px var(--colors-backgrounds-dark);
    padding: 1rem;
`;