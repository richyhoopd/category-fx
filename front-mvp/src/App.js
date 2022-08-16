import "./Styles/App.scss";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import RegisterPersonal from "./Pages/RegisterPersonal";
import RegisterHome from "./Pages/RegisterHome";
import RegisterCode from "./Pages/RegisterCode";
import RegisterConfirm from "./Pages/RegisterConfirm";
import PasswordChange from "./Pages/PasswordChange";
import PasswordChangeEmail from "./Pages/PasswordChangeEmail";
import FormType from "./Pages/FormType";
import FormProblem from "./Pages/FormProblem";
import FormConfirm from "./Pages/FormConfirm";
import FormDevice from "./Pages/FormDevice";
import ProductScreen from "./Pages/ProductScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import CartScreen from "./Pages/CartScreen";
import ShippingAddressScreen from "./Pages/ShippingAddressScreen";
import Logout from "./Pages/Logout";
import PaymentMethodScreen from "./Pages/PaymentMethodScreen";
import PlaceOrderScreen from "./Pages/PlaceOrderScreen";
import OrderScreen from "./Pages/OrderScreen";
import OrderHistoryScreen from "./Pages/OrderHistoryScreen";
import ProfileScreen from "./Pages/ProfileScreen";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashboardScreen from "./Pages/DashboardScreen";
import AdminRoute from "./Components/AdminRoute";
import SearchScreen from "./Pages/SearchScreen";
import ProductListScreen from "./Pages/ProductListScreen";
import ProductEditScreen from "./Pages/ProductEditScreen";
import OrderListScreen from "./Pages/OrderListScreen";
import UserListScreen from "./Pages/UserListScreen";
import UserEditScreen from "./Pages/UserEditScreen";
import SellerRoute from "./Components/SellerRoute";
import SellerScreen from './Pages/SellerScreen';
import Caca from "./Components/ItemText";
import CategoryCreateScreen from "./Pages/CategoryCreateScreen";
import CategoryLIstScreen from "./Pages/CategoryLIstScreen";
import PhoneRepairOptions from "./Pages/PhoneRepairOptions";
import AppleRepairOptions from './Pages/AppleRepairOptions';
import PcRepairOptions from "./Pages/PcRepairOptions";
import LaptopRepairOptions from "./Pages/LaptopRepairOptions";
import PerifericsRepairOptions from "./Pages/PerifericsRepairOptions";
import ComponentsRepairOptions from "./Pages/ComponentsRepairOptions";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caca" element={<Caca />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/registro-personal" element={<RegisterPersonal />} />
          <Route path="/signout" element={<Logout />} />
          <Route path="/envio" element={<ShippingAddressScreen />} />
          <Route path="/pago" element={<PaymentMethodScreen />} />
          <Route path="/orden" element={<PlaceOrderScreen />} />
          <Route path="/domicilio" element={<RegisterHome />} />
          <Route path="/confirma-registro" element={<RegisterCode />} />
          <Route path="/confirma-registro2" element={<RegisterConfirm />} />
          <Route path="/repara/dispositivo" element={<FormDevice />} />
          <Route path="/problema" element={<FormProblem />} />
          <Route path="/confirmacion" element={<FormConfirm />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cambiar-contraseña" element={<PasswordChange />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/repara" element={<FormType />} />
          <Route path="/repara/celulares" element={<PhoneRepairOptions />} />
          <Route path="/repara/laptop" element={<LaptopRepairOptions />} />
          <Route path="/repara/pc" element={<PcRepairOptions />} />
          <Route path="/repara/apple" element={<AppleRepairOptions />} />
          <Route path="/repara/componentes" element={<ComponentsRepairOptions />} />
          <Route path="/repara/lineablanca" element={<PerifericsRepairOptions />} />
          <Route path="/*" element={<div>404 Esta pagina no existe</div>} />
          <Route path="/seller/:id?" element={<SellerScreen />} />
          <Route
            path="/confirmar-cambiar-contraseña"
            element={<PasswordChangeEmail />}
          />
          <Route path="/carrito" element={<CartScreen />} />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistoryScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DashboardScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/product/:id"
            element={
              <AdminRoute>
                <ProductEditScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <CategoryLIstScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/categories/:id"
            element={
              <AdminRoute>
                <CategoryCreateScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrderListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/user/:id"
            element={
              <AdminRoute>
                <UserEditScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/seller/products"
            element={
              <SellerRoute>
                <ProductListScreen />
              </SellerRoute>
            }
          ></Route>
          <Route
            path="/seller/orders"
            element={
              <SellerRoute>
                <OrderListScreen />
              </SellerRoute>
            }
          ></Route>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
