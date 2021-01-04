<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Thông Tin tài khoản</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success "  href="info.html">Cá nhân <i class="fa fa-pencil" aria-hidden="true"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success active" href="bank-info.html">Tài khoản <i class="fa fa-pencil" aria-hidden="true"></i></a>
                    </li>
                </ul>
                <div class="bank-information my-3">
                    <p>
                        <b>Số tài khoản:</b>
                        <br>
                        0977778818
                    </p>
                    <p>
                        <b>Tên chủ tài khoản:</b>
                        <br>
                        Hoàng Thy Hoa
                    </p>
                    <p>
                        <b>Ngân hàng:</b>
                        <br>
                        Vietcombank
                    </p>
                </div>
                <hr>
                <div class="bank-information-form my-3">
                    <form action="#">
                        <div class="form-group">
                            <label  class="font-weight-bold">Số tài khoản:</label>
                            <input type="number" name="phone"  class="form-control" placeholder="0977778818">
                        </div>
                        <div class="form-group">
                            <label  class="font-weight-bold">Tên chủ tài khoản:</label>
                            <input type="text" name="name"  class="form-control" placeholder="Hoàng Thy Hoa">
                        </div>
                        <div class="form-group">
                            <label  class="font-weight-bold">Ngân hàng:</label>
                            <input type="text" name="email"  class="form-control" placeholder="Vietcombank">
                        </div>
                        <div class="form-group ">
                            <div class="btn-group btn-block" role="group" aria-label="Basic example">
                                <button type="submit" class="btn  btn-success">Cập nhật</button>
                                <a  href="login.html" class="btn  ">Bỏ qua</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ul id="menu-bottom" class="nav nav-fill fixed-bottom">
            <li class="nav-item">
                <a class="nav-link active" href="#"> Thống kê</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Đại lý</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Thông tin</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Thông báo</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Phản hồi</a>
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: "Bank"
    }
</script>

<style scoped>

</style>