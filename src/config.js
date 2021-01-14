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
        changePassword: {
            url: baseUrl + '/private/change-pass',
            method: "POST",
        },
        listCity: {
            url: baseUrl + '/private/list-city',
            method: "POST",
        },
        listDistrict: {
            url: baseUrl + '/private/list-district',
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
        addPartner: {
            url: baseUrl + '/private/add-partner',
            method: "POST",
        },
        //Thông tin giới thiệu
        getIntroducers: {
            url: baseUrl + '/private/get-introducers',
            method: "GET",
        },

        confirmIntroducer: {
            url: baseUrl + '/private/confirm-introducer',
            method: "POST",
        },
        getConfirmMessage: {
            url: baseUrl + '/private/get-confirm-message',
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

        getBankAccount: {
            url: baseUrl + '/private/get-bank-account',
            method: "GET",
        },
        updateBankAccount: {
            url: baseUrl + '/private/update-bank-account',
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
        getUnreadNotice: {
            url: baseUrl + '/private/get-unread-notice',
            method: "POST",
        },
        getNotices: {
            url: baseUrl + '/private/get-notices',
            method: "GET",
        },
        updateNotice: {
            url: baseUrl + '/private/update-notice',
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
        reportChartTotal: {
            url: baseUrl + '/private/report-chart-total',
            method: "POST",
        },
        reportChart: {
            url: baseUrl + '/private/report-chart',
            method: "POST",
        },
        reportList: {
            url: baseUrl + '/private/report-list',
            method: "POST",
        },

    },
    messages:{
        SUCCESS :"Thay đổi thành công!",
        INVALID_USERNAME_PASSWORD :"Sai thông tin. Vui lòng kiểm tra lại!",
        INVALID_SESSION:"Vui lòng đăng nhập lại!",
        TRIAL_CODE_NOT_FOUND:"Không tìm thấy code",
        TRIAL_CODE_ALREADY_EXIST:"Code đã tồn tại. Vui lòng thử lại!",
        CREATE_TRIAL_CODE_FAIL:"Tạo code ko thành công. Vui lòng thử lại!",
        PARTNER_NOT_FOUND:'Tạo đối tác ko thành công. Vui lòng thử lại!',
        PARTNER_ALREADY_ADDED:"Đối tác đã tồn tại. Vui lòng thử lại!",
        INTRODUCER_NOT_FOUND:"Không tìm thấy thông tin người giới thiệu. Vui lòng thử lại!"

    }
};