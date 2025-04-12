import BreadCrumb from "@/components/ui/BreadCrumb";
import OrderDetails from "./components/OrderDetails";
import UserInfo from "./components/UserInfo";

const ProfilePage = () => {

  return (
    <div className="bg-background px-4">
      <BreadCrumb />
      <div className="container bg-background flex mx-auto justify-center">
        <UserInfo />
        <OrderDetails />
      </div>
    </div>
  );
};

export default ProfilePage;
