export default {
    namespaced: true,
    state: () => ({
        baseUserPass:'',
        token: {},
        user: {},
        banks: null,
        city: null,
        district: null,
        ward: null,
        isLogin: false,
        notify_unread: 0,
        sleep_notify: 0,
        refresh_count:0
    }),// go day la function cho nen no cu goi lai lien tuc thi phai
    getters: {
        isLogin: (state) => {
            return state.isLogin;
        },
        refreshCount: (state) => {
            return state.refresh_count;
        },
    },
    mutations: {
        updateBase64UserPass(state,base64){
            state.baseUserPass = base64
        },
        updateSource(state, source) {
            state.user.source = source;
        },
        updateNotifyUnRead(state, number) {
            state.notify_unread =number??0;
        },
        updateUser(state, userData) {
            if(typeof userData.token !='undefined'){
                state.token = userData.token;
                localStorage.setItem('token', userData.token);
                var dumpToken = state.token.token_type[0].toUpperCase() + state.token.token_type.substr(1) + ' ' + state.token.access_token;
                window.axios.defaults.headers.common['Authorization'] = dumpToken;
            }
            if(typeof userData.user !='undefined'){
                state.user = userData.user;
                state.isLogin = true;
            }
        },
        logoutUser(state) {
            state.user = {};
            state.token = {};
            state.isLogin = false;
        },
        updateBank(state, rows) {
            state.banks = rows;
        },
        updateCity(state, rows) {
            state.city = rows;
        },
        updateDistrict(state, rows) {
            state.district = rows;
        },
        updateWard(state, rows) {
            state.ward = rows;
        },
        updateRefreshCount(state,count){
            state.refresh_count = count;
        }
    },
    actions: {
        updateSource({commit}, source) {
            commit('updateSource', source);
        },
        updateNotifyUnRead({commit},number) {
            commit('updateNotifyUnRead', number);
        },
        getNotifyUnread({getters,commit,dispatch}) {
            if(getters.isLogin){
                var api = window.appConfig.api.getUnreadNotice;
                window.axios({
                    method: api.method,
                    url: api.url,
                    params: {},
                    data: {}
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "SUCCESS") {
                        commit('updateNotifyUnRead', res.unread);
                        if(typeof res.sleep !='undefined'){
                            setTimeout(function () {
                                dispatch('getNotifyUnread')
                            },res.sleep??60000)
                        }

                    }
                });
            }
        },
        getProfile({commit}, tokenResponse) {
            return new Promise((resolve, reject) => {
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
                            resolve(res);
                        } else {
                            var message = window.cmsHattApp.getMessage(res.data);
                            resolve({message: message})
                        }
                    }).catch((err) => {
                        reject(err)
                    });
                } else {
                    reject({message: 'access_token undefined'});
                }
            })
        },
        login({commit,dispatch}, form) {
            return new Promise((resolve, reject) => {
                var api = window.appConfig.api.token;
                var userPass = btoa(form.phone + ":" + form.password);
                var data = {
                    'grant_type': 'client_credentials',
                    'scope': 'dpa',
                };
                window.axios({
                    method: api.method,
                    url: api.url,
                    data: data,
                    headers: {
                        'Authorization': "Basic " + userPass,
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "SUCCESS") {
                        var token = JSON.parse(res.response);
                        commit('updateBase64UserPass',userPass);
                        dispatch('getProfile', token).then(() => {
                                resolve(response);
                            }
                        );
                    } else {
                        var message = window.cmsHattApp.getMessage(res) ?? "Có lỗi khi đăng nhập. Vui lòng thử lại!";
                        reject({message: message});
                    }
                }).catch((err) => {
                    localStorage.removeItem('token');
                    reject(err)
                });
            })
        },
        changePassword(context,form){
            return new Promise((resolve, reject) => {
                // var userPass = context.state.baseUserPass;
                var api = window.appConfig.api.changePassword;
                window.axios({
                    method: api.method,
                    url: api.url,
                    data: form,
                    // headers: {
                    //     'Authorization': "Basic " + userPass,
                    // }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "SUCCESS") {
                        resolve(response);
                    } else {
                        resolve(response);
                    }
                }).catch((err) => {
                    reject(err)
                });
            })

        },
        updateBankAccount(context,form){
            return new Promise((resolve, reject) => {
                var api = window.appConfig.api.updateBankAccount;
                window.axios({
                    method: api.method,
                    url: api.url,
                    data: form,
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "SUCCESS") {
                        resolve(response);
                    } else {
                        resolve(response);
                    }
                }).catch((err) => {
                    reject(err)
                });
            })

        },
        logout({commit}){
            commit('logoutUser')
        },
        refreshToken({commit,state}){

            return new Promise((resolve, reject) => {
                var api = window.appConfig.api.refreshToken;
                var userPass = state.baseUserPass;
                var userData = {
                };
                window.axios({
                    method: api.method,
                    url: api.url+'/'+state.token.refresh_token,
                    data:{refresh_token:state.token.refresh_token},
                    headers: {
                        'Authorization': "Basic " + userPass,
                    }
                }).then((response) => {
                    var res = response.data;
                    if (res.status == "SUCCESS") {
                        userData.token = JSON.parse(res.response);
                        commit('updateUser', userData);
                        resolve(res);
                    } else {
                        // var message = window.cmsHattApp.getMessage(res.data);
                        resolve(res)
                    }
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        getListBank({commit}) {
            var api = window.appConfig.api.listBank;
            window.axios({
                method: api.method,
                url: api.url,
                data: {},
                headers: {
                    'Content-type': 'application/json',
                }
            }).then((res) => {
                if (res.data.status == "SUCCESS") {
                    var listBank = res.data.response;
                    commit('updateBank', listBank);
                }
            }).catch(() => {
            });

        },
        getListCity({commit}) {
            var api = window.appConfig.api.listCity;
            window.axios({
                method: api.method,
                url: api.url,
                data: {},
                headers: {
                    'Content-type': 'application/json',
                }
            }).then((res) => {
                if (res.data.status == "SUCCESS") {
                    var listCity = res.data.response;
                    commit('updateCity', listCity);
                }
            }).catch(() => {
            });

        },
        getListDistrict({commit}, idCity) {
            if (idCity) {
                var api = window.appConfig.api.listDistrict;
                window.axios({
                    method: api.method,
                    url: api.url + '/' + idCity,
                    data: {idCity: idCity},
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        var rows = res.data.response;
                        commit('updateDistrict', rows);
                    }
                }).catch(() => {
                });
            }
        },
        getListWard({commit}, { idCity, idDistrict }) {
            if (idCity && idDistrict) {
                var api = window.appConfig.api.listWard;
                window.axios({
                    method: api.method,
                    url: api.url + '/' + idCity + '/' + idDistrict,
                    data: {idCity: idCity, idDistrict: idDistrict,},
                    params: {idCity: idCity, idDistrict: idDistrict,},
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        var rows = res.data.response;
                        commit('updateWard', rows);
                    }
                }).catch(() => {
                });
            }
        },
        updateRefreshCount({commit},count){
            commit('updateRefreshCount',count);
        }
    },

}