import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { ContactSuppressionStatus, ContactSuppressionStatusLoadMatch } from '../LoopsTypes';
declare class ContactSuppressionStatusEntity extends LoopsEntityBase<ContactSuppressionStatus> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ContactSuppressionStatusEntity): ContactSuppressionStatusEntity;
    load(this: any, reqmatch?: ContactSuppressionStatusLoadMatch, ctrl?: Control): Promise<ContactSuppressionStatusEntity>;
}
export { ContactSuppressionStatusEntity };
