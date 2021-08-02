function QuanLyNhanVien (){
    this.dsnv = JSON.parse(localStorage.getItem("dsnv"))||[];
};
QuanLyNhanVien.prototype.khoiTao = function(){
    if(this.dsnv.length===0)
    {
        return; //nếu mà dsnv rỗng thì không làm gì hết
    }
    this.dsnv = this.dsnv.map(function(nv){
        return new NhanVien(nv.taiKhoanNV,nv.tenNV,nv.emailNV,nv.matKhauNV,nv.ngayLamNV,nv.luongCB,nv.chucVu,nv.gioLam)
    });
}
QuanLyNhanVien.prototype.saveLocalStorage = function(){

    localStorage.setItem("dsnv",JSON.stringify(this.dsnv));
}

QuanLyNhanVien.prototype.themNV = function(nhanVien){
    this.dsnv.push(nhanVien);
    //cập nhật sv xuống local storage
this.saveLocalStorage();
}
QuanLyNhanVien.prototype.capNhatNV= function(nhanVien){
    this.dsnv = this.dsnv.map(function(nv)
    {
        if (nv.taiKhoanNV === nhanVien.taiKhoanNV)
        {
            return nhanVien;
        }
        return nv;
    });
    this.saveLocalStorage();
}
QuanLyNhanVien.prototype.xoaNhanVien=function(taiKhoanNV){
    this.dsnv = this.dsnv.filter(function(nv){
        return nv.taiKhoanNV !== taiKhoanNV;
    })
    this.saveLocalStorage();
}
QuanLyNhanVien.prototype.timNV= function(search)
{
    return this.dsnv.filter (function(nv){
        return nv.xepLoai().toLowerCase().trim().indexOf(search.toLowerCase().trim()) !==-1;
    });
};
QuanLyNhanVien.prototype.chonNhanVien =function(taiKhoanNV)
{
    return this.dsnv.find(function(nv){
        return nv.taiKhoanNV === taiKhoanNV;
    });
}