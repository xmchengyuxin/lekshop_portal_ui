export default FillStyleLinearGradient;
declare class FillStyleLinearGradient {
    constructor(x0: any, y0: any, x1: any, y1: any);
    _start_pos: {
        _x: any;
        _y: any;
    };
    _end_pos: {
        _x: any;
        _y: any;
    };
    _stop_count: number;
    _stops: number[];
    addColorStop: (pos: any, color: any) => void;
}
