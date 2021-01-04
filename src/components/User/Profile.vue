<template>
    <div class="container ">
        <div class="row align-items-center justify-content-center my-5">
            <div class="col-12">
                <h3 class="text-center">Thông Tin</h3>
            </div>
            <div class="col-12 col-lg-8">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success active"  href="info.html">Cá nhân <i class="fa fa-pencil" aria-hidden="true"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-outline-success " href="bank-info.html">Tài khoản <i class="fa fa-pencil" aria-hidden="true"></i></a>
                    </li>
                </ul>
                <div class="information my-3">
                    <p>
                        <b>Số điện thoại:</b>
                        <br>
                        0977778818
                    </p>
                    <p>
                        <b>Họ và Tên:</b>
                        <br>
                        Hoàng Thy Hoa
                    </p>
                    <p>
                        <b>Email:</b>
                        <br>
                        hoahoang80@gmail.com
                    </p>
                    <p><a href="doi-mat-khau.html">Đổi mật khẩu</a></p>
                    <h4 class="text-center mb-4">Thông tin về nơi làm việc</h4>
                    <p>
                        <b>Thuộc Tỉnh/Thành phố:</b>
                        <br>
                        Hà Nội
                    </p>
                    <p>
                        <b>Quận Huyện:</b>
                        <br>
                        Cầu Giấy
                    </p>
                    <p>
                        <b>Phường/Xã:</b>
                        <br>
                        Trung Hòa
                    </p>
                    <p>
                        <b>Tên trường học, công ty…:</b>
                        <br>
                        Trường tiểu học Lê Hồng Phong
                    </p>
                    <hr>
                    <div class="information-form my-3">
                        <form action="#">
                            <div class="form-group">
                                <label  class="font-weight-bold">Thuộc Tỉnh/Thành phố:</label>
                                <input type="text" name="city"  class="form-control" placeholder="Hà Nội">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Quận Huyện:</label>
                                <input type="text" name="name"  class="form-control" placeholder="Cầu Giấy">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Phường/Xã:</label>
                                <input type="text" name="email"  class="form-control" placeholder="Trung Hòa">
                            </div>
                            <div class="form-group">
                                <label  class="font-weight-bold">Tên trường học, công ty…:</label>
                                <input type="text" name="email"  class="form-control" placeholder="Trường tiểu học Lê Hồng Phong">
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
        name: "Profile"
    }
</script>

<style scoped>

</style>