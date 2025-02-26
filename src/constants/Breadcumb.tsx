import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log('pathnames', pathnames)
  const path = location.pathname.split('/');
  console.log('path', path)

  return (
    <div className="py-[30px] border-b-[1px] border-b-solid text-center border-b-[#f0f0f0] bg-[#f0f0f0] my-4">
      <h1 className="text-[42px] font-inter capitalize font-semibold text-[#222222]">
        {pathnames[pathnames.length - 1] || "Home"}
      </h1>
      <p className="text-[#222222] font-poppins text-[15px]">
        <Link to="/dashboard" className="hover:text-red-700">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          console.log('routeTo', routeTo)
          return (
            <span key={name}>
              &nbsp; &gt; &nbsp;
              {index === pathnames.length - 1 ? (
                <span className="text-gray-700 capitalize">{name}</span>
              ) : (
                <Link to={routeTo} className="hover:text-red-700 capitalize">{name}</Link>
              )}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Breadcrumb;
