"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    logger: function() {
        return logger;
    },
    stream: function() {
        return stream;
    }
});
const _winston = /*#__PURE__*/ _interop_require_default(require("winston"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const logFormat = _winston.default.format.printf(({ timestamp, level, message })=>`${timestamp} ${level}: ${message}`);
const logger = _winston.default.createLogger({
    format: _winston.default.format.combine(_winston.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), logFormat),
    transports: [
        new _winston.default.transports.Console({
            format: _winston.default.format.combine(_winston.default.format.splat(), _winston.default.format.colorize())
        })
    ]
});
const stream = {
    write: (message)=>{
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
};

//# sourceMappingURL=logger.js.map