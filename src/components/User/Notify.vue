<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Thông Báo</h3>
            </div>
            <div class="col-12 col-lg-8">
                <div class="table-responsive" v-show="rows">
                    <table class="table table-striped table-hover table-sm ">
                        <thead class="thead-inverse">
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(row,index) in rows" :key="row.id">
                            <td scope="row">{{index + 1}}. {{row.content}}</td>
                            <td class="text-right">
                                <div class="btn-group " role="group" aria-label="Basic example">
                                    <div @click="viewNotice(row)" class="btn btn-secondary">Xem</div>
                                    <div @click="removeNotice(row)" class="btn btn-danger">Xóa</div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Nội dung thông báo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        1. Nội dung thông báo hdh ashdkjahsd kajsdkjasd
                        <hr>
                        <form action="">
                            <div class="form-group">
                                <textarea name="content" class="form-control w-100"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-success btn-block">Gửi phản hồi</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
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
        created(){
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
                                message: row.content, title: "Nội dung thông báo", inputType: "textarea", callback: function (result) {
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
                                            }else{
                                                message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                                                window.cmsHattApp.showError({message:message});
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
                                url: api.url+'/'+row.id,
                                params: me.form,
                                data: {idNoticeAgency: row.id},
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            }).then((res) => {
                                var message = '';
                                if (res.data.status == "SUCCESS") {
                                    me.$store.dispatch('user/updateNotifyUnRead',res.data.unread);
                                    me.getNotices();
                                    // message = window.cmsHattApp.getMessage(res.data)?? "Xóa thông báo thành công!";
                                    // window.cmsHattApp.showSuccess({message: message});
                                }else{
                                    message = window.cmsHattApp.getMessage(res.data) ?? "Có lỗi. Vui lòng thử lại!";
                                    window.cmsHattApp.showError({message:message});
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