const CheckoutPage = () => {
  return (
    <div className="bg-background">
      <div className="container mx-auto h-[500px] pt-5">
        <div className="flex gap-5">
          <div className="flex-3/4 bg-white">
            <div className="px-4 pt-4">
              <h4 className="mb-4 text-lg font-bold">
                Chọn hình thức giao hàng
              </h4>

              <div className="bg-primary-50 border-primary-100 w-[500px] rounded-[10px] border p-4">
                
              </div>
            </div>
          </div>
          <div className="flex-1/4 bg-white">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Checkout</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
