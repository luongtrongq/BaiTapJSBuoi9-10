// DOM 
document.getElementById("btnThemNV").addEventListener("click",themNV);
//Bước 5: viết hàm delete dựa vào khái niệm event bubbling;
document.getElementById("tableDanhSach").addEventListener("click",deleteNV);
// Bước 1:Tạo ra lớp đối tượng nhân viên gồm các thuộc tính;
document.getElementById("btnCapNhat").addEventListener("click",capNhatNV);
//Search
document.getElementById("btnTimNV").addEventListener("click",timNV)


function NhanVien(taiKhoanNV,tenNV,emailNV,matKhauNV,ngayLamNV,luongCB,chucVu,gioLam)
{
    this.taiKhoanNV = taiKhoanNV;
    this.tenNV = tenNV;
    this.emailNV = emailNV;
    this.matKhauNV = matKhauNV;
    this.ngayLamNV= ngayLamNV;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam =gioLam;
}
//Tạo ra các function tính tổng lương và xếp loại
NhanVien.prototype.sumSalary= function(){
    if (this.chucVu ==="Sếp")
    {
        return this.luongCB *3;
    }
    if (this.chucVu==="Trưởng phòng")
    {
        return this.luongCB*2;
    }
    if(this.luongCB==="Nhân viên")
    {
        return this.luongCB
    }
}
NhanVien.prototype.xepLoai=function(){
    if (this.gioLam>=192)
    {
        return "Nhân viên xuất sắc"
    } 
    if (this.gioLam>=176)
    {
        return "Nhân viên giỏi"
    } 
    if (this.gioLam>=160)
    {
        return "Nhân viên khá"
    } 
    if (this.gioLam<160)
    {
        return "Nhân viên trung bình"
    } 
}
//Bước 3: tạo một mảng để chứa tất cả sinh viên mỗi lần bấm thêm NV;
var dsnv = JSON.parse(localStorage.getItem("dsnv"))||[];

function khoiTao(){
    if(dsnv.length===0)
    {
        return; //nếu mà dsnv rỗng thì không làm gì hết
    }
    // bởi vì khi lưu xuống localStorage thì các key là function sẽ bị bỏ qua
    //=> hàm sv.tinhDTB không thể sử dụng được, ta cân dùng data lấy từ local lên và khởi tạo lại đối tượng.
    dsnv = dsnv.map(function(nv){
        return new NhanVien(nv.taiKhoanNV,nv.tenNV,nv.emailNV,nv.matKhauNV,nv.ngayLamNV,nv.luongCB,nv.chucVu,nv.gioLam)
    })
    hienThi(dsnv);
};
khoiTao();

function resetForm(){
    updateForm({});
    document.getElementById("tknv").disabled = false;
}
//function
//Bước 2: Tạo ra hàm themNV và trong hàm tạo ra 1 đối tượng sinh viên mới với các param truyền vào là value.
function themNV(){
   var taiKhoanNV = document.getElementById("tknv").value;
    var tenNV= document.getElementById("name").value;
    var emailNV= document.getElementById("email").value;
    var matKhauNV= document.getElementById("password").value;
    var ngayLamNV= document.getElementById("datepicker").value;
    var luongCB= +document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLam = +document.getElementById("gioLam").value;

    
    var nhanVien = new NhanVien(taiKhoanNV,tenNV,emailNV,matKhauNV,ngayLamNV,luongCB,chucVu,gioLam);
    console.log(nhanVien);
    dsnv.push(nhanVien);
    //cập nhật sv xuống local storage
    localStorage.setItem("dsnv",JSON.stringify(dsnv));
    hienThi(dsnv);
    resetForm();

}
//Bước 4: Tạo hàm hiển thị để hiển thị ra giao diện.

function capNhatNV(){
    var taiKhoanNV = document.getElementById("tknv").value;
    var tenNV= document.getElementById("name").value;
    var emailNV= document.getElementById("email").value;
    var matKhauNV= document.getElementById("password").value;
    var ngayLamNV= document.getElementById("datepicker").value;
    var luongCB= document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;

    var nhanVien = new NhanVien(taiKhoanNV,tenNV,emailNV,matKhauNV,ngayLamNV,luongCB,chucVu,gioLam);

    dsnv = dsnv.map(function(nv)
    {
        if (nv.taiKhoanNV === taiKhoanNV)
        {
            return nhanVien;
        }
        return nv;
    });
    localStorage.setItem("dsnv",JSON.stringify(dsnv));

    hienThi(dsnv);
    resetForm();
}

