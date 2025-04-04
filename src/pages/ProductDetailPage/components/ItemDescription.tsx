const ItemDescription = ({ children }: { children: string }) => {
  return (
    <div className="rounded-lg bg-white p-4">
      <span className="font-semibold">Mô tả sản phẩm</span>

      <div
        className="mt-5 space-y-4"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </div>
  );
};

export default ItemDescription;
