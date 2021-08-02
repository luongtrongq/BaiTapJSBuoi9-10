function Validator(){
    this.errors ={};
};

Validator.prototype.isRequired = function(name,value){
    if(!value){
        this.errors[name]=`Vui lòng nhập thông tin`;
        return false;
    }
    return true;
};
Validator.prototype.email = function(name,value){
    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)){
        this.errors[name]=`Email không đúng định dạng`;
        return false;
    }
    return true;
};
Validator.prototype.taiKhoan= function(name,value)
{
    if(!/^[\d]{4,6}$/.test(value)){
        this.errors[name]="Nhập từ 4 đến 6 ký tự";
        return false;
    }
    return true;
   
}
Validator.prototype.tenNV = function(name,value){
    if (!/^[a-z]{3,15}$/.test(value))
    {
        this.errors[name]="Chỉ được nhập chữ"
        return false;
    }
    return true;
}
Validator.prototype.password =function(name,value){
    if(!/(?=.*[!.#@_+,?-])(?=.*[a-z])(?=.*[A-Z]).{6,10}/.test(value))
    {
        this.errors[name]="Phải đúng định dạng (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
        return false;
    }
    return true;
}
Validator.prototype.date=function(name,value){
    if(!/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(value)){
        this.errors[name]="Định dạng theo Month/Day/Year"
    }  
}
Validator.prototype.luong = function(name,value){
    if(value<1000000 || value>20000000){
        this.errors[name]="Nhập đúng số lương cơ bản"
    }
}
Validator.prototype.hours =function(name,value){
    if(value<80 || value>200){
        this.errors[name]="Chưa đúng giờ làm quy định"
    }
}