function hienThi(dsnv){
    var tableDS = document.getElementById("tableDanhSach")
    var html = "";
    for (var i = 0 ; i<dsnv.length;i++)
    {   
        var nv = dsnv[i];
        html +=`
        <tr>
        <td>${nv.taiKhoanNV}</td>
        <td>${nv.tenNV}</td>
        <td>${nv.emailNV}</td>
        <td>${nv.ngayLamNV}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.sumSalary()}</td>
        <td>${nv.xepLoai()}</td>
        <td>
        <button class="btn btn-success" data-toggle="modal" data-target="#myModal" data-action="select" data-tk="${nv.taiKhoanNV}">Update</button>
        <button class="btn btn-dark" data-action="delete" data-tk="${nv.taiKhoanNV}">Delete</button>
        </td>
        </tr>
        ` 
        //Bước 10: đặt thêm attribute cho button để phân biệt 2 hành động
        //bước 7: đặt attribute cho button để phân biệt được giữa 2 button và giữa các button có data-masv khác nhau
        tableDS.innerHTML=html;
    }
}
// Bất cứ hàm nào mà dùng để lắng nghe sự kiện trong js đều trả ra 1 đối tượng event.
function deleteNV(event){
    //event: đối tượng event cung cấp các tham số để ta xử lý;
    // event.target: trả ra element gốc để xử lý xóa đúng 
    // console.log(event.target);
//Bước 6: tìm target
        //Bước 8: dùng attribute taikhoanNV để tìm ra đúng nhân viên cần xóa
 var taiKhoanNV = event.target.getAttribute("data-tk");
//  console.log(taiKhoanNV);
 var action = event.target.getAttribute("data-action")
 if(action ==="delete")
 {
     xoaSinhVien(taiKhoanNV);
 }
 if(action ==="select")
 {
    chonSinhVien(taiKhoanNV);
 }
 //Bước 9:Tìm kiếm đúng value của data-tk để xóa đúng dữ liệu nhân viên đó.
// hienThi(dsnv);
}


function xoaSinhVien(taiKhoanNV)
{
    dsnv = dsnv.filter(function(nv){
        return nv.taiKhoanNV !== taiKhoanNV;
    })
    //cập nhật sv xuống local storage
    localStorage.setItem("dsnv",JSON.stringify(dsnv));
    hienThi(dsnv);
}
// hienThi(dsnv);

function chonSinhVien(taiKhoanNV)
{
    var nhanVien = dsnv.find(function(nv){
        return nv.taiKhoanNV === taiKhoanNV;
    });
    // console.log(nhanVien)
    document.getElementById("tknv").disabled=true;
    updateForm(nhanVien);
}

function updateForm(nhanVien)
{
    document.getElementById("tknv").value=nhanVien.taiKhoanNV ||""; 
    document.getElementById("name").value=nhanVien.tenNV||"";
    document.getElementById("email").value=nhanVien.emailNV||"";
    document.getElementById("password").value=nhanVien.matKhauNV||"";
    document.getElementById("datepicker").value=nhanVien.ngayLamNV||"";
    document.getElementById("luongCB").value=nhanVien.luongCB||"";
    document.getElementById("chucvu").value=nhanVien.chucVu||"";
    document.getElementById("gioLam").value=nhanVien.gioLam||"";
}


//Sửa tên nhân viên thành loại nhân viên ( sửa sau)
function timNV(){
    var search = document.getElementById("searchName").value;
// Cần tạo ra 1 biến mới hứng kết quả filter, vì nếu filter vào dsnv sẽ bị mất data.
    newDsnv = dsnv.filter (function(nv){
        return nv.tenNV.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !==-1;
    });
    hienThi(newDsnv);
}


//Bước 15: set up local storage để tránh mất dữ liệu khi load.
// localStorage.setItem("name","Trong Quyen");set up localStorage
// console.log(localStorage.getItem("name"));lấy dữ liệu từ local
// localStorage.removeItem("name");xoá 1 item mình chỉ định
// localStorage.clear();xoá hết tất cả
// localStorage.setItem("obj", JSON.stringify(obj)) chuyển object thành string dạng JS
//  muốn lưu object hoặc array vào local vào dùng JSON stringtify.
// khi lấy obj từ localStorage lên thì cần chuyển thành object thông qua hàm JSON.parse


