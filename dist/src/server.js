"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("tsconfig-paths/register");
const _app = require("./app");
const _validateEnv = require("./utils/validateEnv");
const _authroute = require("./routes/auth.route");
const _blogroute = require("./routes/blog.route");
(0, _validateEnv.ValidateEnv)();
const app = new _app.App([
    new _authroute.AuthRoute(),
    new _blogroute.BlogRoute()
]);
app.listen();

//# sourceMappingURL=server.js.map