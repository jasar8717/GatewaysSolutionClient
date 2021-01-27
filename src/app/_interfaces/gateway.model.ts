import { Peripheral } from './peripheral.model';
export class Gateway {
    id: string;
    name: string;
    address: string;

    peripherals?: Peripheral[];
}