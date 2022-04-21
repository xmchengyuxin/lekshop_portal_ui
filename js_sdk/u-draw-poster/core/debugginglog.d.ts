import { DrawPosterResult } from '.';
export declare class DebuggingLog {
    private dp;
    private $color;
    constructor(dp: Partial<DrawPosterResult>);
    log: (message: string, color?: string, ...args: any[]) => void;
    success: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
}
