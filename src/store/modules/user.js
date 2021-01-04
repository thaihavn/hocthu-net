import router from '@/route';
export default {
    namespaced: true,
    state: () => ({
        token: null,
        user: null,
        city: null,
    }),
    getters: {
        checkLogin: (state) => {
            return state.user;
        },
        userToken: (state) => {
            return state.token;
        },
    },
    mutations: {
        updateUser(state, userData) {
            state.token = userData.token;
            state.user = userData.user;
        },
    },
    actions: {
        login({commit}, tokenResponse) {
            var api = window.appConfig.api.getProfile;
            if (typeof tokenResponse.access_token != 'undefined') {
                var dumpToken = tokenResponse.token_type[0].toUpperCase() + tokenResponse.token_type.substr(1) + ' ' + tokenResponse.access_token;
                var userData = {
                    token: tokenResponse
                };
                window.axios({
                    method: api.method,
                    url: api.url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'Authorization': dumpToken,
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        userData.user = res.data.response;
                        commit('updateUser', userData);
                        router.push({'name': "user_profile"})
                    } else {
                        window.cmsHattApp.showError({
                            message: res.data.message ?? window.cmsHattApp.getMessage(res.data.status),
                            callback: function () {

                            }
                        });
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError({
                        message: err.message,
                        callback: function () {
                            // router.push({'name': "content_manager", 'param': {'type': this.content_type}})
                        }
                    });

                });
            }
        },
    },

}