import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { EventSuccess, EventSuccessCreateData } from '../LoopsTypes';
declare class EventSuccessEntity extends LoopsEntityBase<EventSuccess> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: EventSuccessEntity): EventSuccessEntity;
    create(this: any, reqdata?: EventSuccessCreateData, ctrl?: Control): Promise<EventSuccessEntity>;
}
export { EventSuccessEntity };
