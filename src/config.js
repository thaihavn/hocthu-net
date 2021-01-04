var baseUrl = '/api-ht/hocthu/api/hocthu/v1';
window.appConfig = {
    api: {
        register: {
            url: baseUrl + '/agency/register',
            method: "POST",
        },
        token: {
            url: baseUrl + '/agency/token',
            method: "POST",
        },
        refreshToken: {
            url: baseUrl + '/agency/refresh_token',
            method: "POST",
        },
        listCity: {
            url: baseUrl + '/private/list-city',
            method: "POST",
        },
        listWard: {
            url: baseUrl + '/private/list-ward',
            method: "GET",
        },
        listBank: {
            url: baseUrl + '/private/list-bank',
            method: "GET",
        },
        getProfile: {
            url: baseUrl + '/private/get-profile',
            method: "GET",
        },
        getPartners: {
            url: baseUrl + '/private/get-partners',
            method: "GET",
        },
        addPartners: {
            url: baseUrl + '/private/add-partners',
            method: "POST",
        },
        //Thông tin giới thiệu
        getIntroducers: {
            url: baseUrl + '/private/get-introducers',
            method: "GET",
        },
        deleteIntroducer: {
            url: baseUrl + '/private/remove-introducers',
            method: "DELETE",
        },
        updateSource: {
            url: baseUrl + '/private/update-source',
            method: "POST",
        },

        getCodes: {
            url: baseUrl + '/private/get-codes',
            method: "GET",
        },
        addCode: {
            url: baseUrl + '/private/add-code',
            method: "POST",
        },
        deleteCode: {
            url: baseUrl + '/private/remove-code',
            method: "DELETE",
        },

        updateWorkVenue: {
            url: baseUrl + '/private/update-work-venue',
            method: "POST",
        },

        updateBankAccount: {
            url: baseUrl + '/private/update-work-venue',
            method: "POST",
        },
        getQuantity: {
            url: baseUrl + '/private/get-quantity',
            method: "GET",
        },
        getQuantity1: {
            url: baseUrl + '/private/get-quantity1',
            method: "GET",
        },
        getQuantity2: {
            url: baseUrl + '/private/get-quantity2',
            method: "GET",
        },
        getNotices: {
            url: baseUrl + '/private/get-notices',
            method: "GET",
        },
        viewNotice: {
            url: baseUrl + '/private/view-notice',
            method: "POST",
        },
        removeNotice: {
            url: baseUrl + '/private/remove-notice',
            method: "DELETE",
        },
        feedback: {
            url: baseUrl + '/private/feedback',
            method: "POST",
        },

    },
    messages:{
        INVALID_USERNAME_PASSWORD :"Sai thông tin. Vui lòng kiểm tra lại!",
        INVALID_SESSION:"Vui lòng đăng nhập lại!"
    }
};