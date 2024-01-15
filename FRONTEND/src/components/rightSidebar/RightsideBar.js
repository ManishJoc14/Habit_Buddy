import PublicRoutes from "../../routes/PublicRoutes";

const RightSideBar = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <PublicRoutes />
        </div>
      </div>
    </>
  );
};

export default RightSideBar;
