import { DrawPosterPlugin } from '../../core/plugin';
declare module '../../core' {
    interface DrawPosterResult {
        createLayer: (afferOptions: CreateLayerOptions, rowList: DrawRowOpt[]) => number;
        table: {
            height: number;
            padding: number;
            margin: number;
        };
    }
}
export interface CreateLayerOptions {
    background?: string;
    self?: boolean;
    line?: boolean;
    lineHeight?: number;
}
export interface DrawRowOpt {
    text?: string;
    font?: string;
    color?: string;
    center?: boolean;
    width?: number;
}
declare const _default: (options?: {
    height?: number | undefined;
    padding?: number | undefined;
    margin?: number | undefined;
} | undefined) => DrawPosterPlugin;
export default _default;
