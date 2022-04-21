// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
export class DebuggingLog {
    dp;
    $color = '#3489fd';
    constructor(dp) {
        this.dp = dp;
    }
    log = (message, color = this.$color, ...args) => {
        if (!this.dp?.$options?.debug)
            return;
        console.log(`%c${this.dp.id} -> ${message}`, `color: ${color}`, ...args);
    };
    success = (message, ...args) => {
        this.log(`🎉 ${message}`, '#19be6b', ...args);
    };
    error = (message, ...args) => {
        this.log(`🎉 ${message}`, '#fa3534', ...args);
    };
}
//# sourceMappingURL=debugginglog.js.map