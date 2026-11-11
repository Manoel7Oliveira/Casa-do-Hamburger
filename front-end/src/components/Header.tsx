import { Link, useLocation } from "react-router";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { LogOut, ShoppingCart, Box, Plus, LayoutDashboard } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    const handleAuthUser = async () => {
      try {
        const response = await fetch("http://localhost:4000/me", {
          credentials: "include",
        });

        if (!response.ok) {
          console.log("Deu ruim");
          return;
        }

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.log(error);
        return;
      }
    };

    handleAuthUser();
  }, [setUser]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        console.log("Deu Ruim");
      }
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1";

    if (location.pathname === path) {
      return `${baseClass} text-[#161410] bg-[#F2DAAC]`;
    } else {
      return baseClass;
    }
  };

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-[737px] md:p-0">
        <Link to={"/"}>
          <img src="../public/logo.png" alt="" />
        </Link>

        {user ? (
          <div className="flex items-center gap-8 text-white">
            <div className="flex items-center gap-2 text-[#F2DAAC]">
              <Link to="/">
                <div className={getNavItemClass("/")}>
                  <Box size={18} />
                </div>
              </Link>

              <Link to="/pedidos">
                <div className={getNavItemClass("/pedidos")}>
                  <LayoutDashboard size={18} />
                </div>
              </Link>

              <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1">
                <Plus size={18} />
              </div>
            </div>

            <div className="relative cursor-pointer">
              <ShoppingCart size={18} />
              <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-[#161410]">
                1
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p>Ola, {user.name}</p>

              <LogOut
                size={18}
                className="cursor-pointer"
                onClick={() => handleLogout()}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
