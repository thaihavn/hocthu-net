<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-3">
            <div class="col-12">
                <h3 class="text-center">Thông Báo</h3>
            </div>
            <div class="col-12">
                <div class="table-responsive" v-show="rows">
                    <table class="table table-striped table-hover text-white">
                        <tr class="text-success">
                            <th style="min-width: 200px">Nội dung</th>
                            <th style="min-width: 65px">Ngày</th>
                            <th nowrap="" class="text-center">Hành động</th>
                        </tr>
                        <tbody>
                        <tr v-for="row in rows" :key="row.id" >

                            <td>{{row.content}}</td>
                            <td class="align-middle">{{row.date}}</td>
                            <td nowrap="" class="text-center align-middle">
                                <div @click="removeNotice(row)" class="btn text-danger p-1"><i class="fas fa-times" style="font-size:24px"></i></div>
                                <div @click="viewNotice(row)" class="btn text-success p-1"><i class="fas fa-arrow-up " style="font-size:24px"></i></div>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Notify",
        data() {
            return {
                rows: {},
                rows_default: [{
                    "id": 1,
                    "content": "Chào mừng bạn đến với...."
                }],
                errors: [],
                onSubmit: false,
            }
        },
        created() {
            this.getNotices();
        },
        methods: {
            getNotices() {
                var me = this;
                var api = window.appConfig.api.getNotices;
                window.axios({
                    method: api.method,
                    url: api.url,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        me.rows = res.data.response;
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });
            },
            viewNotice(row) {
                var api = window.appConfig.api.updateNotice;
                window.axios({
                    method: api.method,
                    url: api.url + '/' + row.id,
                    params: this.form,
                    data: {idNoticeAgency: row.id},
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        this.$store.dispatch('user/updateNotifyUnRead', res.data.unread);
                        window.cmsHattApp.showPrompt(
                            {
                                message: row.content, title: "Gửi phản hồi", inputType: "textarea", callback: function (result) {
                                    if (result) {
                                        var api = window.appConfig.api.feedback;
                                        window.axios({
                                            method: api.method,
                                            url: api.url,
                                            params: this.form,
                                            data: {id: row.id, content: result},
                                            headers: {
                                                'Content-type': 'application/json',
                                            }
                                        }).then((res) => {
                                            var message = '';
                                            if (res.data.status == "SUCCESS") {
                                                message = window.cmsHattApp.getMessage(res.data) ?? "Gửi feedback thành công!";
                                                window.cmsHattApp.showSuccess({message: message});
                                            } else {
                                                message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                                                window.cmsHattApp.showError({message: message});
                                            }
                                        }).catch((err) => {
                                            window.cmsHattApp.showError(err);
                                        });
                                    }
                                }
                            })
                    }
                }).catch((err) => {
                    window.cmsHattApp.showError(err);
                });
            },
            removeNotice(row) {
                var me = this;
                window.cmsHattApp.showConfirm({
                    message: "Bạn chắc chắn muốn xóa?",
                    callback: function (result) {
                        if (result) {
                            var api = window.appConfig.api.removeNotice;
                            window.axios({
                                method: api.method,
                                url: api.url + '/' + row.id,
                                params: me.form,
                                data: {idNoticeAgency: row.id},
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            }).then((res) => {
                                var message = '';
                                if (res.data.status == "SUCCESS") {
                                    me.$store.dispatch('user/updateNotifyUnRead', res.data.unread);
                                    me.getNotices();
                                    // message = window.cmsHattApp.getMessage(res.data)?? "Xóa thông báo thành công!";
                                    // window.cmsHattApp.showSuccess({message: message});
                                } else {
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                                    window.cmsHattApp.showError({message: message});
                                }
                            }).catch((err) => {
                                window.cmsHattApp.showError({message: err.message});
                            });
                            //
                        }
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>