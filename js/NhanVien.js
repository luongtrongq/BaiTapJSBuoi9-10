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