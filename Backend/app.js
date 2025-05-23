// Path: Backend/app.js
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
// Setup middleware first
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
// Then import routes
const UsersAuthRoutes = require("./routes/users_auth_Routes/authRoutes");
const OtherUserRoutes = require("./routes/users_other_Routes/userRoutes");
const Admin_Routes = require("./routes/admin_Routes/admin_auth_routes");
const Admin_Crud_Routes = require("./routes/admin_Routes/admin_crud_routes");
const warehouseRoutes = require('./routes/admin_Routes/warehouseRoutes');
const procurement_officers_Routes = require("./routes/procurement_officer_Routes");
const warehouse_manager_Routes = require("./routes/warehouse_manager_Routes");
const adminUsersRoutes = require("./routes/admin_Routes/admin_users_routes");


// Then use routes
app.use(`${process.env.SITE_ADDRESS || "/api"}/auth`, UsersAuthRoutes);
app.use(`${process.env.SITE_ADDRESS || "/api"}/user`, OtherUserRoutes);
app.use(`${process.env.SITE_ADDRESS || "/api"}/admin/users`, adminUsersRoutes); // This must come BEFORE the more general /admin route!
app.use(`${process.env.SITE_ADDRESS || "/api"}/admin`, Admin_Routes);
app.use(`${process.env.SITE_ADDRESS || "/api"}/admin/fetch`, Admin_Crud_Routes);
app.use(`${process.env.SITE_ADDRESS || "/api"}/po`, procurement_officers_Routes);
app.use(`${process.env.SITE_ADDRESS || "/api"}/wm`, warehouse_manager_Routes);
app.use(`${process.env.SITE_ADDRESS || "/api"}/admin/warehouses`, warehouseRoutes)
//app.use('/api/admin', warehouseRoutes);
//app.use("/api/admin/users", adminUsersRoutes);

const port = 8000 || process.env.port;
const StartConnection = async () => {
  try {
    app.listen(port, () => console.log("<> Server [Done]"));
  } catch (error) {
    process.exit(1);
  }
};
StartConnection();