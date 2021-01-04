import Vue from "vue";
import VueRouter from 'vue-router';
import Login from "@/components/Login";
import App from "@/App";
import Profile from "@/components/User/Profile";
import {store} from "./store"
Vue.use(VueRouter);

export const router =  new VueRouter({
    routes:[
        {
            path:"/",
            name:'home',
            component: App
        },
        {
            path:"/login",
            name:'login',
            component: Login
        },
        {
            path:"/user",
            component: Profile,
            children:[
                {
                    path:'',
                    name:'user_profile',
                    component:Profile,
                },

            ]
        },

    ],
    router:{},
    mode:'history',
});

router.beforeEach(async (to, from, next) => {
    console.log(store.state.user)
    if (store.state.user.user == null) {
        next("login")
    } else {
        next()
    }
    // const {store} = await import('@/store');
    // const user = store.state.user;
    // if (user == null && to.name != 'login') {
    //     window.cmsHattApp.showError({
    //         message: "Bạn cần phải đăng nhập. Để sử dụng chức năng này!"
    //     });
    //     next('login')
    // } else {
    //     next()
    // }

});
