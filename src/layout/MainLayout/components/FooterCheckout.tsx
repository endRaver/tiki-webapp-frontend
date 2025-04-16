const FooterCheckout = () => {
  return (
    <div className="bg-border-line py-10">
      <div className="container mx-auto text-sm">
        <p className="text-neutral-600">
          Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch
          chung:
        </p>

        <div className="mt-1.5 hidden md:flex  gap-3">
          <p >Quy chế hoạt động</p>
          <span className="h-4 w-0.5 bg-[#DDDDE3]" />
          <p>Chính sách giải quyết khiếu nại</p>

          <span className="h-4 w-0.5 bg-[#DDDDE3]" />
          <p>Chính sách bảo hành</p>
          <span className="h-4 w-0.5 bg-[#DDDDE3]" />
          <p>Chính sách bảo mật thanh toán</p>
          <span className="h-4 w-0.5 bg-[#DDDDE3]" />
          <p>Chính sách bảo mật thông tin cá nhân</p>
        </div>

        <div className="mt-5 flex gap-3">
          <p className="text-neutral-600">
            © 2019 - Bản quyền của Công Ty Cổ Phần Ti Ki - Tiki.vn
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterCheckout;
