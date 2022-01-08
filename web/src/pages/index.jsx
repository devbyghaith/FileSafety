import Login from "./authentication/login";
import Register from "./authentication/register";
import Verify from "./authentication/verify";

import Overview from "./dashboard/overview";
import Activations from "./dashboard/activations";
import Products from "./dashboard/products";
import Logs from "./dashboard/logs";

import Loading from "./others/loading";

import Homepage from "./homepage";

export default {
    Homepage,
    Dashboard: {
        Overview,
        Activations,
        Products,
        Logs,
    },

    Authentication: {
        Login,
        Register,
        Verify,
    },

    Others: {
        Loading,
    }
};