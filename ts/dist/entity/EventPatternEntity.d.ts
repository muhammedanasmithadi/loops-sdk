import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { EventPattern, EventPatternLoadMatch, EventPatternListMatch } from '../LoopsTypes';
declare class EventPatternEntity extends LoopsEntityBase<EventPattern> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: EventPatternEntity): EventPatternEntity;
    load(this: any, reqmatch?: EventPatternLoadMatch, ctrl?: Control): Promise<EventPatternEntity>;
    list(this: any, reqmatch?: EventPatternListMatch, ctrl?: Control): Promise<EventPatternEntity[]>;
}
export { EventPatternEntity };
