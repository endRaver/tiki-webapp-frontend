const DashboardPage: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      {/* <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h1> */}
      <div className="rounded border border-gray-200 bg-white p-6">
        <p className="text-gray-500">Welcome to the Admin Dashboard!</p>
        <p className="text-gray-500">
          Here you can view statistics and manage your store.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
