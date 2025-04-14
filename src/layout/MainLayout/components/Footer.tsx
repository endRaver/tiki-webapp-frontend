import { useLocation } from "react-router-dom";
import {
  app_store,
  atm_pay,
  bo_cong_thuong,
  bo_cong_thuong_2,
  cash_pay,
  facebook,
  gg_play,
  installment_pay,
  jcb_pay,
  Link,
  mastercard_pay,
  momo_pay,
  qr,
  tiki_pay,
  tikinow,
  viettel_pay_svg,
  visa_pay,
  vn_pay,
  youtube,
  zalo,
  zalo_pay,
} from "../../../assets/icons/footer_icons";

const brands = [
  "vascara",
  "dior",
  "esteelauder",
  "th truemilk",
  "barbie",
  "owen",
  "ensure",
  "durex",
  "bioderma",
  "elly",
  "milo",
  "skechers",
  "aldo",
  "triumph",
  "nutifood",
  "kindle",
  "nerman",
  "wacom",
  "anessa",
  "yoosee",
  "olay",
  "similac",
  "comfort",
  "bitas",
  "shiseido",
  "langfarm",
  "hukan",
  "vichy",
  "fila",
  "tsubaki",
];

const Footer = () => {
  const path = useLocation().pathname;
  const isHome = path === "/";

  return (
    <main className="container mx-auto hidden pb-8 md:block">
      <section className="flex justify-between pt-10 pb-4">
        <div className="flex flex-col gap-3">
          <div className="font-medium">Hỗ trợ khách hàng</div>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="">
              Hotline:{" "}
              <a
                href="tel:+1900-6035"
                className="font-medium text-neutral-400 hover:underline"
              >
                1900 6035
              </a>
              <br />
              (1000 đ/phút, 8-21h kể cả T7, CN)
            </li>
            <li className="hover:underline">
              <a href="">Các câu hỏi thường gặp</a>
            </li>
            <li className="hover:underline">
              <a href="">Gửi yêu cầu hỗ trợ</a>
            </li>
            <li className="hover:underline">
              <a href="">Hướng dẫn đặt hàng</a>
            </li>
            <li className="hover:underline">
              <a href="">Phương thức vận chuyển</a>
            </li>
            <li className="hover:underline">
              <a href="">Chính sách kiểm hàng</a>
            </li>
            <li className="hover:underline">
              <a href="">Chính sách đổi trả</a>
            </li>
            <li className="hover:underline">
              <a href="">Hướng dẫn trả góp</a>
            </li>
            <li className="hover:underline">
              <a href="">Chính sách hàng nhập khẩu</a>
            </li>
            <li className="hover:underline">
              <a href="">Hỗ trợ khách hàng: hotro@tiki.vn</a>
            </li>
            <li className="hover:underline">
              <a href="">Báo lỗi bảo mật: security@tiki.vn</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-medium">Về Tiki</div>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="hover:underline">
              <a href="">Giới thiệu Tiki</a>
            </li>
            <li className="hover:underline">
              <a href="">Tiki Blog</a>
            </li>
            <li className="hover:underline">
              <a href="">Tuyển dụng</a>
            </li>
            <li className="hover:underline">
              <a href="">Chính sách bảo mật thanh toán</a>
            </li>
            <li className="hover:underline">
              <a href="">Chính sách bảo mật thông tin cá nhân</a>
            </li>
            <li className="hover:underline">
              <a href="">Chính sách giải quyết khiếu nại</a>
            </li>
            <li className="hover:underline">
              <a href="">Điều khoản sử dụng</a>
            </li>
            <li className="hover:underline">
              <a href="">Giới thiệu Tiki Xu</a>
            </li>
            <li className="hover:underline">
              <a href="">Tiếp thị liên kết cùng Tiki</a>
            </li>
            <li className="hover:underline">
              <a href="">Bán hàng doanh nghiệp</a>
            </li>
            <li className="hover:underline">
              <a href="">Điều kiện vận chuyển</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-medium">Hợp tác và liên kết</div>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="hover:underline">
              <a href="">Quy chế hoạt động Sàn GDTMĐT </a>
            </li>
            <li className="hover:underline">
              <a href="">Bán hàng cùng Tiki</a>
            </li>
          </ul>

          <span className="mt-3 font-medium">Chứng nhận bởi</span>
          <div className="flex gap-2">
            <a href="">
              <img src={bo_cong_thuong} alt="bo_cong_thuong" />
            </a>
            <a href="">
              <img src={bo_cong_thuong_2} alt="bo_cong_thuong_2" />
            </a>
            <a href="">
              <img src={Link} alt="dmca" />
            </a>
          </div>
        </div>

        <div className="">
          <span className="font-medium">Phương thức thanh toán</span>
          <div className="mt-3 flex flex-col">
            <div className="grid grid-cols-5 gap-[8px]">
              <a href="">
                <img src={tiki_pay} alt="tiki_pay" />
              </a>
              <a href="">
                <img src={visa_pay} alt="visa_pay" />
              </a>
              <a href="">
                <img src={mastercard_pay} alt="mastercard_pay" />
              </a>
              <a href="">
                <img src={jcb_pay} alt="jcb_pay" />
              </a>
              <a href="">
                <img src={atm_pay} alt="atm_pay" />
              </a>
              <a href="">
                <img src={momo_pay} alt="momo_pay" />
              </a>
              <a href="">
                <img src={zalo_pay} alt="zalo_pay" />
              </a>
              <a href="">
                <img src={viettel_pay_svg} alt="viettel_pay_svg" />
              </a>
              <a href="">
                <img src={vn_pay} alt="vn_pay" />
              </a>
              <a href="">
                <img src={cash_pay} alt="cash_pay" />
              </a>
              <a href="">
                <img src={installment_pay} alt="installment_pay" />
              </a>
            </div>
            <span className="mt-8 mb-1 font-medium">Dịch vụ giao hàng</span>
            <div className="-ms-2">
              <a href="">
                <img src={tikinow} alt="tikinow" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="">
            <div className="mb-3 font-medium">Kết nối với chúng tôi</div>
            <div className="mb-8 flex gap-2">
              <a href="">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="">
                <img src={youtube} alt="youtube" />
              </a>
              <a href="">
                <img src={zalo} alt="zalo" />
              </a>
            </div>

            <div className="mb-3 font-medium">Tải ứng dụng trên điện thoại</div>
            <div className="flex gap-[8px]">
              <a href="">
                <img src={qr} alt="" />
              </a>
              <div className="flex flex-col gap-[8px]">
                <a href="">
                  <img src={app_store} alt="" />
                </a>
                <a href="">
                  <img src={gg_play} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="mb-3 font-medium">Công ty TNHH TI KI</div>
        <ul className="space-y-2 text-xs text-neutral-600">
          <li className="hover:underline">
            <a href="">
              Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ
              Chí Minh
            </a>
          </li>
          <li className="hover:underline">
            <a href="">
              Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch
              và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.
            </a>
          </li>
          <li className="">
            Hotline:{" "}
            <a
              href="tel:+1900-6035"
              className="text-primary-300 hover:underline"
            >
              1900 6035
            </a>
          </li>
        </ul>
      </section>

      {isHome && (
        <section className="border-border-line border-t pt-4">
          <div className="mb-3 font-medium">Thương hiệu nổi bật</div>
          <div className="text-sm text-neutral-600">
            {brands.map((brand, index) => (
              <a key={index}>
                <span className="cursor-pointer hover:underline">{brand}</span>
                {index < brands.length - 1 && " / "}
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
export default Footer;
