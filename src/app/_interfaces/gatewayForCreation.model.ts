import { Peripheral } from './peripheral.model';
export interface GatewayForCreation {
    name: string;
    address: string;

    peripherals?: Peripheral[];
}