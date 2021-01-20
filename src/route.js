import Vue from "vue";
import VueRouter from 'vue-router';
import Login from "@/components/Login";
import App from "@/App";
import Profile from "@/components/User/Profile";
import {store} from "@/store"
import Agency from "@/components/Agency/Agency";
import Notify from "@/components/User/Notify";
import Bank from "@/components/User/Bank";
import Partner from "@/components/Agency/Partner";
import Code from "@/components/Agency/Code";
import Source from "@/components/Agency/Source";
import ReportList from "@/components/Report/ReportList";
import ReportChart from "@/components/Report/ReportChart";
import Report from "@/components/Report/Report";
import User from "@/components/User/User";
import Password from "@/components/User/Password";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: 'home',
            component: App,
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/login",
            name: 'login',
            component: Login
        },
        {
            path: "/user",
            component: User,
            children: [
                {
                    path: '',
                    name: 'profile',
                    component: Profile,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: 'change-password',
                    name: 'change_password',
                    component: Password,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: 'bank',
                    name: 'user_bank',
                    component: Bank,
                    meta: {
                        requireAuth: true
                    }
                },


            ]
        },
        {
            path: "/notify",
            component: User,
            children: [
                {
                    path: '',
                    name: 'notify',
                    component: Notify,
                    meta: {
                        requireAuth: true
                    },
                },
            ]
        },
        {
            path: "/report",
            component: Report,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: 'list',
                    name: 'report_list',
                    component: ReportList,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: '',
                    name: 'report_chart',
                    component: ReportChart,
                    meta: {
                        requireAuth: true
                    },
                },
            ]
        },
        {
            path: "/agency",
            component: Agency,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/',
                    name: 'code',
                    component: Code,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: 'partner',
                    name: 'partner',
                    component: Partner,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: 'source',
                    name: 'source',
                    component: Source,
                    meta: {
                        requireAuth: true
                    },
                },
            ]
        },


    ],
    router: {},
    mode: 'history',
});

router.beforeEach(async (to, from, next) => {
    var isLogin = store.getters['user/isLogin'];
    if (to.meta.requireAuth && from.name != 'login') {
        if (!isLogin) {
            next({name: 'login'});
        }
        next();
    } else {
        next();
    }

});
